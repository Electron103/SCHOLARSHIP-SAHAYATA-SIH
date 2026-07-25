// routes/logins.js
const express = require("express");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const Login = require("../models/Login");
const router = express.Router();

// Rate limiter (dev-friendly)
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 60,
  message: { error: "Too many requests, please try again later." },
});

router.post(
  "/",
  limiter,
  body("studentId").trim().notEmpty().withMessage("studentId is required"),
  body("username").optional().trim().escape(),
  body("email").optional().isEmail().normalizeEmail(),
  body("lastLogin").optional().isISO8601().toDate(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { studentId } = req.body;
      const username = req.body.username || null;
      const email = req.body.email || null;
      const lastLogin = req.body.lastLogin ? new Date(req.body.lastLogin) : new Date();

      // server-side metadata
      const ip =
        (req.headers["x-forwarded-for"] && req.headers["x-forwarded-for"].split(",")[0].trim()) ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        null;
      const userAgent = req.get("User-Agent") || null;

      // Upsert latest login
      const updated = await Login.findOneAndUpdate(
        { studentId },
        {
          $set: {
            username,
            email,
            lastLogin,
            ip,
            userAgent,
            updatedAt: new Date(),
          },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true, new: true }
      ).lean();

      // Append to history
      const db = require("mongoose").connection;
      const historyColl = db.collection("login_history");
      await historyColl.insertOne({
        studentId,
        username,
        email,
        lastLogin,
        ip,
        userAgent,
        createdAt: new Date(),
      });

      // Emit socket event to connected dashboards (if Io is available on app)
      try {
        const io = req.app.get("io");
        if (io) {
          io.emit("login-updated", {
            studentId,
            loginInfo: {
              username: updated.username,
              email: updated.email,
              lastLogin: updated.lastLogin,
              ip: updated.ip,
              userAgent: updated.userAgent,
            },
          });
        }
      } catch (emitErr) {
        console.warn("Failed to emit login-updated:", emitErr);
      }

      return res.json({ ok: true });
    } catch (err) {
      console.error("POST /api/logins error:", err);
      return res.status(500).json({ error: "Failed to save login" });
    }
  }
);

module.exports = router;
