// backend/routes/documents.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");

module.exports = function (io) {
  const router = express.Router();

  // serve uploads from /uploads static folder (ensure main server uses express.static)
  // Multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + unique + ext);
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== "application/pdf") {
        cb(new Error("Only PDF allowed"));
      } else cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });

  // POST /api/documents/upload  -> handles file upload + metadata
  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const { title, description, category = "Aadhaar Guide", tags = "" } =
        req.body;

      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file" });
      }
      if (!title || !description) {
        return res
          .status(400)
          .json({ success: false, message: "Title & description required" });
      }

      const fileUrl = `/uploads/${req.file.filename}`; // static path
      const size = (req.file.size / 1024 / 1024).toFixed(1) + " MB";

      const doc = await Document.create({
        title,
        description,
        category,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        fileUrl,
        size,
        createdBy: req.body.createdBy || "Admin",
      });

      // Emit real-time event to clients
      io.emit("new-document", doc);

      return res.json({ success: true, document: doc });
    } catch (err) {
      console.error("DOC UPLOAD ERROR:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  });

  // GET /api/documents
  router.get("/", async (req, res) => {
    try {
      const docs = await Document.find().sort({ createdAt: -1 });
      return res.json({ success: true, documents: docs });
    } catch (err) {
      console.error("GET DOCS ERROR:", err);
      return res.status(500).json({ success: false });
    }
  });

  // DELETE /api/documents/:id  (optional)
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Document.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false });
      io.emit("document-deleted", { id });
      return res.json({ success: true, id });
    } catch (err) {
      console.error("DELETE DOC ERROR:", err);
      return res.status(500).json({ success: false });
    }
  });

  return router;
};
