import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import App from "./app";

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

export {};
