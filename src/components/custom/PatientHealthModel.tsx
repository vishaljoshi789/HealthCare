import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import useAxios from "@/app/hooks/UseAxios";

interface PatientDetails {
  dob: string;
  address: string;
  phone: string;
  blood_group: string;
  height: string;
  weight: string;
  gender: string;
}



// For UI display purposes
interface HealthCondition {
  diseases: string[];
  allergies: string[];
  currentInjuries: string[];
  notes: string;
  medications: string[];
}

const MotionButton = motion(Button);
const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

interface GetHealthProps {
  getUserInfo : () => void;
}
const GetHealthInfoPage = ({getUserInfo}: GetHealthProps) => {
  // State
  const [activeTab, setActiveTab] = useState<string>("patient-details");
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    dob: "",
    blood_group: "",
    height: "",
    weight: "",
    gender: "",
    address: "",
    phone: "",
  });

  const [healthCondition, setHealthCondition] = useState<HealthCondition>({
    diseases: [],
    allergies: [],
    currentInjuries: [],
    notes: "",
    medications: [],
  });



  const [currentInput, setCurrentInput] = useState<{
    disease: string;
    allergy: string;
    injury: string;
    medication: string;
  }>({
    disease: "",
    allergy: "",
    injury: "",
    medication: "",
  });

  

  // Handlers
  const handlePatientDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "disease" | "allergy" | "injury" | "medication"
  ) => {
    setCurrentInput((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddItem = (field: keyof Omit<HealthCondition, "notes">) => {
    const inputField =
      field === "diseases"
        ? "disease"
        : field === "allergies"
        ? "allergy"
        : field === "currentInjuries"
        ? "injury"
        : "medication";

    const value = currentInput[inputField as keyof typeof currentInput];

    if (value.trim()) {
      // Update the array for UI display
      setHealthCondition((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));

      // Reset the input field
      setCurrentInput((prev) => ({ ...prev, [inputField]: "" }));
    }
  };

  const handleRemoveItem = (
    field: keyof Omit<HealthCondition, "notes">,
    index: number
  ) => {
    setHealthCondition((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    
    // Update healthCondition
    setHealthCondition(prev => ({
      ...prev,
      notes: value
    }));
  };
  const api = useAxios();
  const handleSubmit = async () => {
    // Create the final form data by combining patientDetails and healthCondition
    const finalData = {
      dob: patientDetails.dob,
      blood_group: patientDetails.blood_group,
      height: patientDetails.height,
      weight: patientDetails.weight,
      gender: patientDetails.gender,
      address: patientDetails.address,
      phone: patientDetails.phone,
      disease: healthCondition.diseases.join(', '),
      allergies: healthCondition.allergies.join(', '),
      medications: healthCondition.medications.join(', '),
      notes: healthCondition.notes,
    };
    
    const res = await api.post('/userInfo/', finalData);
    // Process form submission here
    if(res.status === 200) {
      getUserInfo();
    }
    
    console.log(res);
    alert("Patient information submitted successfully!");
    // Reset form or redirect as needed
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Patient Health Information</h1>
          <p className="text-muted-foreground">
            Please fill in the patient details and health conditions
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-background mb-6">
            <TabsTrigger value="patient-details">Patient Details</TabsTrigger>
            <TabsTrigger value="health-condition">Health Condition</TabsTrigger>
          </TabsList>

          <TabsContent value="patient-details" className="space-y-6">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dob"
                  type="date"
                  value={patientDetails.dob}
                  onChange={handlePatientDetailsChange}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="blood_group">Blood Group</Label>
                <Input
                  id="blood_group"
                  name="blood_group"
                  type="text"
                  value={patientDetails.blood_group}
                  onChange={handlePatientDetailsChange}
                  placeholder="A+"
                />
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    name="height"
                    value={patientDetails.height}
                    onChange={handlePatientDetailsChange}
                    placeholder="180 cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    value={patientDetails.weight}
                    onChange={handlePatientDetailsChange}
                    placeholder="75 kg"
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={patientDetails.gender}
                  onChange={handlePatientDetailsChange}
                  placeholder="Male/Female/Other"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={patientDetails.phone}
                  onChange={handlePatientDetailsChange}
                  placeholder="+1 123-456-7890"
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={patientDetails.address}
                  onChange={handlePatientDetailsChange}
                  placeholder="123 Main St, City, Country"
                />
              </motion.div>

              <motion.div className="flex justify-end" variants={itemVariants}>
                <MotionButton
                  onClick={() => setActiveTab("health-condition")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  size="lg"
                >
                  Next
                </MotionButton>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="health-condition" className="space-y-6">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Label htmlFor="disease" className="text-lg font-medium">Diseases</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="disease"
                          value={currentInput.disease}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "disease")
                          }
                          placeholder="Enter disease"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("diseases")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("diseases")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {healthCondition.diseases.map((disease, index) => (
                            <MotionBadge
                              key={`disease-${index}`}
                              className="px-3 py-1 flex items-center"
                              variants={badgeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                            >
                              <span>{disease}</span>
                              <motion.div
                                className="ml-1 cursor-pointer flex items-center justify-center"
                                onClick={() =>
                                  handleRemoveItem("diseases", index)
                                }
                                whileHover={{ scale: 1.2 }}
                              >
                                <X className="h-3 w-3" />
                              </motion.div>
                            </MotionBadge>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.1,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Label htmlFor="allergy" className="text-lg font-medium">Allergies</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="allergy"
                          value={currentInput.allergy}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "allergy")
                          }
                          placeholder="Enter allergy"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("allergies")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("allergies")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {healthCondition.allergies.map((allergy, index) => (
                            <MotionBadge
                              key={`allergy-${index}`}
                              className="px-3 py-1 flex items-center"
                              variants={badgeVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                            >
                              <span>{allergy}</span>
                              <motion.div
                                className="ml-1 cursor-pointer flex items-center justify-center"
                                onClick={() =>
                                  handleRemoveItem("allergies", index)
                                }
                                whileHover={{ scale: 1.2 }}
                              >
                                <X className="h-3 w-3" />
                              </motion.div>
                            </MotionBadge>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.2,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Label htmlFor="injury" className="text-lg font-medium">Current Injuries</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="injury"
                          value={currentInput.injury}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "injury")
                          }
                          placeholder="Enter current injury"
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleAddItem("currentInjuries")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("currentInjuries")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {healthCondition.currentInjuries.map(
                            (injury, index) => (
                              <MotionBadge
                                key={`injury-${index}`}
                                className="px-3 py-1 flex items-center"
                                variants={badgeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                              >
                                <span>{injury}</span>
                                <motion.div
                                  className="ml-1 cursor-pointer flex items-center justify-center"
                                  onClick={() =>
                                    handleRemoveItem("currentInjuries", index)
                                  }
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <X className="h-3 w-3" />
                                </motion.div>
                              </MotionBadge>
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div variants={itemVariants}>
                <MotionCard
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: 0.3,
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <Label htmlFor="medication" className="text-lg font-medium">Current Medications</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="medication"
                          value={currentInput.medication}
                          onChange={(e) =>
                            handleCurrentInputChange(e, "medication")
                          }
                          placeholder="Enter medication"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddItem("medications")
                          }
                        />
                        <MotionButton
                          variant="outline"
                          onClick={() => handleAddItem("medications")}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add
                        </MotionButton>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <AnimatePresence>
                          {healthCondition.medications.map(
                            (medication, index) => (
                              <MotionBadge
                                key={`medication-${index}`}
                                className="px-3 py-1 flex items-center"
                                variants={badgeVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                              >
                                <span>{medication}</span>
                                <motion.div
                                  className="ml-1 cursor-pointer flex items-center justify-center"
                                  onClick={() =>
                                    handleRemoveItem("medications", index)
                                  }
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <X className="h-3 w-3" />
                                </motion.div>
                              </MotionBadge>
                            )
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="notes" className="text-lg font-medium">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={healthCondition.notes}
                  onChange={handleNotesChange}
                  placeholder="Enter any additional notes about the patient's health"
                  rows={4}
                  className="min-h-32"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-between pt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionButton
                variant="outline"
                onClick={() => setActiveTab("patient-details")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                size="lg"
              >
                Back
              </MotionButton>
              <MotionButton
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                size="lg"
              >
                Submit
              </MotionButton>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GetHealthInfoPage;