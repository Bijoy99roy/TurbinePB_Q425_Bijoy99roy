import express from "express";
import cors from "cors";
import { createClient } from "redis";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.connect();

const LATEST_ID_KEY = "latestId";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// {*splat} needs to be added since it is a express v5 else it breaks
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Live",
  });
});

app.post("/increment", async (req, res) => {
  try {
    const latestId = await redisClient.incr(LATEST_ID_KEY);
    res.json({ latestId });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment ID" });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));