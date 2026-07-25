// src/services/docService.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change port if your backend runs on different port
});

// ⭐ Upload a document (PDF)
export const uploadDocument = (formData) =>
  API.post("/docs/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ⭐ Get all documents
export const listDocuments = () => API.get("/docs");

// ⭐ Download a document by ID
export const downloadDocument = (id) =>
  API.get(`/docs/download/${id}`, { responseType: "blob" });

