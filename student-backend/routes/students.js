// routes/students.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Student;
try {
  Student = require("../models/Student");
} catch (e) {
  // fallback generic model if not present
  Student = mongoose.model("Student", new mongoose.Schema({}, { strict: false }), "students");
}

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 }).lean();
    return res.json({ students });
  } catch (err) {
    console.error("GET /api/students error:", err);
    return res.status(500).json({ error: "Failed to fetch students" });
  }
});

// POST create a student
router.post("/", async (req, res) => {
  try {
    const data = req.body || {};
    // Normalize phone to digits only (your frontend stores digits)
    if (data.phone) data.phone = String(data.phone).replace(/\D/g, "");

    // Minimal server-side validation
    if (!data.fullName && !data.phone) {
      return res.status(400).json({ error: "fullName or phone required" });
    }

    // Create student (preserve any existing fields)
    const newStudent = new Student({
      name: data.fullName || data.name || null,
      phone: data.phone || null,
      fullName: data.fullName || data.name || null,
      district: data.district || data.city || null,
      category: data.category || data.caste || null,
      aadharNo: data.aadharNo || null,
      bankAccount: data.bankAccount || null,
      status: data.status || "Pending",
      createdAt: new Date(),
      ...data,
    });

    const saved = await newStudent.save();

    // Emit socket event so dashboards update live
    try {
      const io = req.app.get("io");
      if (io) {
        // include loginInfo if exists (lookup)
        const db = require("mongoose").connection;
        const login = await db.collection("logins").findOne({ studentId: saved.phone || saved.studentId }) || null;
        const payload = {
          ...saved.toObject(),
          loginInfo: login
            ? {
                username: login.username,
                email: login.email,
                lastLogin: login.lastLogin,
              }
            : null,
        };
        io.emit("student-created", payload);
      }
    } catch (emitErr) {
      console.warn("Failed to emit student-created:", emitErr);
    }

    return res.json({ success: true, student: saved });
  } catch (err) {
    console.error("POST /api/students error:", err);
    return res.status(500).json({ error: "Failed to create student" });
  }
});

module.exports = router;
