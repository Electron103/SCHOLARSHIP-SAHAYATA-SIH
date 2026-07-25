// controllers/studentController.js
const Student = require('../models/Student');
const crypto = require('crypto');

// ================================
// CREATE STUDENT
// ================================
exports.createStudent = async (req, res) => {
  try {
    const { 
      fullName,
      phone,
      email,
      aadhaarPlain,

      // ⭐ NEW FIELDS
      category,
      state,
      district
    } = req.body;

    let aadhaarHash = undefined;
    if (aadhaarPlain) {
      aadhaarHash = crypto
        .createHash('sha256')
        .update(aadhaarPlain)
        .digest('hex');
    }

    const student = await Student.create({
      fullName,
      phone,
      email,
      aadhaarHash,

      // ⭐ save new fields
      category,
      state,
      district
    });

    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ================================
// GET ONE
// ================================
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ================================
// UPDATE
// ================================
exports.updateStudent = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Handle aadhaar update
    if (updates.aadhaarPlain) {
      updates.aadhaarHash = crypto
        .createHash('sha256')
        .update(updates.aadhaarPlain)
        .digest('hex');
      delete updates.aadhaarPlain;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ================================
// DELETE
// ================================
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ================================
// LIST ALL
// ================================
exports.listStudents = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, verified } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { fullName: new RegExp(q, 'i') },
        { phone: new RegExp(q, 'i') },
        { email: new RegExp(q, 'i') }
      ];
    }

    if (verified !== undefined) query.verified = verified === 'true';

    const skip = (page - 1) * limit;
    const total = await Student.countDocuments(query);

    const students = await Student.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ page: Number(page), limit: Number(limit), total, students });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
