import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddTodo = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token is missing.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://todo-app-backend-v402.onrender.com/api/todo/add",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 500, margin: "auto", marginTop: 5, padding: 3, boxShadow: 5 }}
    >
      <CardHeader
        title="Add New Todo"
        sx={{ textAlign: "center", color: "#1976D2" }}
      />
      <CardContent>
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form
          onSubmit={handleAdd}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <MenuItem value="urgent_important">Urgent Important</MenuItem>
              <MenuItem value="urgent_not_important">Urgent Not Important</MenuItem>
              <MenuItem value="important_not_urgent">Important Not Urgent</MenuItem>
              <MenuItem value="neither">Neither</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Due Date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ padding: "12px" }}
          >
            {loading ? "Adding..." : "Add Todo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTodo;