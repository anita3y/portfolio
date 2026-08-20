import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CueSounds from "./components/CueSounds.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
      <CueSounds />
      <CustomCursor />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
