// // Dashboard.js
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   ShieldCheck,
//   LogIn,
//   UserCircle2,
//   Lock,
// } from "lucide-react";
// import ChangePasswordModal from "./ChangePasswordModal";
// import TextScrollAnimation from './TextScrollAnimation';
// import SplitCardAnimation from './SplitCardAnimation';
// import Horizontalscroll from './horizontalscroll';
// import './cardanimation.css';
// import './textreveal.css';
// import './horizontalscroll.css';
// import SprintoReplica from "./SprintoReplica";
// import StickyCols from './stickyCols';

// const Dashboard = () => {
//   const history = useHistory();
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
//       {/* HEADER - Always visible */}
//       <header className="px-6 md:px-12 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
//         <div className="flex items-center gap-4 ml-16 md:ml-0">
//           <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
//             <ShieldCheck className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//               SAFESPHERE
//             </h1>
//           </div>
//         </div>

//         {/* RIGHT SIDE - Changes based on login status */}
//         {user ? (
//           /* Logged in user view */
//           <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 rounded-full shadow-sm border border-indigo-100">
//             <UserCircle2 className="text-indigo-600 w-5 h-5" />
//             <div className="flex flex-col text-sm">
//               <span className="font-semibold text-gray-800">
//                 {user.name || "User"}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {user.department?.name || "Consultant"}
//               </span>
//             </div>
//             <button
//               onClick={() => setShowChangePassword(true)}
//               className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition text-sm font-medium px-3 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200"
//             >
//               <Lock className="w-4 h-4" /> Change Password
//             </button>
//           </div>
//         ) : (
//           /* Not logged in - Login button */
//           <button
//             className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//             onClick={() => history.push("/login")}
//           >
//             <LogIn className="w-4 h-4" /> Login
//           </button>
//         )}
//       </header>

//       {/* MAIN CONTENT - Always visible regardless of login status */}
//       <div className="dashboard pt-0">
//         {/* First: Text Scroll Animation */}
//         <TextScrollAnimation />
        
//         {/* Second: Card Animation */}
//         <SplitCardAnimation />
        
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
//           <SprintoReplica />
//         </div>
        
//         <Horizontalscroll />
//         <StickyCols />
//       </div>

//       {/* Change Password Modal - Only shows when triggered by logged-in user */}
//       {showChangePassword && (
//         <ChangePasswordModal
//           onClose={() => setShowChangePassword(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;








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
import "./Dashboard.css";
import './cardanimation.css';
import './textreveal.css';
import './horizontalscroll.css';

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

