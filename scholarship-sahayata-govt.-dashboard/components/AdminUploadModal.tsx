import React, { useState } from "react";
import { io } from "socket.io-client";

// Mock uploadDocument function - replace with actual implementation when services are available
const uploadDocument = async (formData: FormData) => {
  console.log("Document upload initiated:", formData);
  return { success: true, document: { _id: "mock-id", size: 0, fileUrl: "", createdAt: new Date() } };
};

const socket = io("http://localhost:5000"); // ⭐ Real-time connection

const CATEGORY_OPTIONS = [
  "Aadhaar Guide",
  "DBT Schemes",
  "Scholarship",
  "Educational",
  "Application Form",
  "Process Update",
];

interface Props {
  onUploaded?: () => void;
  onClose?: () => void;
}

export default function AdminUploadModal({ onUploaded, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Please upload a PDF file.");
    if (!title.trim()) return alert("Title is required");

    const fd = new FormData();
    fd.append("file", file); // ⭐ IMPORTANT → backend expects "file"
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())));

    try {
      setLoading(true);

      const res = await uploadDocument(fd);

      if (!res.success) {
        alert("Upload failed ❌");
        return;
      }

      const newDoc = res.document; // ⭐ Returned from backend

      // ----------------------------
      // ⭐ REAL-TIME DOCUMENT BROADCAST
      // ----------------------------
      socket.emit("new-document", {
        _id: newDoc._id,
        title,
        description,
        category,
        tags: tags.split(",").map(t => t.trim()),
        size: newDoc.size,
        fileUrl: newDoc.fileUrl,
        createdAt: newDoc.createdAt,
      });

      alert("Document Uploaded Successfully ✔");

      // Reset form
      setTitle("");
      setDescription("");
      setCategory(CATEGORY_OPTIONS[0]);
      setTags("");
      setFile(null);

      if (onUploaded) onUploaded();
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-45 flex items-center justify-center z-1000">
      <div className="w-[460px] bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-center font-bold text-xl m-0">📄 Upload New Document</h2>

        <form onSubmit={handleUpload} className="mt-2">
          <label className="block mt-3 mb-1 font-semibold">Document Title *</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mt-3 mb-1 font-semibold">Description *</label>
          <textarea
            className="w-full p-2 h-16 border rounded"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="block mt-3 mb-1 font-semibold">Category</label>
          <select
            className="w-full p-2 border rounded"
            title="Select document category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <label className="block mt-3 mb-1 font-semibold">Tags (comma separated)</label>
          <input
            className="w-full p-2 border rounded"
            placeholder="guide, pdf, aadhaar"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <label className="block mt-3 mb-1 font-semibold">Upload PDF *</label>
          <input
            type="file"
            accept="application/pdf"
            placeholder="Select PDF file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />

          <button type="submit" className="w-full mt-4 p-2 bg-violet-700 text-white border-none rounded hover:bg-violet-800 cursor-pointer" disabled={loading}>
            {loading ? "Uploading..." : "Upload PDF"}
          </button>

          <button type="button" onClick={onClose} className="w-full mt-2 p-2 bg-gray-300 border-none rounded hover:bg-gray-400 cursor-pointer">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
