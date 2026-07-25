const express = require("express");
const Notification = require("../models/Notification");

module.exports = function (io) {
  const router = express.Router();

  // -------------------------------
  // CREATE NOTIFICATION
  // -------------------------------
  router.post("/", async (req, res) => {
    try {
      const {
        title,
        description,
        message,
        type,
         longMessage,
        category,
        audience,
        priority,
        link,
        accountType,
        createdBy,
      } = req.body;

      // Basic validation
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and Description are required",
        });
      }

      // Auto-generate accountType if not provided
      const finalAccountType =
        accountType ||
        (category === "Aadhaar"
          ? "aadhaar"
          : category === "DBT"
          ? "dbt"
          : "scholarship");

      const notif = await Notification.create({
        title,
        description,
        message,
        longMessage, 
        type: type || "INFO",
        category: category || "General",
        audience: audience || "All Students",
        priority: priority || "MEDIUM",
        link: link || "",
        accountType: finalAccountType,
        createdBy: createdBy || "Admin",
        createdAt: new Date(),
      });

      // Realtime emit
      io.emit("new-notification", notif);

      return res.json({
        success: true,
        notification: notif,
      });
    } catch (err) {
      console.error("POST ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error creating notification",
      });
    }
  });

  // -------------------------------
  // GET ALL NOTIFICATIONS
  // -------------------------------
  router.get("/", async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });

      return res.json({
        success: true,
        notifications,
      });
    } catch (err) {
      console.error("GET ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Error fetching notifications",
      });
    }
  });

  // -------------------------------
  // DELETE NOTIFICATION
  // -------------------------------
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const deletedNotif = await Notification.findByIdAndDelete(id);

      if (!deletedNotif) {
        return res.status(404).json({
          success: false,
          message: "Notification not found",
        });
      }

      // Realtime delete
      io.emit("notification-deleted", { id });

      return res.json({
        success: true,
        id,
        message: "Notification deleted successfully",
      });
    } catch (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error deleting notification",
      });
    }
  });

  return router;
};
