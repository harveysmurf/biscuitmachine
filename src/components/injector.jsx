import { useContext } from "react";
import {
  StoreContext,
} from "../context/Context";
import "./injector.css";

const Injector = () => {
  const { injecting } = useContext(StoreContext);
  return (
    <div className={`injector ${injecting ? "active" : ""}`}>
      <div className="tip"></div>
      <div className="drop"></div>
    </div>
  );
};
export default Injector;
