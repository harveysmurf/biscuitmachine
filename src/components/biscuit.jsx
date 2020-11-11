import React from "react";
import {
  biscuitShape,
  maximumProgressToCookProperly,
  minimumProgressToCookProperly,
} from "../constants";
import "./biscuit.css";

const classShapeMap = {
  [biscuitShape.PRESSED]: "pressed",
};
const getColor = (bakingProgress) => {
  if (
    bakingProgress >= minimumProgressToCookProperly &&
    bakingProgress <= maximumProgressToCookProperly
  ) {
    return "orange";
  } else if (bakingProgress > maximumProgressToCookProperly) {
    return "black";
  } else {
    return "yellow";
  }
};
const Biscuit = ({ shape, bakingProgress }) => {
  const shapeClass = classShapeMap[shape] || "";
  const colorClass = getColor(bakingProgress);
  return <div className={`biscuit ${shapeClass} ${colorClass}`}></div>;
};
export default Biscuit;
