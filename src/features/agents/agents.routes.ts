import express from "express";
import agentsController from "./agents.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import limiter from "../../config/ratelimiter.config";

const router = express.Router();

router.get("/job-search/", authMiddleware, limiter, agentsController.findJobs);

export default router;
