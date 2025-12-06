import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI)

connectDB(MONGO_URI);

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Voice Task API is running"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
