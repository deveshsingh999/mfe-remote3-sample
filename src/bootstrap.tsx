import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./app";

const basename = `/${process.env.MFE_NAME}`;

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

export {};
