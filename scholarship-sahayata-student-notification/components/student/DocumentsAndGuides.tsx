import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { io, Socket } from "socket.io-client";

type DocType = {
  _id: string;
  title: string;
  description: string;
  size: string;
  fileUrl: string;
  category: string;
  tags: string[];
  createdAt: string;
};

export default function DocumentsAndGuides() {
  const [docs, setDocs] = useState<DocType[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // INITIAL LOAD FROM BACKEND
  // -------------------------------
  useEffect(() => {
    async function loadDocs() {
      try {
        const res = await fetch("http://localhost:5000/api/documents");
        const data = await res.json();

        if (data.success) {
          setDocs(data.documents || []);
        } else {
          setDocs([]);
        }
      } catch (err) {
        console.error("Failed to load documents", err);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, []);

  // -------------------------------
  // REALTIME UPDATES VIA SOCKET.IO
  // -------------------------------
  useEffect(() => {
    const socket: Socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socket.on("new-document", (doc: DocType) => {
      console.log("Realtime new document:", doc);

      setDocs((prev) => {
        if (prev.some((p) => p._id === doc._id)) return prev;
        return [doc, ...prev]; // newest first
      });
    });

    return () => {
      socket.off("new-document");
      socket.disconnect();
    };
  }, []);

  // -------------------------------
  // DOWNLOAD HANDLER
  // -------------------------------
  function handleDownload(doc: DocType) {
    const url = `http://localhost:5000${doc.fileUrl}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.title + ".pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-3">
        📄 All Available Documents
      </h2>

      {loading ? (
        <div className="text-gray-500">Loading documents...</div>
      ) : docs.length === 0 ? (
        <div className="text-gray-500 italic">No documents available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {docs.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
            >
              {/* HEADER + DOWNLOAD BUTTON */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{d.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{d.description}</p>
                </div>

                <button
                  onClick={() => handleDownload(d)}
                  className="ml-4 px-3 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                >
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {d.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* SIZE + DATE */}
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>{d.size}</span>
                <span>{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
