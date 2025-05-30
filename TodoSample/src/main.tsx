import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TodoProvider } from "./context/TodoContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>
);
