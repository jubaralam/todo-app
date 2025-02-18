/* eslint-disable react/prop-types */
import axios from "axios";
import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoCard = ({
  _id,
  title,
  description,
  priority,
  dueDate,
  status,
  token,
}) => {
  const todo = { _id, title, description, priority, dueDate, status, token };
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState("");
  // Helper function to format priority text
  const formatPriority = (priority) => {
    return priority.replace(/_/g, " ").toUpperCase();
  };
  const navigate = useNavigate();
  // Check if the task is overdue
  const isOverdue =
    new Date() > new Date(dueDate) && status?.toLowerCase() !== "completed";

  console.log(token);
  const handleUpdate = async (id) => {
    navigate(`/dashboard/update/${id}`);
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify(todo));
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.put(
        `https://todo-app-backend-v402.onrender.com/api/todo/update/${id}`,
        { isDeleted: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
    } catch (error) {
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Priority and Overdue Tag */}
      <div className={`priority-tag ${priority?.toLowerCase()}`}>
        <h4>{formatPriority(priority)}</h4>
        {isOverdue && <span className="overdue-tag">Overdue</span>}
      </div>

      {/* Task Details */}
      <div className="card-details">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>

      {/* Status and Due Date */}
      <div className="card-status">
        <p className={`${status?.toLowerCase() || "default"} status`}>
          {status}
        </p>
        <p className="due-date">
          Due Date: {new Date(dueDate).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button className="btn update-btn" onClick={() => handleUpdate(_id)}>
          Update
        </button>
        <button className="btn delete-btn" onClick={() => handleDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
