import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Stock from "./nuevo";
import { AppProvider } from "./AppContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Stock />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
