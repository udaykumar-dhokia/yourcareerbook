import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { HttpStatus } from "./utils/HttpStatus";
import authRoutes from "./features/auth/auth.routes";
import usersRoutes from "./features/users/users.routes";
import jobsRoutes from "./features/jobs/jobs.routes";
import feedbackRoutes from "./features/feedback/feedback.routes";

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

server.listen(process.env.PORT, async () => {
  console.log("Server is running...");
});
