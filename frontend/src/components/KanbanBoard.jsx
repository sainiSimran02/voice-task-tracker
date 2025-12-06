import React, { useState } from "react";

const columns = ["To Do", "In Progress", "Done"];

function KanbanBoard({ tasks, refresh, onTaskClick }) {
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (column) => {
    if (!draggedTask) return;

    // if dropped in same column, ignore
    if (draggedTask.status === column) return;

    // update backend
    await fetch(`http://localhost:5000/api/tasks/${draggedTask._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: column }),
    });

    setDraggedTask(null);
    refresh();
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {columns.map((col) => (
        <div
          key={col}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col)}
          style={{
            flex: 1,
            minHeight: 400,
            padding: 10,
            background: "#f5f5f5",
            borderRadius: 8,
          }}
        >
          <h3 style={{ textAlign: "center" }}>{col}</h3>

          {tasks
            .filter((t) => t.status === col)
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={() => handleDragStart(task)}
                onClick={() => onTaskClick(task)}
                style={{
                  background: "white",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  cursor: "grab",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                <strong>{task.title}</strong>
                <div style={{ fontSize: "12px", marginTop: 4 }}>
                  Priority: {task.priority}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
