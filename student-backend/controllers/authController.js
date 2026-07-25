// controllers/authController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, username: admin.username, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Temporary route to create admin (run once)
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Provide username and password' });

    let existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Admin exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const admin = await Admin.create({ username, passwordHash, role: 'gov' });

    res.status(201).json({ message: 'Admin created', admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
