// src/modules/dashboard/Dashboard.js
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  ShieldCheck,
  LogIn,
  UserCircle2,
  Lock,
  ChevronDown,
  Sparkles,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import ChangePasswordModal from "./ChangePasswordModal";
import TextScrollAnimation from './TextScrollAnimation';
import SplitCardAnimation from './SplitCardAnimation';
import Horizontalscroll from './horizontalscroll';
import StickyCols from './stickyCols';
import SprintoReplica from "./SprintoReplica";
import { runPreloader } from "./loadingscreen";
import { initFluidGradient } from "./fluid-gradient";
import CubeButton from './3DCubeButton';
import './cube-button.css';
import "./Dashboard.css";

const whyChooseItems = [
  {
    title: "Real-time Protection",
    desc: "Get alerts and insights instantly to prevent risks and breaches.",
    icon: <Zap className="w-8 h-8 text-emerald-500" />,
  },
  {
    title: "Data Privacy First",
    desc: "We ensure your business data stays encrypted and secure.",
    icon: <Shield className="w-8 h-8 text-indigo-500" />,
  },
  {
    title: "Smart Analytics",
    desc: "Track risk trends and make informed decisions with AI-driven insights.",
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Team Collaboration",
    desc: "Assign risks, manage tasks, and work together in real-time.",
    icon: <Users className="w-8 h-8 text-blue-500" />,
  },
];

const frameworkOptions = ["ISO 27001", "ISO 27701"];
const templateOptions = ["Policy", "Procedure"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const DropdownMenu = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50/90 to-blue-50/90 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:shadow-md transition-all duration-300 font-medium text-sm shadow-sm"
      >
        {selected || label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-md border border-indigo-200/50 rounded-2xl shadow-xl z-50 min-w-max w-48"
        >
          {options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{
                x: 2,
                backgroundColor: "rgba(99, 102, 241, 0.08)",
              }}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-indigo-800 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl hover:bg-indigo-50"
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const gradientCanvasRef = useRef(null);

  useEffect(() => {
    runPreloader(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading && gradientCanvasRef.current) {
      initFluidGradient(gradientCanvasRef, {
        colors: ["#E7F2EF", "#018790", "#00B7B5", "6EACDA"],
        brushSize: 0.04,
        brushStrength: 25.0,
        distortionAmount: 0.025,
        colorIntensity: 1.2,
      });
    }
  }, [isLoading]);

  const HeaderLeftSection = () => (
    <motion.div
      className="flex items-center gap-6 ml-4 md:ml-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="flex items-center gap-3"
        whileHover={{ scale: 1.03 }}
      >
        <div className="relative p-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 shadow-xl border-3 border-white/30">
            <ShieldCheck className="w-8 h-8 text-white drop-shadow-md mx-auto mt-0.5" />
          </div>
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl blur-lg opacity-70"
            animate={{
              rotate: 360,
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        <div className="space-y-0.5">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textReveal}
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            SAFESPHERE
          </motion.h1>
          {!user && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textReveal}
              className="text-xs md:text-sm text-gray-500 font-medium hidden md:block"
            >
              Secure Your Business with Confidence
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DropdownMenu
          label="Framework"
          options={frameworkOptions}
          onSelect={(option) => setSelectedFramework(option)}
        />
        <DropdownMenu
          label="Templates"
          options={templateOptions}
          onSelect={(option) => setSelectedTemplate(option)}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 preloader">
          <div className="preloader-progress">
            <div className="preloader-progress-pill">
              <div className="preloader-progress-bar" />
            </div>
            <div className="preloader-logo">
              <h1>SafeSphere</h1>
            </div>
          </div>
          <div className="preloader-mask" />
          <div className="preloader-content" />
        </div>
      )}

      {!isLoading && (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 overflow-x-hidden relative">
          {/* Continuous Gradient Background */}
          <div
            ref={gradientCanvasRef}
            className="gradient-canvas fixed inset-0 z-[-1] w-full h-screen"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_50%)]" />

          {/* HEADER - Sticky */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center bg-white/85 backdrop-blur-xl shadow-lg border-b border-indigo-100/40 sticky top-0 z-50"
          >
            <HeaderLeftSection />

            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-50/90 to-blue-50/90 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-md border border-indigo-200/40"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <UserCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.department?.name || "Consultant"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChangePassword(true)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-semibold px-2.5 py-1.5 bg-indigo-100/70 hover:bg-indigo-200/70 rounded-lg border border-indigo-200/40 transition-all duration-200"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Password
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl transition-all duration-300 text-sm"
                onClick={() => history.push("/login")}
              >
                <LogIn className="w-4 h-4" />
                Get Started
              </motion.button>
            )}
          </motion.header>

          {/* MAIN CONTENT - Seamless Flow */}
          <main className="w-full pt-0 pb-12 px-4 md:px-8 lg:px-16">
            {/* Animations Stack - Zero spacing */}
            <div className="w-full space-y-0 mb-12">
              <TextScrollAnimation />


              <div className="w-full pt-0 pb-36 justify-center"><CubeButton  /></div>
              <div className="my-0 f"><SplitCardAnimation /></div>
              <div className="sprinto flex justify-center my-0"><SprintoReplica /></div>
              <div className="flex "><Horizontalscroll /></div>
              <StickyCols />
            </div>

            {/* Why Choose Section - Continuous */}
            <motion.section
              className="w-full text-center space-y-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={containerVariants}
            >
              <motion.div variants={textReveal} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent leading-tight">
                    Secure your business with{" "}
                    <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
                      SafeSphere
                    </span>
                  </h3>
                </motion.div>
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium"
                >
                  Transform cybersecurity from a cost center to your{" "}
                  <span className="text-indigo-600 font-black">competitive advantage</span>.
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  className="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full mx-auto w-48 md:w-72 origin-left shadow-md"
                />
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {whyChooseItems.map(({ title, desc, icon }, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 20px 40px -12px rgba(79, 70, 229, 0.25)",
                    }}
                    className="group relative bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-indigo-100/30 shadow-lg hover:shadow-2xl transition-all duration-400 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/2 to-blue-500/2" />
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-white to-gray-50/70 rounded-xl flex items-center justify-center shadow-md mx-auto p-3 border border-indigo-100/30"
                        whileHover={{ rotateY: 8, rotateX: 3 }}
                      >
                        <div className="w-10 h-10 p-2.5 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-400/20 transition-all">
                          {React.cloneElement(icon, {
                            className: `${icon.props.className} drop-shadow-sm transition-all duration-300`,
                          })}
                        </div>
                      </motion.div>
                      <div className="space-y-2">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                          {title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </main>

          {/* FOOTER - Blends with gradient */}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-8 text-center text-sm text-gray-500/80 bg-white/70 backdrop-blur-xl border-t border-indigo-100/40"
          >
            <div className="max-w-md mx-auto space-y-1">
              <p>© {new Date().getFullYear()} SAFESPHERE · All rights reserved</p>
              <p className="text-xs">Built with ❤️ for cybersecurity excellence</p>
            </div>
          </motion.footer>

          {/* CHANGE PASSWORD MODAL */}
          {showChangePassword && (
            <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
