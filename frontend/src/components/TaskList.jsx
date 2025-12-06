import React from "react";

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} style={{ borderBottom: "1px solid #eee", padding: 8, display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 600 }}>{task.title}</div>
            <div style={{ color: "#666" }}>{task.priority} • {task.status}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
