import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Calendar, User, Hospital, FileText, PlusCircle, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";

interface EntryDetails {
  hospital: string;
  date_from: string;
  date_to: string;
  disease: string;
  user: string;
  medicine: string;
  image?: string;
  description?: string; // Add this field to accept markdown content directly
}

interface TimelineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryId: string | null;
  entryDetails?: EntryDetails; // Add this optional prop to pass details directly
}

const TimelineDetailsModal: React.FC<TimelineDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  entryId,
  entryDetails: initialEntryDetails 
}) => {
  const [markdownData, setMarkdownData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [entryDetails, setEntryDetails] = useState<EntryDetails | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialEntryDetails) {
        // If entry details are passed directly as a prop
        setEntryDetails(initialEntryDetails);
        if (initialEntryDetails.description) {
          setMarkdownData(initialEntryDetails.description);
        }
        setIsLoading(false);
        setError(null);
      } else if (entryId) {
        // Otherwise fetch from API
        fetchEntryDetails(entryId);
      }
    }
  }, [isOpen, entryId, initialEntryDetails]);

  const fetchEntryDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/timeline/details/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to load details");
      }
      
      const data = await response.json();
      setEntryDetails(data.entry);

      if (data.entry.description) {
        // If description is included in the response
        setMarkdownData(data.entry.description);
      } else if (data.entry.markdownUrl) {
        // If we need to fetch the markdown content from a URL
        const markdownResponse = await fetch(data.entry.markdownUrl);
        if (!markdownResponse.ok) {
          throw new Error("Failed to load markdown content");
        }
        const markdownContent = await markdownResponse.text();
        setMarkdownData(markdownContent);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching details:", err);
      setError("Failed to load details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const getSeverityColor = (severity: string) => {
    if (!severity) return "bg-gray-100 text-gray-700";
    
    const severityLower = severity.toLowerCase();
    if (severityLower === "normal") return "bg-green-100 text-green-700";
    if (severityLower === "piles" || severityLower.includes("low")) return "bg-yellow-100 text-yellow-700";
    if (severityLower === "high" || severityLower.includes("critical")) return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          <motion.div
            className="w-full max-w-3xl bg-white rounded-lg shadow-xl relative z-10 max-h-[90vh] flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Patient Details</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-3"></div>
                  <p className="text-sm text-gray-600">Loading details...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="bg-red-100 p-3 rounded-full mb-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Error</h3>
                  <p className="text-xs text-gray-500 mt-1 text-center">{error}</p>
                  <button
                    className="mt-3 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => entryId && fetchEntryDetails(entryId)}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Entry summary section */}
                  {entryDetails && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{entryDetails.hospital}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {format(new Date(entryDetails.date_from), "MMM d, yyyy")} - {format(new Date(entryDetails.date_to), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(entryDetails.disease)}`}>
                          {entryDetails.disease}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex items-center text-gray-700">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">Patient ID:</span>
                            <span className="ml-2">{entryDetails.user}</span>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md border border-gray-200">
                          <div className="flex items-center text-gray-700">
                            <Hospital className="w-4 h-4 mr-2" />
                            <span className="font-medium">Treatment:</span>
                            <span className="ml-2">{entryDetails.medicine}</span>
                          </div>
                        </div>
                      </div>
                      
                      {entryDetails.image && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-700">Attachments</h4>
                            <button
                              className="text-xs bg-blue-500 text-white py-1 px-2 rounded flex items-center"
                              onClick={() => window.open(`http://192.168.225.187:8000${entryDetails.image}`, "_blank")}
                            >
                              <Download className="w-3 h-3 mr-1" /> Download
                            </button>
                          </div>
                          <div className="bg-white p-2 rounded-md border border-gray-200">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-600">Medical record image</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Markdown content section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="text-gray-800 font-semibold mb-4 pb-2 border-b border-gray-100">
                      Detailed Report
                    </h3>
                    
                    {markdownData ? (
                      <div className="prose prose-blue max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {markdownData}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic text-sm py-4 text-center">
                        No detailed report available for this entry
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Modal footer */}
            <div className="border-t border-gray-200 p-4 flex justify-between items-center">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              
              <button
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors flex items-center"
                onClick={() => alert("Printing or saving functionality would be implemented here")}
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Notes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TimelineDetailsModal;