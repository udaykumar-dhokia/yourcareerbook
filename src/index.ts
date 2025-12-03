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
import followupRoutes from "./features/followup/followup.routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowed = [
        /\.localhost(:\d+)?$/,
        /^https?:\/\/([a-z0-9-]+\.)*yourcareerbook\.vercel\.app$/,
      ];

      const ok = allowed.some((regex) => regex.test(origin));
      if (ok) return callback(null, true);

      callback(new Error("Not allowed by CORS: " + origin));
    },
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
app.use("/api/followup", followupRoutes);

server.listen(process.env.PORT, async () => {
  console.log("Server is running...");
});
