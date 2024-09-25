import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import "./index.scss";

const App = () => (
  <>
    <Home />
  </>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)