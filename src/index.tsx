import ReactDOM from "react-dom/client";

import App from "./app/App";
import { ReactNode } from "react";

import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  (<App />) as ReactNode
);
