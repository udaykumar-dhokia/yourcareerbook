import express from "express";
import usersController from "./users.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.get("/exists", authMiddleware, usersController.exists);

export default router;
