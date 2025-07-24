"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MapPin, Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HospitalInfo {
  name: string;
  distance: string;
  address: string;
  phone: string;
  openHours: string;
  emergencyServices: string[];
}

const SOSButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  
  const nearbyHospitals: HospitalInfo[] = [
    {
      name: "City General Hospital",
      distance: "1.2 miles",
      address: "123 Medical Avenue, City Center",
      phone: "(555) 123-4567",
      openHours: "24/7 Emergency Services",
      emergencyServices: ["Emergency Room", "Trauma Center", "Cardiac Care"],
    },
    {
      name: "Memorial Medical Center",
      distance: "2.8 miles",
      address: "456 Health Boulevard, Westside",
      phone: "(555) 987-6543",
      openHours: "24/7 Emergency Services",
      emergencyServices: ["Level 1 Trauma Center", "Stroke Center", "Pediatric Emergency"],
    },
    {
      name: "Riverside Community Hospital",
      distance: "3.5 miles",
      address: "789 Care Lane, Riverside",
      phone: "(555) 456-7890",
      openHours: "24/7 Emergency Services",
      emergencyServices: ["Emergency Room", "Urgent Care", "Ambulance Services"],
    },
  ];

  const handleSendSOS = () => {
    setIsSending(true);
    
    // Simulate sending SOS
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg"
            aria-label="Emergency SOS"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              SOS
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* SOS Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600 text-2xl">
              <AlertCircle className="mr-2 h-6 w-6" />
              Emergency SOS
            </DialogTitle>
            <DialogDescription className="text-gray-700">
              Send an emergency alert to receive immediate assistance
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="hospitals" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
              <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hospitals" className="space-y-4">
              {nearbyHospitals.map((hospital, index) => (
                <motion.div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{hospital.distance} - {hospital.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{hospital.openHours}</span>
                      </div>
                      <div className="mt-2">
                        {hospital.emergencyServices.map((service, i) => (
                          <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open(`tel:${hospital.phone.replace(/[^0-9]/g, '')}`)}
                    >
                      Call
                    </Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Emergency Services</h3>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Emergency Number</p>
                        <p className="text-sm text-gray-600">911</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open("tel:911")}
                    >
                      Call
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Poison Control</p>
                        <p className="text-sm text-gray-600">(800) 222-1222</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open("tel:8002221222")}
                    >
                      Call
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Primary Doctor</p>
                        <p className="text-sm text-gray-600">Dr. James Wilson - (555) 234-5678</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => window.open("tel:5552345678")}
                    >
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              onClick={handleSendSOS}
              disabled={isSending || isSent}
            >
              {isSending ? (
                <>
                  <motion.div 
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full" 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : isSent ? (
                <>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </motion.svg>
                  SOS Sent!
                </>
              ) : (
                "Send SOS Alert"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {isSent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 flex flex-col items-center max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              </motion.div>
              <motion.h2
                className="text-xl font-bold text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Emergency Alert Sent Successfully
              </motion.h2>
              <motion.p
                className="text-gray-600 text-center mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Help is on the way. Please stay in a safe location.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;