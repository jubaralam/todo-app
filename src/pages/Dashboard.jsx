import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import TodoCard from "../components/TodoCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // Fetch user details & token
  const getUserDetails = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(storedUser);
      if (storedToken) setToken(storedToken);
    } catch (error) {
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos after token is available
  const getTodos = async () => {
    setLoading(true);
    if (!token) {
      setError("Token Not Found");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://todo-app-backend-v402.onrender.com/api/todo`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(res.data.data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch todos"
      );
    } finally {
      setLoading(false);
    }
  };

  // Run only once to get user details
  useEffect(() => {
    getUserDetails();
  }, []);

  // Run when token becomes available
  useEffect(() => {
    if (token) getTodos();
  }, [token]);

  // Loading state
  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleAddTodo = () => {
    navigate("/dashboard/add");
  };

  // Display UI
  return (
    <div className="dashboard-container">
      <div className="flex justify-between items-center">
        <h2>Dashboard, Welcome {user?.name}</h2>
        <button
          onClick={handleAddTodo}
          style={{
            padding: "8px 12px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 12px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      <div className="card-container">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCard key={todo._id} {...todo} token={token} />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
