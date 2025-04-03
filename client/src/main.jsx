import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import "../src/index.css";
import PrivateRoute from "./components/privateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/tasks" element={<PrivateRoute element={<TaskList />} />} />
      </Routes>
    </Router>
  </StrictMode>
);
