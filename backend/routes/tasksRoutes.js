import express from "express";
import {createTask, deleteTask, toggleDone, fetchTasks, updateTask} from "../controllers/tasksController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createTask", requireAuth, createTask);
router.post("/markDone", requireAuth, toggleDone);
router.get("/fetchTasks", requireAuth, fetchTasks);
router.patch("/toggleDone/:task_id", requireAuth, toggleDone);
router.patch("/updateTask/:task_id", requireAuth, updateTask);
router.delete("/deleteTask/:task_id", requireAuth, deleteTask);

export default router;