import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvadtratp/image/upload";
const UPLOAD_PRESET = "bestpointgh";

export default function FileUpload({ file, setFile, setFileUrl }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // ✅ Check file size (5MB max)
    const maxSizeMB = 5;
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB. Please upload a smaller file.`);
      return;
    }

    setFile(selectedFile);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFileUrl(data.secure_url); // ✅ Send Cloudinary URL to parent
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-1">
        Attach documents *
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-dashed border-purple-100 rounded-md bg-purple-50">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-10 w-10 text-purple-500"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M14 22l10-10 10 10m-10-10v24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex flex-col items-center text-sm text-purple-100">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-gray-800 hover:text-purple-200 focus-within:outline-none px-4 py-2"
            >
              {file ? (
                <div className="flex items-center gap-2">
                  {uploading ? (
                    <Loader2 className="animate-spin text-purple-500" size={20} />
                  ) : (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                  <span
                    className={`font-semibold ${
                      uploading ? "text-purple-500" : "text-green-600"
                    }`}
                  >
                    {file.name}
                  </span>
                </div>
              ) : (
                <span>Drag and drop files here...</span>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <p className="text-xs text-purple-100">
            Combine your cover letter and CV in one PDF, Max size: 5MB
          </p>
        </div>
      </div>
    </div>
  );
}
