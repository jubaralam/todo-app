import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUserDetails = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        setUser(storedUser); // Store the user in the user state
      }

      if (storedToken) {
        setToken(storedToken); // Store the token in the token state
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Check if data is loading or not found in localStorage
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      Dashboard, Welcome {user?.name}
      <div></div>
    </div>
  );
};

export default Dashboard;
