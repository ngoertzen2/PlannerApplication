import express from "express";
import {createTask, removeTask, markDone, fetchTasks} from "../controllers/tasksController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createTask", requireAuth, createTask);
router.post("/removeTask", requireAuth, removeTask);
router.post("/markDone", requireAuth, markDone);
router.get("/fetchTasks", requireAuth, fetchTasks);

export default router;