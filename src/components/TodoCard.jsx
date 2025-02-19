import axios from "axios";
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TodoCard = ({
  _id,
  title,
  description,
  priority,
  dueDate,
  status,
  token,
  setDeleteId,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isOverdue =
    new Date() > new Date(dueDate) && status?.toLowerCase() !== "completed";

  const handleUpdate = () => {
    localStorage.setItem(
      "todo",
      JSON.stringify({
        _id,
        title,
        description,
        priority,
        dueDate,
        status,
        token,
      })
    );
    navigate(`/dashboard/update/${_id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await axios.put(
        `https://todo-app-backend-v402.onrender.com/api/todo/update/${_id}`,
        { isDeleted: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Todo Has been Deleted");
      setDeleteId(_id);
    } catch (error) {
      toast.error("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`card ${priority?.toLowerCase()}`}>
      <div className="priority-tag">
        <h4>{priority.replace(/_/g, " ").toUpperCase()}</h4>
        {isOverdue && <span className="overdue-tag">🚨 Overdue</span>}
      </div>

      <div className="card-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="card-status">
        <p className={`status ${status?.toLowerCase()}`}>{status}</p>
        <p className="due-date">📅 {new Date(dueDate).toLocaleDateString()}</p>
      </div>

      <div className="card-actions">
        <button
          className="btn update-btn"
          onClick={handleUpdate}
          disabled={loading}
        >
          ✏️ Update
        </button>
        <button
          className="btn delete-btn"
          onClick={handleDelete}
          disabled={loading}
        >
          🗑️ {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
