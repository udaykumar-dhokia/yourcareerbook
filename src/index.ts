import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { HttpStatus } from "./utils/httpStatus.js";
import authRoutes from "./features/auth/auth.routes.js";
import usersRoutes from "./features/users/users.routes.js";
import jobsRoutes from "./features/jobs/jobs.routes.js";
import feedbackRoutes from "./features/feedback/feedback.routes.js";
import agentsRoutes from "./features/agents/agents.routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://yourcareerbook.vercel.app",
      "https://yourcareerbook.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(HttpStatus.OK).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/job", jobsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/agent", agentsRoutes);

server.listen(process.env.PORT, async () => {
  console.log("Server is running...");
});
