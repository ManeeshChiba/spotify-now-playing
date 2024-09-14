import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ProviderStack } from "./ProviderStack";
import "./reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <ProviderStack />
  </StrictMode>
);
