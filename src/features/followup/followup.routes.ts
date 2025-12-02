import express from "express";
import folloUpController from "./followup.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import limiter from "../../config/ratelimiter.config.js";

const router = express.Router();

router.post("/", limiter, authMiddleware, folloUpController.create);

export default router;
