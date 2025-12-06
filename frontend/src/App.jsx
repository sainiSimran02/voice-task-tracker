import React, { useEffect, useState } from "react";
import axios from "axios";
import KanbanBoard from "./components/KanbanBoard";
import TaskList from "./components/TaskList";
import VoiceRecorder from "./components/VoiceRecorder";
import TaskFormModal from "./components/TaskFormModal";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("kanban"); // or 'list'
  const [preview, setPreview] = useState(null); // parsed object to create
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const onCreateFromPreview = async (body) => {
    await axios.post(`${API_BASE}/tasks`, body);
    setPreview(null);
    loadTasks();
  };

  const onUpdateTask = async (id, body) => {
    await axios.put(`${API_BASE}/tasks/${id}`, body);
    setEditingTask(null);
    loadTasks();
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await axios.delete(`${API_BASE}/tasks/${id}`);
    loadTasks();
  };

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, Arial" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Voice-Enabled Task Tracker</h2>
        <div>
          <button onClick={() => setView(v => v === "kanban" ? "list" : "kanban")}>
            {view === "kanban" ? "List view" : "Kanban view"}
          </button>
        </div>
      </header>

      <section style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
        <VoiceRecorder onParsed={(parsed) => setPreview(parsed)} />
        <button onClick={() => setEditingTask({})}>+ Add Task</button>
        <input placeholder="Search..." onChange={(e) => {
          const q = e.target.value;
          if (!q) loadTasks();
          else axios.get(`${API_BASE}/tasks?search=${encodeURIComponent(q)}`).then(r => setTasks(r.data));
        }} />
      </section>

      <main style={{ marginTop: 20 }}>
        {view === "kanban" ? (
          <KanbanBoard tasks={tasks} onTaskClick={t => setEditingTask(t)} refresh={loadTasks} />
        ) : (
          <TaskList tasks={tasks} onEdit={t => setEditingTask(t)} onDelete={onDelete} />
        )}
      </main>

      {preview && (
        <TaskFormModal
          initial={preview}
          onClose={() => setPreview(null)}
          onSave={onCreateFromPreview}
        />
      )}

      {editingTask !== null && (
        <TaskFormModal
          initial={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(body) => editingTask._id ? onUpdateTask(editingTask._id, body) : onCreateFromPreview(body)}
        />
      )}
    </div>
  );
}

export default App;
