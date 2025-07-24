"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Check,
  Activity,
  Pill,
  Brain,
  HeartPulse,
  Shield,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import {
  fadeInUp,
  logoVariants,
  pulseVariants,
  staggerChildren,
} from "@/components/types/type";
import Link from "next/link";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "custom";
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClass =
    variant === "default"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : variant === "outline"
      ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
      : variant === "ghost"
      ? "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
      : "bg-white text-blue-600 hover:bg-blue-50";

  return (
    <motion.button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${baseClass} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        whileHover={{ x: 5 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      {children}
    </motion.div>
  );
};

const MedTechLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <nav className="p-4 flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          whileHover="hover"
          variants={logoVariants}
        >
          <HeartPulse className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-blue-800">MedPredict</span>
        </motion.div>
        <div className="hidden md:flex space-x-6">
          {["Features", "How It Works", "Testimonials"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-700 hover:text-blue-600"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/auth/login">
            <AnimatedButton className="px-6 py-2 shadow-md">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </motion.div>
      </nav>

      <section className="py-16 px-4 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Advanced AI for&ensp;
            <motion.span
              className="text-blue-600"
              animate={{
                color: ["#2563EB", "#4F46E5", "#7C3AED", "#2563EB"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Personalized
            </motion.span>{" "}
            Healthcare
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            MedPredict uses cutting-edge AI to predict potential health issues,
            suggest appropriate medications, and provide comprehensive
            healthcare solutions tailored to your unique needs.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <AnimatedButton className="text-lg px-6 py-3 shadow-lg">
              Try Disease Prediction <ExternalLink className="ml-2 h-4 w-4" />
            </AnimatedButton>
            <AnimatedButton variant="outline" className="text-lg px-6 py-3">
              Learn More
            </AnimatedButton>
          </motion.div>
        </motion.div>
        <motion.div
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Background decoration elements */}
          <motion.div
            className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              delay: 0.3,
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>

          {/* Dashboard image with enhanced animation */}
          <motion.div
            className="relative z-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{
              y: -15,
              scale: 1.03,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
          >
            <motion.div
              className="rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Image
                src="/finalDash.png"
                alt="AI-powered healthcare dashboard"
                width={1024}
                height={900}
                layout="responsive"
                className="w-full rounded-2xl"
                // quality={100}
                priority={true}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { value: "98.7%", label: "Prediction Accuracy" },
              { value: "50,000+", label: "Patients Helped" },
              { value: "200+", label: "Healthcare Partners" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.p
                  className="text-4xl font-bold text-blue-600"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="features" className="py-16 px-4 md:px-12 lg:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Cutting-Edge Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging the latest advancements in AI and medical research to
            provide comprehensive healthcare solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="h-12 w-12 text-blue-600 mb-4" />,
              title: "AI Disease Prediction",
              description:
                "Our advanced algorithms analyze your symptoms and medical history to predict potential health issues with high accuracy.",
              benefits: [
                "Early detection of risks",
                "Personalized risk assessments",
                "Continuous monitoring",
              ],
            },
            {
              icon: <Pill className="h-12 w-12 text-blue-600 mb-4" />,
              title: "Medication Suggestions",
              description:
                "Get personalized medication recommendations based on your health profile, current medications, and predicted conditions.",
              benefits: [
                "Drug interaction checks",
                "Dosage optimization",
                "Alternative medication options",
              ],
            },
            {
              icon: <Activity className="h-12 w-12 text-blue-600 mb-4" />,
              title: "Health Monitoring",
              description:
                "Continuous tracking of vital health metrics with smart alerts and personalized recommendations for improvement.",
              benefits: [
                "Real-time health analytics",
                "Customized health goals",
                "Progress tracking",
              ],
            },
          ].map((feature, index) => (
            <AnimatedCard key={index} delay={index}>
              <Card className="border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-bold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    className="space-y-2"
                    variants={staggerChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {feature.benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center"
                        variants={fadeInUp}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 20 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        </motion.div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
                <CardFooter>
                  <AnimatedButton
                    variant="ghost"
                    className="p-0 flex items-center"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </CardFooter>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              How MedPredict Works
            </motion.h2>
            <motion.p
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Our simple four-step process brings advanced healthcare AI
              technology right to your fingertips
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="hidden md:block absolute left-1/2 -ml-0.5 w-0.5 h-full bg-blue-200"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            ></motion.div>

            <div className="space-y-12 relative">
              {[
                {
                  number: 1,
                  title: "Create Your Health Profile",
                  description:
                    "Input your medical history, current medications, lifestyle factors, and health concerns to create your personalized health profile.",
                  icon: <Shield className="h-12 w-12 text-blue-600" />,
                  reverse: false,
                },
                {
                  number: 2,
                  title: "AI Analysis",
                  description:
                    "Our advanced AI algorithms analyze your data, comparing it with millions of medical cases and the latest research to identify patterns and risks.",
                  icon: <Brain className="h-12 w-12 text-blue-600" />,
                  reverse: true,
                },
                {
                  number: 3,
                  title: "Personalized Recommendations",
                  description:
                    "Receive tailored health insights, medication suggestions, preventive measures, and lifestyle recommendations based on your unique profile.",
                  icon: <Pill className="h-12 w-12 text-blue-600" />,
                  reverse: false,
                },
                {
                  number: 4,
                  title: "Continuous Monitoring",
                  description:
                    "Enjoy ongoing health tracking, timely alerts, and regularly updated recommendations as your health data changes over time.",
                  icon: <HeartPulse className="h-12 w-12 text-blue-600" />,
                  reverse: true,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col md:flex-row items-center`}
                  initial={{ opacity: 0, x: step.reverse ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                >
                  <div
                    className={`md:w-1/2 md:pr-12 mb-6 md:mb-0 ${
                      step.reverse ? "md:order-2" : ""
                    }`}
                  >
                    <motion.div
                      className="bg-white p-6 rounded-xl shadow-md"
                      whileHover={{
                        scale: 1.05,
                        boxShadow:
                          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center mb-4">
                        <motion.div
                          className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4"
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: "#DBEAFE",
                          }}
                        >
                          {step.number}
                        </motion.div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                  </div>
                  <div
                    className={`md:w-1/2 md:pl-12 ${
                      step.reverse ? "md:order-1" : ""
                    }`}
                  >
                    <motion.div
                      className="bg-blue-100 rounded-xl p-4 w-20 h-20 flex items-center justify-center"
                      style={{
                        marginLeft: step.reverse ? 0 : "auto",
                        marginRight: step.reverse ? "auto" : 0,
                      }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 px-4 md:px-12 lg:px-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from people whose lives have been improved by
            MedPredict
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah J.",
              role: "Diabetes Patient",
              testimonial:
                "MedPredict identified my risk for Type 2 diabetes six months before any symptoms appeared. Their medication recommendations and lifestyle changes have helped me maintain healthy blood sugar levels without insulin dependency.",
            },
            {
              name: "Michael T.",
              role: "Heart Health Monitoring",
              testimonial:
                "After a minor heart attack, I started using MedPredict to monitor my cardiovascular health. The app detected a medication interaction issue my doctors missed, potentially saving me from serious complications.",
            },
            {
              name: "Dr. Patel",
              role: "Primary Care Physician",
              testimonial:
                "I recommend MedPredict to my patients as a complementary tool to our regular care. The AI predictions have helped us catch several conditions early, and the medication suggestions are consistently aligned with best practices.",
            },
          ].map((testimonial, index) => (
            <AnimatedCard key={index} delay={index}>
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
                      whileHover={{ scale: 1.2 }}
                    >
                      <img
                        src={`/api/placeholder/48/48`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <motion.section
        className="py-16 px-4 md:px-12 lg:px-24 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to transform your healthcare experience?
          </motion.h2>
          <motion.p
            className="mt-6 text-xl text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of users who are taking control of their health with
            predictive AI technology.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AnimatedButton
                variant="custom"
                className="text-lg px-8 py-4 rounded-full shadow-xl"
              >
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </motion.div>
          </motion.div>
          <motion.p
            className="mt-4 text-blue-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Free 14-day trial. No credit card required.
          </motion.p>
        </div>
      </motion.section>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ x: 5 }}
            >
              <HeartPulse className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl text-white">MedPredict</span>
            </motion.div>
            <p className="text-gray-400">
              Advanced AI for personalized healthcare solutions and disease
              prediction.
            </p>
          </motion.div>

          {[
            {
              title: "Features",
              links: [
                "Disease Prediction",
                "Medication Suggestions",
                "Health Monitoring",
                "Medical Records",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Our Team", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Data Protection",
                "Compliance",
              ],
            },
          ].map((column, colIndex) => (
            <motion.div
              key={colIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * colIndex }}
            >
              <h3 className="font-bold text-white mb-4">{column.title}</h3>
              <motion.ul
                className="space-y-2"
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="hover:text-blue-400 transition">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>© 2025 MedPredict. All rights reserved.</p>
        </motion.div>
        <motion.div
          className="max-w-7xl mx-auto mt-6 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-center mt-6 space-x-6">
            {["Twitter", "LinkedIn", "Facebook", "Instagram"].map(
              (social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-blue-400"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {social}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default MedTechLanding;
