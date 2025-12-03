import express from "express";
import usersController from "./users.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/exists", authMiddleware, usersController.exists);
router.put("/", authMiddleware, usersController.update);
router.get("/check-username/:username", usersController.checkUsername);
router.get("/:username", usersController.getByUsername);

export default router;
