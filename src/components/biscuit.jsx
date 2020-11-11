import React from "react";
import { biscuitShape } from "../constants";
import "./biscuit.css";

const classShapeMap = {
  [biscuitShape.PRESSED]: "pressed",
};
const getColor = (bakingProgress) => {
  if (bakingProgress >= 30 && bakingProgress <= 50) {
    return "orange";
  } else if (bakingProgress > 50) {
    return "black";
  } else {
    return "yellow";
  }
};
const Biscuit = ({ shape, bakingProgress }) => {
  const shapeClass = classShapeMap[shape] || "";
  const colorClass = getColor(bakingProgress);
  return (
    <div
      className={`biscuit ${shapeClass} ${colorClass}`}
    ></div>
  );
};
export default Biscuit;
