import React from "react";
import ReactDOM from "react-dom/client";
import Home from "blog/Home";
import "./index.scss";

const App = () => (
  <div className="flex w-full justify-center">
    <div className="w-full max-w-[60rem]"><Home /></div>
  </div>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)