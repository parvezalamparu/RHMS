import React, { useState } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("Image size should not exceed 2MB.");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Item Image
      </label>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0l-4 4m4-4l4 4M7 20h10a2 2 0 002-2V10a2 2 0 00-2-2H7v10z"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 2MB)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 max-h-32 w-full object-contain border rounded"
        />
      )}
    </div>
  );
};

export default ImageUploader;
