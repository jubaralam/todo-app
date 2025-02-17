import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";

const Routers = () => {
  ProtectedRoutes;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoutes />}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Routers;
