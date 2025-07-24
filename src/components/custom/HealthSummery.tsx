import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Heart, Pill } from "lucide-react";
import { Activity } from "lucide-react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
  hover: { backgroundColor: "#f7fafc", transition: { duration: 0.2 } },
};

interface VitalSign {
  id: string;
  date: string;
  heartRate: number;
  bloodPressure: string;
  temperature: number;
  bloodGlucose: number;
  oxygenLevel: number;
  weight: number;
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

const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
  {
    id: "vs1",
    date: "2025-02-28",
    heartRate: 72,
    bloodPressure: "128/82",
    temperature: 98.6,
    bloodGlucose: 110,
    oxygenLevel: 98,
    weight: 185,
  },
  {
    id: "vs2",
    date: "2025-02-15",
    heartRate: 75,
    bloodPressure: "130/85",
    temperature: 98.4,
    bloodGlucose: 115,
    oxygenLevel: 97,
    weight: 187,
  },
  {
    id: "vs3",
    date: "2025-02-01",
    heartRate: 78,
    bloodPressure: "132/88",
    temperature: 98.7,
    bloodGlucose: 118,
    oxygenLevel: 98,
    weight: 188,
  },
]);

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

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};
const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

const HealthSummery = () => {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Health Summary */}
      <motion.div
        className="lg:col-span-2 "
        variants={cardVariants}
        whileHover="hover"
      >
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Health Summary</CardTitle>
            <CardDescription className="mb-3">
              View your latest vital signs and health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="vitals">
              <TabsList className="mb-4">
                <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="vitals">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            >
                              <Heart className="w-4 h-4 mr-2 text-red-500" />
                            </motion.div>
                            <span className="text-sm font-medium">
                              Heart Rate
                            </span>
                          </div>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].heartRate} bpm
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1 }}
                        >
                          <Progress
                            value={(vitalSigns[0].heartRate / 120) * 100}
                            className="h-2"
                          />
                        </motion.div>
                        <p className="text-xs text-gray-500">
                          Normal range: 60-100 bpm
                        </p>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Blood Pressure
                          </span>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].bloodPressure} mmHg
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                          >
                            <Progress
                              value={
                                (parseInt(
                                  vitalSigns[0].bloodPressure.split("/")[0]
                                ) /
                                  180) *
                                100
                              }
                              className="h-2"
                            />
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Target: Below 120/80 mmHg
                        </p>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Temperature
                          </span>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].temperature}°F
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                          >
                            <Progress
                              value={
                                ((vitalSigns[0].temperature - 97) / 5) * 100
                              }
                              className="h-2"
                            />
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Normal: 97.7-99.5°F
                        </p>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Activity className="w-4 h-4 mr-2 text-blue-500" />
                            </motion.div>
                            <span className="text-sm font-medium">
                              Blood Glucose
                            </span>
                          </div>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].bloodGlucose} mg/dL
                          </span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.1 }}
                        >
                          <Progress
                            value={
                              ((vitalSigns[0].bloodGlucose - 70) / 130) * 100
                            }
                            className="h-2"
                          />
                        </motion.div>
                        <p className="text-xs text-gray-500">
                          Target: 70-130 mg/dL before meals
                        </p>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Oxygen Level
                          </span>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].oxygenLevel}%
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                          >
                            <Progress
                              value={vitalSigns[0].oxygenLevel}
                              className="h-2"
                            />
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500">Normal: 95-100%</p>
                      </motion.div>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Weight</span>
                          <span className="text-lg font-semibold">
                            {vitalSigns[0].weight} lbs
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.3 }}
                          >
                            <Progress
                              value={(vitalSigns[0].weight / 250) * 100}
                              className="h-2"
                            />
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Trend:{" "}
                          {vitalSigns[0].weight - vitalSigns[1].weight > 0
                            ? `+${vitalSigns[0].weight - vitalSigns[1].weight}`
                            : vitalSigns[0].weight - vitalSigns[1].weight}{" "}
                          lbs from last visit
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Health Overview
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-2">
                                <Heart className="h-6 w-6 text-blue-700" />
                              </div>
                              <h4 className="text-lg font-semibold">
                                Cardiovascular
                              </h4>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5 }}
                              >
                                <Progress value={75} className="h-2 mt-2" />
                              </motion.div>
                              <Badge className="mt-2">Good</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-2">
                                <Activity className="h-6 w-6 text-green-700" />
                              </div>
                              <h4 className="text-lg font-semibold">
                                Metabolic
                              </h4>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "82%" }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                              >
                                <Progress value={82} className="h-2 mt-2" />
                              </motion.div>
                              <Badge className="mt-2" variant="outline">
                                Excellent
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-2">
                                <ClipboardList className="h-6 w-6 text-yellow-700" />
                              </div>
                              <h4 className="text-lg font-semibold">
                                Checkups
                              </h4>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ duration: 1.5, delay: 0.4 }}
                              >
                                <Progress value={60} className="h-2 mt-2" />
                              </motion.div>
                              <Badge className="mt-2" variant="secondary">
                                Average
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Wellness Goals
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Physical Activity
                            </span>
                            <span className="text-sm text-gray-600">
                              3/5 days complete
                            </span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1 }}
                          >
                            <Progress value={60} className="h-2" />
                          </motion.div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Medication Adherence
                            </span>
                            <span className="text-sm text-gray-600">
                              26/30 days
                            </span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.2 }}
                          >
                            <Progress value={87} className="h-2" />
                          </motion.div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Blood Pressure Readings
                            </span>
                            <span className="text-sm text-gray-600">
                              12/15 readings
                            </span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.4 }}
                          >
                            <Progress value={80} className="h-2" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Medications */}
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Medications</CardTitle>
              <MotionButton
                variant="outline"
                size="sm"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
              >
                <Pill className="w-4 h-4 mr-2" />
                Refill
              </MotionButton>
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {medications.map((medication, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={rowVariants}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">{medication.name}</h4>
                    <span
                      className={`text-sm ${
                        medication.refillsLeft <= 1
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {medication.refillsLeft} refills left
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {medication.dosage} • {medication.frequency}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Prescribed by {medication.prescribedBy}
                    </span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        Refill by{" "}
                        {new Date(medication.refillBy).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default HealthSummery;
