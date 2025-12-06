import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";

const defaultTask = {
  title: "",
  description: "",
  priority: "Medium",
  status: "To Do",
  dueDate: null,
};

function TaskFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(defaultTask);

  useEffect(() => {
    if (!initial) return;
    // initial may have dueDate as ISO string or Date or null
    const copy = {
      title: initial.title || "",
      description: initial.description || "",
      priority: initial.priority || "Medium",
      status: initial.status || "To Do",
      dueDate: initial.dueDate
        ? new Date(initial.dueDate).toISOString().slice(0, 16)
        : "",
    };
    setForm(copy);
  }, [initial]);

  const handleSave = () => {
    const payload = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      status: form.status,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };
    onSave(payload);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ background: "#fff", padding: 18, width: 560, borderRadius: 8 }}
      >
        <h3>{initial && initial._id ? "Edit Task" : "Create Task"}</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <label>
            Title
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <label>
              Priority
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </label>
            <label>
              Due
              <input
                type="datetime-local"
                value={form.dueDate || ""}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </label>
          </div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={!form.title.trim()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFormModal;
