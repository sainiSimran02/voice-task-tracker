import Task from "../models/Task.js";
import { parseVoiceInput } from "../utils/parseVoiceInput.js";

export const createTask = async (req, res) => {
  try {
    const payload = req.body;
    const task = await Task.create(payload);
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const parseVoice = async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({ error: "transcript required" });
    }
    const parsed = parseVoiceInput(transcript);
    // parseVoiceInput returns dueDate as Date object; convert to ISO for JSON
    const payload = {
      ...parsed,
      dueDate: parsed.dueDate ? parsed.dueDate.toISOString() : null
    };
    return res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
