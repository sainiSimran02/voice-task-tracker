import React from "react";
import { format } from "date-fns";

function TaskCard({ task, onClick }) {
  return (
    <div style={{
      border: "1px solid #ddd", borderRadius: 6, padding: 8, marginBottom: 8, background: "#fff"
    }} onClick={() => onClick(task)}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{task.title}</strong>
        <small>{task.priority}</small>
      </div>
      <div style={{ color: "#666", fontSize: 12 }}>
        {task.dueDate ? <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy p")}</span> : <span>No due date</span>}
      </div>
    </div>
  );
}

export default TaskCard;
