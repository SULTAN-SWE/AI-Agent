import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Apply dark mode by default — the platform is dark-first
document.documentElement.classList.add("dark");
setBaseUrl("https://ai-agent-api-a03t.onrender.com");
createRoot(document.getElementById("root")!).render(<App />);
