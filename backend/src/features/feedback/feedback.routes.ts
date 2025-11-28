import express from "express";
import feedbackController from "./feedback.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, feedbackController.create);

export default router;
