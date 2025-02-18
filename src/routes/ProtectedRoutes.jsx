import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/login");
      return;
    }
    setLoading(false);
    // try {
    //   // Decode and validate the token
    //   const decoded = jwtDecode(storedToken);
    //   const currentTime = Date.now();

    //   // Basic validation checks
    //   if (
    //     decoded.exp * 1000 < currentTime || // Token expired
    //     !decoded.sub || // Missing subject
    //     !decoded.iat || // Missing issue time
    //     !decoded.exp // Missing expiration
    //   ) {
    //     throw new Error("Invalid or expired token");
    //   }

    //   // Set as authenticated if valid
    //   setLoading(false);
    // } catch (error) {
    //   console.error("Token validation failed:", error.message);
    //   localStorage.removeItem("token");
    //   navigate("/login");
    // }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        🔒 Authenticating...
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;

// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoutes;
