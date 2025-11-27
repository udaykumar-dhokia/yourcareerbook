import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { HttpStatus } from "./utils/HttpStatus";
import authRoutes from "./features/auth/auth.routes";
import usersRoutes from "./features/users/users.routes";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(HttpStatus.OK).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);

server.listen(process.env.PORT, async () => {
  console.log("Server is running...");
});
