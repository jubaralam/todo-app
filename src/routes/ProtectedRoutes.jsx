/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // If there's no token, the children won't be rendered, otherwise render them
  if (!token) {
    return null; // Optional: You can show a loading spinner or placeholder while redirecting
  }
  return <div>{children}</div>;
};

export default ProtectedRoutes;
