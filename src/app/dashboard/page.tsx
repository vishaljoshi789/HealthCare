"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Pill,
  FileText,
  MessageSquare,
  FileDown,
} from "lucide-react";

import LabResultsTimeline from "@/components/custom/LabResult";
import HealthcareMessaging from "@/components/custom/Message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickAction from "@/components/custom/QuickAction";
import AppointmentsSection from "@/components/custom/Appointment";
import useAxios from "../hooks/UseAxios";
import GetHealthInfoPage from "@/components/custom/PatientHealthModel";
import SOSButton from "@/components/custom/SOS";

// Type definitions
interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface PastAppointment extends Appointment {
  diagnosis: string;
  treatment: string;
  followUp: string;
  hasReport: boolean;
  reportId?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  refillBy: string;
  refillsLeft: number;
  prescribedBy: string;
  startDate: string;
}

interface LabResult {
  id: string;
  testName: string;
  date: string;
  status: string;
  result?: string;
  hasReport?: boolean;
  reportId?: string;
}

interface Message {
  id: string;
  from: string;
  title: string;
  preview: string;
  date: string;
  isRead: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function PatientDashboard() {
  const patientInfo = {
    name: "John Smith",
    age: 45,
    dob: "1980-04-15",
    primaryDoctor: "Dr. James Wilson",
    nextAppointment: "March 15, 2025",
    lastVisit: "February 28, 2025",
    insuranceProvider: "HealthPlus",
    insuranceId: "HP-2345678",
    allergies: ["Penicillin", "Shellfish"],
  };

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      refillBy: "2025-04-20",
      refillsLeft: 2,
      prescribedBy: "Dr. James Wilson",
      startDate: "2025-02-28",
    },
    {
      id: "2",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      refillBy: "2025-03-30",
      refillsLeft: 1,
      prescribedBy: "Dr. James Wilson",
      startDate: "2024-11-15",
    },
    {
      id: "3",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      refillBy: "2025-05-15",
      refillsLeft: 3,
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "2024-10-10",
    },
  ]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const api = useAxios();
  const getUserInfo = async () => {
    const res = await api.get("/userInfo/");
    if (res.status == 200) {
      setUserInfo(res.data);
    }
  };

  const [labResults, setLabResults] = useState<LabResult[]>([
    {
      id: "1",
      testName: "Comprehensive Metabolic Panel",
      date: "2025-02-28",
      status: "Completed",
      result: "Normal",
      hasReport: true,
      reportId: "LAB-7823",
    },
    {
      id: "2",
      testName: "Lipid Panel",
      date: "2025-02-28",
      status: "Completed",
      result: "Slightly Elevated",
      hasReport: true,
      reportId: "LAB-7824",
    },
    {
      id: "3",
      testName: "HbA1c",
      date: "2025-03-05",
      status: "Processing",
    },
    {
      id: "4",
      testName: "Thyroid Function",
      date: "2025-03-05",
      status: "Pending",
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      from: "Dr. James Wilson",
      title: "Follow-up from your last visit",
      preview:
        "I've reviewed your latest lab results and would like to discuss...",
      date: "2025-03-01",
      isRead: true,
    },
    {
      id: "2",
      from: "Medical Records",
      title: "Your Lab Results Are Available",
      preview: "Your recent lab tests have been completed. You can now...",
      date: "2025-03-04",
      isRead: false,
    },
    {
      id: "3",
      from: "Pharmacy",
      title: "Prescription Ready for Pickup",
      preview: "Your prescription for Lisinopril is ready for pickup at...",
      date: "2025-03-05",
      isRead: false,
    },
  ]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      scale: 1.02,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-6 px-4">
        {userInfo ? !userInfo.dob ? (
          <GetHealthInfoPage getUserInfo={getUserInfo} />
        ) : (
          <>
            {/* Patient Header */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>
                      {userInfo.first_name[0] + userInfo.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold">{userInfo.first_name + " " +userInfo.last_name}</h1>
                  <p className="text-gray-500">
                    DOB: {userInfo.dob} • {userInfo.age} years
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
            >
              <motion.div
                key="next-appointment"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      </motion.div>
                      <CardTitle className="text-lg">
                        Next Appointment
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">
                      {patientInfo.nextAppointment}
                    </p>
                    <p className="text-sm text-gray-600">
                      With {patientInfo.primaryDoctor}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="medications"
                variants={cardVariants}
                whileHover="hover"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <motion.div
                        animate={{ rotateY: [0, 360] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 4,
                        }}
                      >
                        <Pill className="w-4 h-4 mr-2 text-green-600" />
                      </motion.div>
                      <CardTitle className="text-lg">Medications</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{medications.length}</p>
                    <p className="text-sm text-yellow-600">
                      {medications.filter((med) => med.refillsLeft <= 1).length}{" "}
                      need refill soon
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="lab-results"
                variants={cardVariants}
                whileHover="hover"
                onClick={() =>
                  document
                    .getElementById("timeline")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2 text-purple-600" />
                      </motion.div>
                      <CardTitle className="text-lg">Lab Results</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">
                      {
                        labResults.filter((lab) => lab.status === "Completed")
                          .length
                      }{" "}
                      Complete
                    </p>
                    <p className="text-sm text-blue-600">
                      {
                        labResults.filter((lab) => lab.status !== "Completed")
                          .length
                      }{" "}
                      pending
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="messages"
                variants={cardVariants}
                whileHover="hover"
                onClick={() =>
                  document
                    .getElementById("message")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2 text-red-600" />
                      </motion.div>
                      <CardTitle className="text-lg">Messages</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold">{messages.length}</p>
                    <motion.p
                      className="text-sm text-red-600"
                      animate={{
                        scale:
                          messages.filter((msg) => !msg.isRead).length > 0
                            ? [1, 1.05, 1]
                            : 1,
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {messages.filter((msg) => !msg.isRead).length} unread
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <AppointmentsSection />

            {/* Lab Results Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              id="message"
            >
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={itemVariants}
              >
                <div className="h-full max-h-[570px] overflow-auto" id="timeline">
                  <LabResultsTimeline />
                </div>
              </motion.div>

              {/* Messaging Section */}
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={itemVariants}
              >
                <div className="h-full max-h-[570px]">
                  <HealthcareMessaging />
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <QuickAction />
            <SOSButton/>
          </>
        ):<></>}
      </main>
    </div>
  );
}
