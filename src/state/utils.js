
import {
  biscuitShape,
  fullMotorCircle,
  maximumTemperature,
  minimumTemperature,
  motorPositionChangeOnTick,
  ovenPosition,
  POSITIONS,
} from "../constants";

export const isBlob = (biscuit) =>
  !!(biscuit && biscuit.shape === biscuitShape.BLOB);

export const properTemperature = (temperature) =>
  temperature >= minimumTemperature && temperature <= maximumTemperature;

export const createBiscuit = (biscuitProps = {}) => ({
  shape: biscuitShape.BLOB,
  bakingProgress: 0,
  ...biscuitProps,
});

export const getShouldInject = (motorEnabled, motorPosition, item) =>
  motorEnabled && motorPosition === 0 && !item;

export const moveMotor = (motorPosition) =>
  motorPosition === fullMotorCircle
    ? 0
    : motorPosition + motorPositionChangeOnTick;

export const getProperOvenState = (ovenEnabled, temperature, controller) => {
  if (controller === POSITIONS.OFF) {
    return false;
  }
  if (ovenEnabled && temperature >= maximumTemperature) {
    return false;
  } else if (!ovenEnabled && temperature <= minimumTemperature) {
    return true;
  }
  return ovenEnabled;
};

export const isInsideOven = (position) => ovenPosition.includes(position);
export const bakeBiscuits = (items) => {
  return items.map((biscuit, index) => {
    if (isInsideOven(index)) {
      const incrementedProgres = biscuit.bakingProgress + 1;
      return {
        ...biscuit,
        bakingProgress: incrementedProgres,
      };
    }
    return biscuit;
  });
};
