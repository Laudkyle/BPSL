import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Hero from "../components/About/Hero";
import UndoButton from "../components/UndoButton";
import { getNotice } from "../Api";
import { toast } from "react-toastify";

function NoticeDetails() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [viewerError, setViewerError] = useState(false);
  const [currentViewer, setCurrentViewer] = useState("google"); // google, office, direct

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        const response = await getNotice(id);
        setNotice(response.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to fetch notice details");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  // Function to get file extension
  const getFileExtension = (url) => {
    return url.split(".").pop().toLowerCase();
  };

  // Function to determine if file can be previewed
  const canPreview = (url) => {
    const ext = getFileExtension(url);
    return ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt"].includes(
      ext
    );
  };

  // Function to get appropriate viewer URL
  // Add this to your viewer options
  const getViewerUrl = (fileUrl, viewer) => {
    const encodedUrl = encodeURIComponent(fileUrl);

    switch (viewer) {
      case "google":
        return `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`;
      case "office":
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
      case "pdfjs":
        return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodedUrl}`;
      case "direct":
        return fileUrl;
      default:
        return `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`;
    }
  };

  // Handle viewer error
  const handleViewerError = () => {
    setViewerError(true);
  };

  // Switch to next viewer
  const switchViewer = (viewer) => {
    setCurrentViewer(viewer);
    setViewerError(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="p-8">
        <h1 className="text-3xl md:text-4xl text-red-500 font-semibold">
          {error ? "Error loading notice" : "Notice not found"}
        </h1>
        <Link
          to="/notices"
          className="text-purple-100 underline mt-4 inline-block"
        >
          Go back to Notices
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Hero text1="Notices" />
      <div className="flex gap-x-4 lg:gap-x-12 items-center justify-start mt-12">
        <div className="bg-purple h-8 w-12 mb-2" />
        <>
          <UndoButton />
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800 leading-tight">
            {notice.title}
          </h1>
        </>
      </div>
      <div className="my-6 px-6 max-w-4xl">
        {notice.image && (
          <img
            src={notice.image}
            alt={notice.title}
            className="rounded-xl w-full h-64 object-fit md:object-cover mb-6"
          />
        )}
        <p className="text-gray-700 whitespace-pre-wrap mb-6">
          {notice.description.replace(/\\n/g, "\n")}
        </p>
        
        {/* Related Links */}

        {notice.links && notice.links.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Related Links
            </h3>

            <ul className="space-y-2">
              {notice.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:text-purple-900 underline break-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {notice.file_url && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowFileModal(true)}
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
            >
              View Attached Document
            </button>
            <a
              href={notice.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Download Document
            </a>
          </div>
        )}
      </div>

      {/* Enhanced Document Preview Modal */}
      {showFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] h-[95%] rounded-lg shadow-lg relative overflow-hidden">
            {/* Header with viewer options and close button */}

            <div className="flex justify-between items-center p-3 bg-gray-100 border-b">
              <div className="flex gap-2">
                <button
                  onClick={() => switchViewer("google")}
                  className={`px-3 py-1 rounded text-sm ${
                    currentViewer === "google"
                      ? "bg-purple-700 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  Google Viewer
                </button>
                <button
                  onClick={() => switchViewer("office")}
                  className={`px-3 py-1 rounded text-sm ${
                    currentViewer === "office"
                      ? "bg-purple-700 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  Office Viewer
                </button>
              </div>
              <button
                onClick={() => {
                  setShowFileModal(false);
                  setViewerError(false);
                  setCurrentViewer("google");
                }}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Close
              </button>
            </div>

            {/* Document viewer content */}
            <div className="relative w-full h-[calc(100%-60px)]">
              {viewerError ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-red-500 text-lg mb-4">
                    Unable to preview this document
                  </div>
                  <div className="text-gray-600 mb-6">
                    The document viewer encountered an error. This might happen
                    if:
                    <ul className="mt-2 text-left list-disc list-inside">
                      <li>The file is not publicly accessible</li>
                      <li>The file format is not supported</li>
                      <li>The file is too large</li>
                      <li>There are CORS restrictions</li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={notice.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
                    >
                      Open in New Tab
                    </a>
                    <a
                      href={notice.file_url}
                      download
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {!canPreview(notice.file_url) ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="text-orange-500 text-lg mb-4">
                        Preview not available for this file type
                      </div>
                      <div className="text-gray-600 mb-6">
                        File type: .
                        {getFileExtension(notice.file_url).toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={notice.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
                        >
                          Open in New Tab
                        </a>
                        <a
                          href={notice.file_url}
                          download
                          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                        >
                          Download File
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={getViewerUrl(notice.file_url, currentViewer)}
                      title="Document Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      onError={handleViewerError}
                      onLoad={(e) => {
                        // Check if iframe loaded successfully
                        try {
                          const iframeDoc =
                            e.target.contentDocument ||
                            e.target.contentWindow.document;
                          if (
                            iframeDoc.title.includes("error") ||
                            iframeDoc.body.innerText.includes(
                              "preview is not available"
                            )
                          ) {
                            handleViewerError();
                          }
                        } catch (err) {
                          // Cross-origin restrictions prevent access, assume it's working
                          console.log(
                            "Cannot access iframe content due to CORS, assuming success"
                          );
                        }
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeDetails;
