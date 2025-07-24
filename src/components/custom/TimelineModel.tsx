import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Calendar } from "lucide-react";
import { format } from "date-fns";
import useAxios from "@/app/hooks/UseAxios";
import { Button } from "../ui/button";

interface TimelineFormData {
  date_from: string;
  date_to: string;
  hospital: string;
  disease: string;
  medicine: string;
  image: File | null;
  description: string;
}

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const api = useAxios();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<TimelineFormData>({
    date_from: format(new Date(), "yyyy-MM-dd"),
    date_to: format(new Date(), "yyyy-MM-dd"),
    hospital: "",
    disease: "",
    medicine: "",
    image: null,
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("date_from", formData.date_from);
      submitData.append("date_to", formData.date_to);
      submitData.append("hospital", formData.hospital);
      submitData.append("disease", formData.disease);
      submitData.append("medicine", formData.medicine);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await api.post("/timeline/", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        // Reset form
        setFormData({
          date_from: format(new Date(), "yyyy-MM-dd"),
          date_to: format(new Date(), "yyyy-MM-dd"),
          hospital: "",
          disease: "",
          medicine: "",
          image: null,
          description: "",
        });
        setImagePreview(null);
        
        // Close modal and refresh data
        onSuccess();
        onClose();
      } else {
        setError("Failed to save data. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting timeline entry:", err);
      setError("An error occurred while saving your data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal if clicked outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-blue-500 text-white flex justify-between items-center">
              <h3 className="font-medium">Add Medical Record</h3>
              <button
                onClick={onClose}
                className="text-white hover:bg-blue-600 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4">
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                {/* Date range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="date_from" className="block text-sm font-medium text-gray-700 mb-1">
                      From Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date_from"
                        name="date_from"
                        value={formData.date_from}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                      />
                      <Calendar className="absolute right-3 top-2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="date_to" className="block text-sm font-medium text-gray-700 mb-1">
                      To Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date_to"
                        name="date_to"
                        value={formData.date_to}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                      />
                      <Calendar className="absolute right-3 top-2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {/* Hospital */}
                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital/Clinic
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Enter hospital or clinic name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                
                {/* Disease */}
                <div>
                  <label htmlFor="disease" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    id="disease"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="Normal">Normal</option>
                    <option value="Abnormal">Abnormal</option>
                    <option value="Piles">Piles</option>
                    <option value="High Blood Pressure">High Blood Pressure</option>
                    <option value="Low Blood Pressure">Low Blood Pressure</option>
                  </select>
                </div>
                
                {/* Medicine */}
                <div>
                  <label htmlFor="medicine" className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine/Treatment
                  </label>
                  <input
                    type="text"
                    id="medicine"
                    name="medicine"
                    value={formData.medicine}
                    onChange={handleChange}
                    placeholder="Enter prescribed medicines or treatment"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add additional notes"
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                
                {/* Image upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          <div className="relative w-32 h-32 mb-3">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData(prev => ({ ...prev, image: null }));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form actions */}
              <div className="mt-6 flex items-center justify-end space-x-3">
                <Button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Record"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineModal;