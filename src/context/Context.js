import React, { createContext } from "react";
import { reducer, initialState } from "../state/reducer";

export const StoreContext = createContext();
export const DispatchContext = createContext();

export const Store = (props) => {
  const [globalState, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={globalState}>
        {props.children}
      </StoreContext.Provider>
    </DispatchContext.Provider>
  );
};
