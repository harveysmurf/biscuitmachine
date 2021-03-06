export const tickTimerMilliseconds = 100;

export const motorPositionChangeOnTick = 1;
export const fullMotorCircle = 19;

export const temperatureVariationEveryTick = 1;
export const bakingIncrementOnTick = 1;
export const minimumTemperature = 220;
export const maximumTemperature = 240;

export const injectorPosition = 0;
export const stamperPosition = 2;
export const ovenPosition = [4, 5];

const progressWhileInOven = ovenPosition.length * fullMotorCircle;
export const minimumProgressToCookProperly =
  (70 / 100) * progressWhileInOven;
export const maximumProgressToCookProperly =
  (120 / 100) * progressWhileInOven

export const biscuitSlotsNumber = 8;

export const POSITIONS = {
  ON: "ON",
  OFF: "OFF",
  PAUSE: "PAUSE",
};

export const biscuitShape = {
  BLOB: "BLOB",
  PRESSED: "PRESSED",
};
