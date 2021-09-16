import React from "react";
import ReactDOM from "react-dom";
import BootstrapProvider from "@bootstrap-styled/provider/lib/BootstrapProvider";
import { RGBlent } from "./RGBlent.js";

const theme = {
  "$body-bg": "lightgrey",
};

ReactDOM.render(
  <React.StrictMode>
    <BootstrapProvider theme={theme}>
      <RGBlent />
    </BootstrapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
