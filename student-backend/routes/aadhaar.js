// routes/aadhaar.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Normalize digits helper
function normalizeDigits(s) {
  if (!s) return '';
  return String(s).replace(/\D/g, '');
}

// POST /api/aadhaar
// Body: { phone: '9876543210', aadhaar: '123412341234' }
// Finds Student by phone and stores aadhaarPlain (plaintext) on the document
router.post('/', async (req, res) => {
  try {
    const { phone, aadhaar } = req.body;
    if (!phone || !aadhaar) {
      return res.status(400).json({ message: 'phone and aadhaar are required' });
    }

    const phoneDigits = normalizeDigits(phone);
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ message: 'phone must be 10 digits' });
    }

    const aadhaarDigits = normalizeDigits(aadhaar);
    if (aadhaarDigits.length !== 12) {
      return res.status(400).json({ message: 'aadhaar must be 12 digits' });
    }

    // find student by phone
    const student = await Student.findOne({ phone: phoneDigits });
    if (!student) {
      return res.status(404).json({ message: 'Student not found for given phone' });
    }

    // WARNING: storing plaintext Aadhaar
    student.aadhaarPlain = aadhaarDigits;
    await student.save();

    return res.json({ message: 'Aadhaar stored (plaintext)' });
  } catch (err) {
    console.error('POST /api/aadhaar error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
