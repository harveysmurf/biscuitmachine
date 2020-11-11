import {
  temperatureVariationEveryTick,
  POSITIONS,
} from "../constants";
import { initialState } from "./reducer";
import { ovenTickHandler, motorTickHandler } from "./tickHandlers";

const createState = (state) => ({
  ...initialState,
  ...state,
});

describe("tick handlers", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("ovenTickHandler", () => {
    it("should increase temperature when oven is enabled", () => {
      const state = createState({ ovenEnabled: true });
      expect(ovenTickHandler(state).temperature).toEqual(
        initialState.temperature + temperatureVariationEveryTick
      );
    });
    it("should decrease temperature when oven is enabled", () => {
      const temperature = 22;
      const state = createState({ ovenEnabled: false, temperature });
      expect(ovenTickHandler(state).temperature).toEqual(
        temperature - temperatureVariationEveryTick
      );
    });
    it("should not decrease temperature when already at 0", () => {
      const temperature = 0;
      const state = createState({ ovenEnabled: false, temperature });
      expect(ovenTickHandler(state).temperature).toEqual(temperature);
    });
  });
  describe("motorTickHandler", () => {
    it("should move motorPosition on tick when controller is ON", () => {
      const motorPosition = 10;
      const state = createState({
        motorEnabled: true,
        controller: POSITIONS.ON,
        motorPosition,
        temperature: 230
      });
      const motorPositionAfterMove = 11;
      expect(motorTickHandler(state)).toEqual({
        ...state,
        motorPosition: motorPositionAfterMove,
      });
    });
    [
      [false, POSITIONS.ON, true],
      [true, POSITIONS.OFF, true],
      [true, POSITIONS.PAUSE, true],
      [true, POSITIONS.ON, false],
    ].forEach((params) => {
      const [motorEnabled, controller, hasProperTemperature] = params;
      it(`should not move motorPosition when motorEnabled=${motorEnabled} controller=${controller} properTemperature=${hasProperTemperature}`, () => {
        const state = createState({
          motorEnabled,
          controller,
        });
        expect(motorTickHandler(state).motorPosition).toEqual(state.motorPosition)
      });
    });
  });
});
