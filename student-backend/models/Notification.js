const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },   
    message: { type: String },

    longMessage: { type: String, default: "" },   // ⭐ ADD THIS LINE

    type: { type: String, default: "INFO" },
    category: { type: String, default: "General" },

    audience: { type: String, default: "All Students" },
    priority: { type: String, default: "MEDIUM" },
    link: { type: String },

    accountType: { type: String, required: true },
    createdBy: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
