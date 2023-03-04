import { useState } from "react";
import AlertContext from "../Context/AlertContext"

const AlertState = (props) => {
  const stateHook = useState(
    {
      msg:null,
      error:null
    }
  );

  return (
    <AlertContext.Provider value={stateHook}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
