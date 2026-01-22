import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

import profileRoutes from "./routes/profile.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", profileRoutes);
app.use("/api", rateLimit);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
