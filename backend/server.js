import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import FRONTEND_URL from "./constants.js";
import pool from "./db/db.js";

const COMPLETED_TASK_EXPIRY_DAYS = 14;

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: "planner-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true
    }
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

const PORT = 5000;

async function clearExpiredCompletedTasks() {
  try {
    const result = await pool.query(
      `DELETE FROM tasks
       WHERE completed = TRUE
         AND completed_at IS NOT NULL
         AND completed_at < NOW() - INTERVAL '1 day' * $1`,
      [COMPLETED_TASK_EXPIRY_DAYS]
    );
    if (result.rowCount > 0) {
      console.log(`Cleared ${result.rowCount} completed task(s) older than ${COMPLETED_TASK_EXPIRY_DAYS} days.`);
    }
  } catch (err) {
    console.error("Failed to clear expired completed tasks:", err);
  }
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  clearExpiredCompletedTasks();
  setInterval(clearExpiredCompletedTasks, MS_PER_DAY);
});