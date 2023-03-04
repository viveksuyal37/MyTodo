import React from "react";
import ReactDOM from "react-dom/client";
import AppState from "./Context/AppState";
import AlertState from "./Context/AlertState";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AlertState>
    <AppState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppState>
  </AlertState>
);
