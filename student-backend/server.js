// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// Models
const Document = require("./models/Document");

const app = express();
const server = http.createServer(app);

// ---------------------
// SOCKET.IO SETUP
// ---------------------
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
  },
});

// allow routes to access io
app.set("io", io);

// Middlewares
app.use(cors());
app.use(express.json());

// ⭐ Students Route Import
const studentsRouter = require('./routes/students');

// serve uploaded PDFs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------------
// ⭐ Mount Notification Routes
// -------------------------
app.use("/api/notifications", require("./routes/notifications")(io));

// ⭐ Mount Student Routes
app.use('/api/students', studentsRouter);

// ⭐ ADD THIS
const studentsWithLogin = require("./routes/studentsWithLogin");
app.use("/api/students-with-login", studentsWithLogin);

// ⭐ MOUNT LOGIN ROUTE (ADD THIS)
const loginsRoute = require("./routes/logins");
app.use("/api/logins", loginsRoute);

// -------------------------
// MULTER STORAGE FOR PDFs
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

// -------------------------
// UPLOAD DOCUMENT (PDF)
// -------------------------
app.post("/api/documents/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newDoc = new Document({
      title,
      description,
      category: category || "General",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileUrl: `/uploads/${file.filename}`,
      createdAt: new Date(),
      downloads: 0,
    });

    const savedDoc = await newDoc.save();

    // broadcast live update
    io.emit("new-document", savedDoc);

    return res.json({ success: true, document: savedDoc });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error uploading document" });
  }
});

// -------------------------
// GET ALL DOCUMENTS
// -------------------------
app.get("/api/documents", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json({ success: true, documents: docs });
  } catch (err) {
    console.error("DOCUMENTS ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// -------------------------
// CONNECT MONGO + START SERVER
// -------------------------
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/scholarship";

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

// -------------------------
// SOCKET LOGGING
// -------------------------
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});
