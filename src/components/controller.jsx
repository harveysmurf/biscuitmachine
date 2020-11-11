import { useContext } from "react";
import { POSITIONS } from "../constants";
import { DispatchContext, StoreContext } from "../context/Context";
import { pauseAction, startAction, stopAction } from "../state/actions";

const Controller = (props) => {
  const dispatch = useContext(DispatchContext);
  const { controller, timer } = useContext(StoreContext);
  return (
    <div className="belt">
      <button
        disabled={controller === POSITIONS.ON}
        onClick={() => {
          dispatch(startAction(dispatch, timer));
        }}
      >
        Start
      </button>
      <button
        disabled={
          controller === POSITIONS.OFF || controller === POSITIONS.PAUSE
        }
        onClick={() => {
          dispatch(pauseAction(dispatch, timer));
        }}
      >
        Pause
      </button>
      <button
        disabled={controller === POSITIONS.OFF}
        onClick={() => {
          dispatch(stopAction(dispatch, timer));
        }}
      >
        OFF
      </button>
    </div>
  );
};
export default Controller