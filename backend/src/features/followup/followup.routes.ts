import express from "express";
import folloUpController from "./followup.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import limiter from "../../config/ratelimiter.config";

const router = express.Router();

router.post("/", limiter, authMiddleware, folloUpController.create);

export default router;
