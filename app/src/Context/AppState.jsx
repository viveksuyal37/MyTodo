import { useState } from "react";
import StateContext from "./StateContext";

const AppState = (props) => {
  const stateHook = useState({});

  return (
    <StateContext.Provider value={stateHook}>
      {props.children}
    </StateContext.Provider>
  );
};

export default AppState;
