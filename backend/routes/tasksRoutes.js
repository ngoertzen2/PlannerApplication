import express from "express";
import { create, remove, mark_done } from "../controllers/tasksController.js";

const router = express.Router();

router.post("/create", create);
router.post("/remove", remove);
router.post("/mark_done", mark_done);

export default router;