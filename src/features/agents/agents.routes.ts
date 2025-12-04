import express from "express";
import agentsController from "./agents.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import limiter from "../../config/ratelimiter.config.js";

const router = express.Router();

router.get("/job-search/", authMiddleware, limiter, agentsController.findJobs);

export default router;
