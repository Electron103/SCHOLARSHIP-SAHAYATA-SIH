// backend/controllers/docController.js
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');

//
// 📌 Upload a Document
//
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'No file uploaded' });

    const {
      title,
      description = '',
      category,
      tags = '',
      uploadedBy = 'Admin'
    } = req.body;

    if (!title || !category)
      return res.status(400).json({ message: 'Missing title or category' });

    // URL where file will be available
    const fileUrl = `/uploads/${req.file.filename}`;

    const doc = await Document.create({
      title,
      description,
      filename: req.file.filename,
      url: fileUrl,
      size: req.file.size,
      category,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      uploadedBy
    });

    return res.status(201).json({
      message: 'Document uploaded successfully',
      document: doc
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

//
// 📌 Get All Documents
//
exports.listDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

//
// 📌 Download a Document + Increase Download Count
//
exports.downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id);

    if (!doc)
      return res.status(404).json({ message: 'Document not found' });

    const filePath = path.join(__dirname, '..', 'uploads', doc.filename);

    // increase download count
    doc.downloads += 1;
    await doc.save();

    return res.download(filePath, doc.filename);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Download error', error: err.message });
  }
};
