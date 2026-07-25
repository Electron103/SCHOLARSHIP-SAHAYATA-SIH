import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackHeaderProps {
  title: string;
}

// Change this to your login project's URL:
const FALLBACK_URL = "http://localhost:3000";

export default function BackHeader({ title }: BackHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    // If browser has history → go back
    if (window.history.length > 1) {
      navigate(-1);
    } 
    else {
      // If opened directly or from different project → redirect
      window.location.href = FALLBACK_URL;
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white shadow-sm">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft size={24} />
      </button>

      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
