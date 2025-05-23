import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// redux
import { store } from "./context/store.js";
import { Provider } from "react-redux";

// css
import "./index.css";
import "./assets/styles/DropdownMenus.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </StrictMode>
);
