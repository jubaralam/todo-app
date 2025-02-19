import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
const TodoUpdate = () => {
  const { id } = useParams(); // Extract the todo ID from the URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const todo = JSON.parse(localStorage.getItem("todo"));
  console.log("update page", todo);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "",
  });
  useEffect(() => {
    setFormData(todo);
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to Update this task?"
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const res = await axios.put(
        `https://todo-app-backend-v402.onrender.com/api/todo/update/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    //   alert(res.data.message);
      toast.success(res.data.message);
      navigate("/dashboard"); // Redirect to dashboard after success
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to update todo.");
    } finally {
      setLoading(false);
    }
  };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to Update this task?"
  //     );
  //     if (!confirmDelete) return;
  //     console.log("procceed");
  //     setLoading(true);
  //     try {
  //       const res = await axios.put(
  //         `https://todo-app-backend-v402.onrender.com/api/todo/update/${id}`,
  //         formData,
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //       toast.success(res.data.message);
  //     } catch (error) {
  //       toast.error(error.message || "failed to update data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 6 }}>
      <Card elevation={6} sx={{ borderRadius: 4, bgcolor: "#f5f7fa" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {" "}
            <Typography variant="h5" sx={{ mb: 2 }}>
              Update Todo
            </Typography>
            <Typography>
              {error && (
                <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>
              )}
            </Typography>
          </Box>

          <form
            onSubmit={handleUpdate}
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
            >
              <option value="">Select Priority</option>
              <option value="urgent_important">urgent important</option>
              <option value="urgent_not_important">urgent not important</option>
              <option value="important_not_urgent">important not urgent</option>
              <option value="neither">neither</option>
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
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">{formData.status}</option>
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
                backgroundColor: "#28A745",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Todo"}
            </button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoUpdate;
