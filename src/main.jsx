import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TasksProvider from "./context/TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <TasksProvider>
    <App />
  </TasksProvider>,
);
