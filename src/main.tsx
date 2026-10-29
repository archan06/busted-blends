import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./site.css";
import App from "./App";
import Admin from "./Admin";

const admin = location.pathname.replace(/\/$/, "") === "/admin";
if (admin) document.head.insertAdjacentHTML("beforeend", '<meta name="robots" content="noindex">');

createRoot(document.getElementById("root")!).render(<StrictMode>{admin ? <Admin /> : <App />}</StrictMode>);
