import React from "react";
import ReactDOM from "react-dom";
import BootstrapProvider from "@bootstrap-styled/provider/lib/BootstrapProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RGBlent } from "./RGBlent.js";

const theme = {
  "$body-bg": "lightgrey",
};

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BootstrapProvider theme={theme}>
        <RGBlent />
        <ReactQueryDevtools initialIsOpen={true} />
      </BootstrapProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
