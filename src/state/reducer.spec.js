import { POSITIONS } from "../constants";
import { actionTypes } from "./actions";
import { initialState, reducer } from "./reducer";

const createAction = (type, props) => ({
  type,
  ...props,
});
describe("reducer", () => {
  it("should return initial state", () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  describe("start action type", () => {
    it("should set controller to ON", () => {
      const state = reducer(initialState, { type: actionTypes.START });
      expect(state.controller).toEqual(POSITIONS.ON);
    });
    it("should enable oven if temperature is below minimum", () => {
      const state = reducer(initialState, { type: actionTypes.START });
      expect(state.ovenEnabled).toEqual(true);
    });
    it("should keep oven state as it is if temperature is >= minimum", () => {
      [
        {
          temperature: 220,
          ovenEnabled: true,
        },
        {
          temperature: 220,
          ovenEnabled: true,
        },
        {
          temperature: 230,
          ovenEnabled: false,
        },
        { temperature: 230, ovenEnabled: true },
      ].forEach(({ temperature, ovenEnabled }) => {
        const state = reducer(
          { temperature, ovenEnabled },
          createAction(actionTypes.START)
        );
        expect(state.ovenEnabled).toEqual(ovenEnabled);
      });
    });
  });
});
