import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./theme.css"; // si no existe, créalo vacío temporalmente
createRoot(document.getElementById("root")).render(<App />);