const frameworkOptions = ["ISO 27001", "NIST Cybersecurity"];
const templateOptions = ["Risk Template", "Compliance Template"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
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
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 hover:from-indigo-100 hover:to-blue-100 hover:shadow-lg transition-all duration-300 font-medium text-sm shadow-sm"
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
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full mt-2 left-0 bg-white/90 backdrop-blur-md border border-indigo-200/50 rounded-2xl shadow-2xl z-50 min-w-max w-52"
        >
          {options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{
                x: 4,
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                scale: 1.02,
              }}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-5 py-3.5 text-sm text-gray-700 hover:text-indigo-800 transition-all duration-200 border-b border-gray-100/50 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
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
        colors: ["#E7F2EF", "#018790", "#00B7B5", "#F4F4F4"],
        brushSize: 0.04,
        brushStrength: 25.0,
        distortionAmount: 0.025,
        colorIntensity: 1.2,
      });
    }
  }, [isLoading]);

  const HeaderLeftSection = () => (
    <motion.div
      className="flex items-center gap-8 ml-16 md:ml-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="flex items-center gap-4"
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative p-1">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600 shadow-2xl border-4 border-white/20">
            <ShieldCheck className="w-9 h-9 text-white drop-shadow-lg mx-auto mt-1" />
          </div>
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-3xl blur-xl opacity-75"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        <div className="space-y-1">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textReveal}
            className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            SAFESPHERE
          </motion.h1>
          {!user && (
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textReveal}
              className="text-sm md:text-base text-gray-500 font-medium hidden md:block"
            >
              Secure Your Business with Confidence
            </motion.p>
          )}
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
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

  const MainContent = () => (
    <main className="flex-1 flex flex-col px-6 md:px-12 py-12 lg:py-20 space-y-20 w-full">{/* Welcome Section */}
      <motion.section
        className="text-center space-y-8 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={textReveal}>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              SafeSphere
            </span>
          </motion.h2>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-32 md:w-48 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mt-6 rounded-full origin-left"
          />
        </motion.div>
      </motion.section>

      {/* ALL ANIMATIONS - VISIBLE FOR BOTH LOGGED IN & NOT LOGGED IN */}
      <div className="w-full space-y-20">
        <TextScrollAnimation />
        <SplitCardAnimation />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SprintoReplica />
        </div>
        <Horizontalscroll />
        <StickyCols />
      </div>

      {/* Why Choose Section */}
      <motion.section
        className="text-center space-y-12 max-w-6xl mx-auto px-4 md:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        variants={containerVariants}
      >
        <motion.div variants={textReveal} className="space-y-6">
          <motion.div variants={itemVariants} className="inline-block">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent leading-tight">
              Secure your business with{" "}
              <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
                SafeSphere
              </span>
            </h3>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Transform cybersecurity from a cost center to your{" "}
            <span className="text-indigo-600 font-black">
              competitive advantage
            </span>
            .
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            className="h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-full mx-auto w-64 md:w-96 origin-left shadow-lg"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {whyChooseItems.map(({ title, desc, icon }, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 28px 60px -16px rgba(79, 70, 229, 0.3)",
              }}
              className="group relative bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-indigo-100/30 shadow-xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-blue-500/3" />
              <div className="relative z-10 space-y-6">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl flex items-center justify-center shadow-lg mx-auto p-4 border border-indigo-100/20"
                  whileHover={{ rotateY: 10, rotateX: 5 }}
                >
                  <div className="w-12 h-12 p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
                    {React.cloneElement(icon, {
                      className: `${icon.props.className} drop-shadow-md transition-all duration-300`,
                    })}
                  </div>
                </motion.div>
                <div className="space-y-3">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {desc}
                  </p>
                </div>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-2xl opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );

  return (
    <>
      {isLoading && (
        <div className="preloader">
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
        <div className="hero-image min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 overflow-hidden relative">
          <div
            ref={gradientCanvasRef}
            className="gradient-canvas absolute inset-0 z-[-1]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent)]" />

          {/* HEADER */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-6 md:px-16 lg:px-24 py-6 flex justify-between items-center bg-white/80 backdrop-blur-xl shadow-xl border-b border-indigo-100/30 sticky top-0 z-50"
          >
            <HeaderLeftSection />

            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-indigo-200/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCircle2 className="w-6 h-6 text-white" />
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
                  className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-semibold px-3 py-1.5 bg-indigo-100/50 hover:bg-indigo-200/50 rounded-xl border border-indigo-200/30 transition-all duration-200"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:from-indigo-700 hover:to-blue-700 hover:shadow-2xl transition-all duration-300 text-base"
                onClick={() => history.push("/login")}
              >
                <LogIn className="w-5 h-5" />
                Get Started
              </motion.button>
            )}
          </motion.header>

          {/* MAIN CONTENT */}
          <MainContent />

          {/* FOOTER */}
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 text-center text-sm md:text-base text-gray-500/80 bg-white/60 backdrop-blur-xl border-t border-indigo-100/30"
          >
            <div className="max-w-2xl mx-auto space-y-2">
              <p>© {new Date().getFullYear()} SAFESPHERE · All rights reserved</p>
              <p className="text-xs">Built with ❤️ for cybersecurity excellence</p>
            </div>
          </motion.footer>

          {/* CHANGE PASSWORD MODAL */}
          {showChangePassword && (
            <ChangePasswordModal
              onClose={() => setShowChangePassword(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
