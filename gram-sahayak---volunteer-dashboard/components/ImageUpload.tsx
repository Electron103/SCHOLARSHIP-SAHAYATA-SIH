import React, { useState, useEffect } from 'react';
import { Camera, X, UploadCloud, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File | null) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, label = "Upload Photo Evidence" }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onImageSelected(null);
  };

  // Cleanup memory when component unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden ${
          preview 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        {preview ? (
          <div className="p-2 relative group">
            <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-black/5">
                <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-contain" 
                />
            </div>
            
            <button 
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-transform transform active:scale-95"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
            
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                <ImageIcon size={14} />
                Photo Selected
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            
            <h4 className="text-gray-900 font-semibold mb-1">Add Photo Proof</h4>
            <p className="text-gray-500 text-xs mb-6 max-w-[200px]">
              Take a photo directly or choose from your gallery (JPG, PNG only)
            </p>
            
            <div className="pointer-events-none inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg shadow-sm">
              <UploadCloud size={18} />
              <span>Browse Camera / Gallery</span>
            </div>

            <input 
              type="file" 
              accept="image/png, image/jpeg"
              capture="environment"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload photo"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;