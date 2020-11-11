import React, { useContext } from "react";
import { StoreContext } from "../context/Context";
import "./oven.css";
const Oven = () => {
  const { temperature, ovenEnabled } = useContext(StoreContext)
  return (
    <div className="oven">
      <div className={`status ${ovenEnabled ? "enabled" : "disabled"}`}></div>
      <div className="temperature">
        {temperature}
        <span>°C</span>
      </div>
    </div>
  );
};
export default Oven;
