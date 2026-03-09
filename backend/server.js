import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import FRONTEND_URL from "./constants.js";

const app = express();

app.use(cors({
  origin: {FRONTEND_URL},
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});