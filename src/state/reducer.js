import { actionTypes } from "./actions";
import { minimumTemperature, POSITIONS } from "../constants";
import { beltTickHandler, injectorTickHandler, motorTickHandler, ovenTickHandler, stamperTickHandler } from "./tickHandlers";

const tickHandlers = [
  ovenTickHandler,
  motorTickHandler,
  injectorTickHandler,
  stamperTickHandler,
  beltTickHandler
]

export const initialState = {
  timer: null,
  controller: POSITIONS.OFF,
  motorEnabled: false,
  ovenEnabled: false,
  temperature: 0,
  conveyourItems: [],
  motorPosition: 0,
  injecting: false,
  stamping: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.START:
      return {
        ...state,
        controller: POSITIONS.ON,
        ovenEnabled:
          state.temperature < minimumTemperature ? true : state.ovenEnabled,
      };
    case actionTypes.TICK:
      return tickHandlers.reduce((prev, handler) => handler(prev), state);
    case actionTypes.SET_TIMER:
      return {
        ...state,
        timer: action.timer,
      };
    case actionTypes.PAUSE:
      return {
        ...state,
        controller: POSITIONS.PAUSE,
      };
    case actionTypes.OFF:
      return {
        ...state,
        controller: POSITIONS.OFF,
        conveyourItems: [],
        ovenEnabled: false,
        motorEnabled: false,
        motorPosition: 0,
      };
    case actionTypes.REMOVE_LAST_ITEM:
      const conveyourItems = [...state.conveyourItems]
      conveyourItems.pop()
      return {
        ...state,
        conveyourItems
      }
    default:
      return state;
  }
};
