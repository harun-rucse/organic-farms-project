import React from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
