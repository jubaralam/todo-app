import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import TodoUpdate from "../pages/TodoUpdate";
import AddTodo from "../pages/AddTodo";
import Home from "../pages/Home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/update/:id" element={<TodoUpdate />} />
        <Route path="/dashboard/add" element={<AddTodo />} />
      </Route>
    </Routes>
  );
};

export default Routers;
