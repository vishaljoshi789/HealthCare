import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Calendar, ClipboardList, MessageSquare, Pill } from "lucide-react";

const MotionButton = motion(Button);

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const QuickAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MotionButton
          className="h-24 flex flex-col items-center justify-center"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Calendar className="h-6 w-6 mb-2" />
          </motion.div>
          Schedule Appointment
        </MotionButton>
        <MotionButton
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MessageSquare className="h-6 w-6 mb-2" />
          </motion.div>
          Message Doctor
        </MotionButton>
        <MotionButton
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Pill className="h-6 w-6 mb-2" />
          </motion.div>
          Refill Medication
        </MotionButton>
        <MotionButton
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
        >
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ClipboardList className="h-6 w-6 mb-2" />
          </motion.div>
          View Medical Records
        </MotionButton>
      </div>
    </motion.div>
  );
};

export default QuickAction;
