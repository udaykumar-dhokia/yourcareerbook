import express from "express";
import jobsController from "./jobs.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, jobsController.create);
router.delete("/", authMiddleware, jobsController.delete);
router.put("/", authMiddleware, jobsController.update);
router.get("/", authMiddleware, jobsController.getJobsByUser);

export default router;
