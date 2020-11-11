import { tickTimerMilliseconds } from "../constants";

export const actionTypes = {
  START: "START",
  TICK: "TICK",
  PAUSE: "PAUSE",
  OFF: "OFF",
  SET_TIMER: "SET_TIMER",
  PULSE: "PULSE",
  REMOVE_LAST_ITEM: "REMOVE_LAST_ITEM"
};

const createTimer = (dispatch, oldTimer) => {
  if (oldTimer) {
    clearInterval(oldTimer);
  }
  const timer = setInterval(() => {
    dispatch({ type: actionTypes.TICK });
  }, tickTimerMilliseconds);
  dispatch({ type: actionTypes.SET_TIMER, timer });
};

export const removeLastItem = () => ({
  type: actionTypes.REMOVE_LAST_ITEM
})
export const startAction = (dispatch, timer) => {
  return {
    type: actionTypes.START,
    timer: createTimer(dispatch, timer),
  };
};
export const pauseAction = (dispatch, timer) => {
  return {
    type: actionTypes.PAUSE,
    timer: createTimer(dispatch, timer),
  };
};
export const stopAction = (dispatch, timer) => {
  return {
    type: actionTypes.OFF,
    timer: createTimer(dispatch, timer),
  };
};