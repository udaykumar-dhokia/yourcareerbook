import express from "express";
import jobsController from "./jobs.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, jobsController.create);
router.delete("/", authMiddleware, jobsController.delete);
router.put("/", authMiddleware, jobsController.update);
router.get("/", authMiddleware, jobsController.getJobsByUser);

export default router;
