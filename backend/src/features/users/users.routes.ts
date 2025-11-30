import express from "express";
import usersController from "./users.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/exists", authMiddleware, usersController.exists);

export default router;
