import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PlayerContextProvider } from "./context/PlayerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerContextProvider>
  </StrictMode>
);
