import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, FileDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

interface UpcomingAppointment {
  id?: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

interface PastAppointment {
  id?: string;
  date: string;
  doctorName: string;
  specialty: string;
  diagnosis: string;
  hasReport: boolean;
  reportId?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
  hover: { backgroundColor: "rgba(0, 0, 0, 0.05)" },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const appointmentFormSchema = z.object({
  doctorName: z.string().min(2, { message: "Doctor name is required" }),
  specialty: z.string().min(2, { message: "Specialty is required" }),
  date: z.string().min(2, { message: "Date is required" }),
  time: z.string().min(2, { message: "Time is required" }),
  location: z.string().min(2, { message: "Location is required" }),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const MotionButton = motion(Button);
const MotionTableRow = motion(TableRow);

const AppointmentsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [upcomingAppointments, setUpcomingAppointments] = useState<
    UpcomingAppointment[]
  >([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "March 15, 2025",
      time: "10:30 AM",
      location: "Main Hospital, Room 302",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "March 22, 2025",
      time: "2:15 PM",
      location: "Medical Plaza, Suite 104",
    },
  ]);

  const [pastAppointments] = useState<PastAppointment[]>([
    {
      id: "3",
      date: "February 10, 2025",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurology",
      diagnosis: "Migraine",
      hasReport: true,
      reportId: "12345",
    },
    {
      id: "4",
      date: "January 23, 2025",
      doctorName: "Dr. James Wilson",
      specialty: "Orthopedics",
      diagnosis: "Mild sprain",
      hasReport: true,
      reportId: "12346",
    },
  ]);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      date: "",
      time: "",
      location: "",
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    const newAppointment: UpcomingAppointment = {
      ...data,
      id: `app-${Date.now()}`,
    };

    setUpcomingAppointments([...upcomingAppointments, newAppointment]);

    setIsModalOpen(false);

    form.reset();
  };

  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report ${reportId}`);
  };

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 mb-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: 0.3 }}
    >
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Appointments</CardTitle>
            <CardDescription className="text-gray-500">
              View your upcoming and past appointments
            </CardDescription>
          </div>
          <MotionButton
            onClick={() => setIsModalOpen(true)}
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </MotionButton>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="upcoming" className="rounded-md">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="rounded-md">
                Past Visits
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="upcoming">
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-semibold">Doctor</TableHead>
                        <TableHead className="font-semibold">
                          Specialty
                        </TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Time</TableHead>
                        <TableHead className="font-semibold">
                          Location
                        </TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment, i) => (
                        <MotionTableRow
                          key={appointment.id || i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          variants={rowVariants}
                          className="cursor-pointer"
                        >
                          <TableCell className="font-medium">
                            {appointment.doctorName}
                          </TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.date}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>{appointment.location}</TableCell>
                          <TableCell>
                            <MotionButton
                              variant="outline"
                              size="sm"
                              whileHover={buttonVariants.hover}
                              whileTap={buttonVariants.tap}
                              className="text-blue-600 border-blue-600"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Reschedule
                            </MotionButton>
                          </TableCell>
                        </MotionTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Doctor</TableHead>
                        <TableHead className="font-semibold">
                          Specialty
                        </TableHead>
                        <TableHead className="font-semibold">
                          Diagnosis
                        </TableHead>
                        <TableHead className="font-semibold">Report</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map((appointment, i) => (
                        <MotionTableRow
                          key={appointment.id || i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          variants={rowVariants}
                          className="cursor-pointer"
                        >
                          <TableCell className="font-medium">
                            {appointment.date}
                          </TableCell>
                          <TableCell>{appointment.doctorName}</TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{appointment.diagnosis}</TableCell>
                          <TableCell>
                            {appointment.hasReport && appointment.reportId && (
                              <MotionButton
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDownloadReport(appointment.reportId!)
                                }
                                whileHover={buttonVariants.hover}
                                whileTap={buttonVariants.tap}
                                className="text-green-600"
                              >
                                <motion.div
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                  }}
                                >
                                  <FileDown className="w-4 h-4 mr-2" />
                                </motion.div>
                                Download
                              </MotionButton>
                            )}
                          </TableCell>
                        </MotionTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule your appointment.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. John Smith"
                        {...field}
                        className="focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Main Hospital, Room 302"
                        {...field}
                        className="focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Schedule Appointment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AppointmentsSection;
