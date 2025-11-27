import express from "express";
import jobsController from "./jobs.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, jobsController.create);

export default router;
