import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTodo = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "pending",
    isDeleted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(token);
    console.log(formData);
    if (!token) {
      setError("Token is missing.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://todo-app-backend-v402.onrender.com/api/todo/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      navigate("/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="todo-add-container"
      style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
    >
      <h2>Add New Todo</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          rows="4"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        ></textarea>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        >
          <option value="">Select Priority</option>
          <option value="urgent_important">Urgent Important</option>
          <option value="urgent_not_important">Urgent Not Important</option>
          <option value="important_not_urgent">Important Not Urgent</option>
          <option value="neither">Neither</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
