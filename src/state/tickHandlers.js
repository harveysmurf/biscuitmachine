import {
  biscuitShape,
  injectorPosition,
  POSITIONS,
  stamperPosition,
  temperatureVariationEveryTick,
} from "../constants";
import { bakeBiscuits, createBiscuit, getProperOvenState, getShouldInject, isBlob, moveMotor, properTemperature } from "./utils";

export const ovenTickHandler = (state) => {
  const temperature = state.ovenEnabled
    ? state.temperature + temperatureVariationEveryTick
    : Math.max(state.temperature - temperatureVariationEveryTick, 0);

  const ovenEnabled = getProperOvenState(
    state.ovenEnabled,
    temperature,
    state.controller
  );

  const conveyourItems = properTemperature(state.temperature)
    ? bakeBiscuits(state.conveyourItems)
    : state.conveyourItems;

  return {
    ...state,
    ovenEnabled,
    temperature,
    conveyourItems,
  };
};

export const motorTickHandler = (state) => {
  const motorEnabled =
    state.controller === POSITIONS.ON && properTemperature(state.temperature);
  return {
    ...state,
    motorEnabled,
    motorPosition:
      motorEnabled
        ? moveMotor(state.motorPosition)
        : state.motorPosition,
  };
};

export const injectorTickHandler = (state) => {
  const shouldInject = getShouldInject(
    state.motorEnabled,
    state.motorPosition,
    state.conveyourItems[injectorPosition]
  );
  if (!shouldInject) {
    return state.injecting ? { ...state, injecting: false } : state;
  }
  const conveyourItems = [...state.conveyourItems];
  conveyourItems[injectorPosition] = createBiscuit();
  return {
    ...state,
    conveyourItems,
    injecting: true,
  };
};

export const stamperTickHandler = (state) => {
  const conveyourItems = state.conveyourItems;
  const biscuit = conveyourItems[stamperPosition];
  const shouldStamp =
    state.motorEnabled && isBlob(biscuit) && state.motorPosition === 0;

  if (!shouldStamp) {
    return state.stamping ? { ...state, stamping: false } : state;
  }
  const newConveyourItems = [...conveyourItems];
  newConveyourItems[stamperPosition] = {
    ...biscuit,
    shape: biscuitShape.PRESSED,
  };

  return {
    ...state,
    conveyourItems: newConveyourItems,
    stamping: true,
  };
};

export const beltTickHandler = (state) => {
  const shouldMovePosition = state.motorEnabled && state.motorPosition === 10 && state.conveyourItems[0] !== null;
  if (!shouldMovePosition) {
    return state;
  }
  return {
    ...state,
    conveyourItems: [null, ...state.conveyourItems],
  };
};
