import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Apply dark mode by default — the platform is dark-first
document.documentElement.classList.add("dark");
setBaseUrl(import.meta.env.VITE_API_URL);
createRoot(document.getElementById("root")!).render(<App />);
