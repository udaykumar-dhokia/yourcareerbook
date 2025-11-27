import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.routes";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Server is running...");
});

app.use("/api/auth", authRoutes);

server.listen(process.env.PORT, async () => {
  console.log("Server is running...");
});
