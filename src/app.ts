import "dotenv/config"; 

import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route";
import aiRoutes from "./routes/ai.route";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 SmartCart AI Server Running Successfully",
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

export default app;