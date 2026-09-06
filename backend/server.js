const API = "http://localhost:5000/api";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Real routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

// Test route - ADD THIS
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "✅ Backend API is working!",
    status: "success", 
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Project Showcase Backend is Running!",
    endpoints: {
      test: "/api/test",
      projects: "/api/projects", 
      health: "/api/health"
    }
  });
});

// MongoDB Connection (optional - can run without it)
if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));
}

app.listen(PORT, () => {
  console.log("🎯 ====================================");
  console.log("🚀 BACKEND SERVER RUNNING!");
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
  console.log(`📁 Projects: http://localhost:${PORT}/api/projects`);
  console.log("🎯 ====================================");
});