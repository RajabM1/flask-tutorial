import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./utils/i18n.ts";

createRoot(document.getElementById("root")!).render(<App />);
