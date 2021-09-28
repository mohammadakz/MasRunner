import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { LoggedInProvider } from "./Components/Context/UserContext";
ReactDOM.render(
  <React.StrictMode>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
