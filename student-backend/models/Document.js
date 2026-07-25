// backend/models/Document.js
const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },

    // fileUrl points to a server static path like /uploads/filename.pdf
    fileUrl: { type: String, required: true },
    size: { type: String },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
