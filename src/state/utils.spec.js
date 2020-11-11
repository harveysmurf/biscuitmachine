import {
  biscuitShape,
  motorPositionChangeOnTick,
  fullMotorCircle,
  maximumTemperature,
  minimumTemperature,
  ovenPosition,
  POSITIONS,
} from "../constants";
import { bakeBiscuits, createBiscuit, getProperOvenState, getShouldInject, isBlob, moveMotor, properTemperature } from "./utils";

describe("tickHandlers utils", () => {
  describe("isBlob", () => {
    it("should return true if biscuit type is blob", () => {
      expect(isBlob({ shape: biscuitShape.BLOB })).toEqual(true);
    });
    it("should return false if falsy param is passed", () => {
      expect(isBlob(null)).toEqual(false);
    });
  });
  describe("properTemperature", () => {
    it("should return true if when proper temperature is passed", () => {
      expect(properTemperature(230)).toEqual(true);
    });
    it("should return false if when proper temperature is passed", () => {
      expect(properTemperature(210)).toEqual(false);
    });
  });
  describe("createBiscuit", () => {
    it("should create biscuit object with default props", () => {
      const biscuit = createBiscuit();
      expect(biscuit.shape).toEqual(biscuitShape.BLOB);
      expect(biscuit.bakingProgress).toEqual(0);
    });
    it("should create biscuit object with custom props", () => {
      const biscuitProps = {
        shape: "random",
      };
      const biscuit = createBiscuit(biscuitProps);
      expect(biscuit.shape).toEqual(biscuitProps.shape);
      expect(biscuit.bakingProgress).toEqual(0);
    });
  });
  describe("getShouldInject", () => {
    it("should return true if conditions are met", () => {
      expect(getShouldInject(true, 0, false)).toEqual(true);
      [
        [true, 1, false],
        [true, 0, true],
        [false, 0, false],
      ].forEach((arr) => expect(getShouldInject(...arr)).toEqual(false));
    });
  });
  describe("moveMotor", () => {
    it("should move motorPosition", () => {
      const motorPosition = 5;
      expect(moveMotor(motorPosition)).toEqual(
        motorPosition + motorPositionChangeOnTick
      );
    });
    it("should reset motorPosition when full circle is reached", () => {
      const motorPosition = fullMotorCircle;
      expect(moveMotor(motorPosition)).toEqual(0);
    });
  });
  describe("getProperOvenState", () => {
    it("should turn off oven if maximum or above is reached", () => {
      [maximumTemperature, 242].forEach((temperature) => {
        expect(getProperOvenState(true, temperature)).toEqual(false);
      });
    });
    it("should turn on oven if minimum or below is reached", () => {
      [minimumTemperature, 219].forEach((temperature) => {
        expect(getProperOvenState(false, temperature)).toEqual(true);
      });
    });
    it("should keep current state enabled if maximum temperature is noot reached", () => {
      expect(getProperOvenState(true, maximumTemperature - 1)).toEqual(true);
    });
    it("should keep current state disabled if above minimum temperature", () => {
      expect(getProperOvenState(true, minimumTemperature - 1)).toEqual(true);
    });
    it("should disable when controller is set to OFF", () => {
      expect(getProperOvenState(true, minimumTemperature, POSITIONS.OFF)).toEqual(false);
    });
  });
  describe("bakeBiscuits", () => {
    it("should bake biscuits that are inside the oven", () => {
      const conveyourItems = [];
      conveyourItems[ovenPosition[0]] = createBiscuit({ bakingProgress: 1 });
      conveyourItems[ovenPosition[1]] = createBiscuit({ bakingProgress: 2 });
      const result = bakeBiscuits([...conveyourItems]);
      expect(result[ovenPosition[0]].bakingProgress).toEqual(2);
      expect(result[ovenPosition[1]].bakingProgress).toEqual(3);
    });
    it("should not bake biscuits that are outside the oven", () => {
      const conveyourItems = [];
      const positionOutsideOven = ovenPosition[0] - 1;
      conveyourItems[positionOutsideOven] = createBiscuit({
        bakingProgress: 1,
      });
      const result = bakeBiscuits(conveyourItems);
      expect(result[positionOutsideOven].bakingProgress).toEqual(1);
    });
  });
});