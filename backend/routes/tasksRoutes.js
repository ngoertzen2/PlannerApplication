import express from "express";
import { createTask, removeTask, mark_done } from "../controllers/tasksController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createTask", requireAuth, createTask);
router.post("/removeTask", requireAuth, removeTask);
router.post("/mark_done", requireAuth, mark_done);

export default router;