import { DispatchContext, StoreContext } from "../context/Context";
import { useEffect, useState, useContext } from "react";
import Biscuit from "./biscuit";
import { biscuitSlotsNumber } from "../constants";
import { removeLastItem } from "../state/actions";
import './dumpster.css'

const Dumpster = () => {
  const dispatch = useContext(DispatchContext);
  const [animating, setAnimate] = useState(false);
  const { motorEnabled, motorPosition, conveyourItems } = useContext(
    StoreContext
  );
  const item = conveyourItems[biscuitSlotsNumber];
  const shouldAnimate = item && motorEnabled && motorPosition === 10;
  useEffect(() => {
    if (!animating && shouldAnimate) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        dispatch(removeLastItem());
      }, 300);
    }
  }, [shouldAnimate, animating, dispatch]);

  return (
    <div className="dumpster">
      {animating && (
        <div className="biscuit-slead">
          <div className="dropping">
            <Biscuit {...item} />
          </div>
        </div>
      )}
      {animating && <img alt="" height="150" width="150" src="/shark.png" />}
    </div>
  );
};
export default Dumpster;
