// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   ShieldCheck,
//   FileText,
//   Activity,
//   LogIn,
//   UserCircle2,
//   Lock,
// } from "lucide-react";

// import ChangePasswordModal from "./ChangePasswordModal";

// const tiles = [
//   {
//     label: "Risk Management",
//     route: "/risk-assessment",
//     description:
//       "Identify, analyze, and manage organizational risks effectively.",
//     icon: <ShieldCheck className="w-12 h-12 text-indigo-600" />,
//   },
//   {
//     label: "Documentation",
//     route: "/documentation",
//     description:
//       "A Repository to upload documents inorder to maintain compliance.",
//     icon: <FileText className="w-12 h-12 text-indigo-600" />,
//   },
//   {
//     label: "Gap Assessment",
//     route: "/gap-assessment",
//     description: "A quick Assessment for your department to check compliance.",
//     icon: <Activity className="w-12 h-12 text-indigo-600" />,
//   },
// ];

// const whyChooseItems = [
//   {
//     title: "Real-time Protection",
//     desc: "Get alerts and insights instantly to prevent risks and breaches.",
//   },
//   {
//     title: "Data Privacy First",
//     desc: "We ensure your business data stays encrypted and secure.",
//   },
//   {
//     title: "Smart Analytics",
//     desc: "Track risk trends and make informed decisions with AI-driven insights.",
//   },
//   {
//     title: "Team Collaboration",
//     desc: "Assign risks, manage tasks, and work together in real-time.",
//   },
// ];

// const Dashboard = () => {
//   const history = useHistory();
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   // Signed-in user view
//   if (user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
//         {/* HEADER */}
//         <header className="px-6 md:px-12 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
//           <div className="flex items-center gap-4 ml-16 md:ml-0">
//             <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
//               <ShieldCheck className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//                 SAFESPHERE
//               </h1>
//             </div>
//           </div>

//           {/* USER CARD */}
//           <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-2 rounded-full shadow-sm border border-indigo-100">
//             <UserCircle2 className="text-indigo-600 w-5 h-5" />
//             <div className="flex flex-col text-sm">
//               <span className="font-semibold text-gray-800">
//                 {user.name || "User"}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {user.department.name || "Consultant"}
//               </span>
//             </div>
//             {user && (
//               <button
//                 onClick={() => setShowChangePassword(true)}
//                 className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition text-sm font-medium"
//               >
//                 <Lock className="w-4 h-4" /> Change Password
//               </button>
//             )}

//             {showChangePassword && (
//               <ChangePasswordModal
//                 onClose={() => setShowChangePassword(false)}
//               />
//             )}
//           </div>
//         </header>

//         {/* MAIN CONTENT */}
//         <main className="flex-1 flex flex-col items-center px-6 py-16 md:py-24">
//           {/* New Welcome heading */}
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
//             Welcome to SafeSphere
//           </h2>

//           {/* Tiles */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mb-12">
//             {tiles.map(({ label, route, description, icon }) => (
//               <div
//                 key={label}
//                 className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
//                 onClick={() => history.push(route)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") history.push(route);
//                 }}
//               >
//                 <div className="p-8 flex flex-col items-center text-center relative z-10">
//                   <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
//                     {icon}
//                   </div>
//                   <h3 className="text-lg font-bold mb-3 text-gray-900">
//                     {label}
//                   </h3>
//                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
//                     {description}
//                   </p>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </div>
//             ))}
//           </div>

//           {/* New Section for Signed-in User */}
//           <section className="text-center w-full max-w-6xl">
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//               Secure your business with SafeSphere
//             </h3>
//             <p className="text-sm md:text-base text-gray-700 mb-10 max-w-xl mx-auto">
//               Identify, analyze, and manage cybersecurity risks with ease using
//               SafeSphere.
//             </p>

//             {/* Why Choose Section*/}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {whyChooseItems.map(({ icon, title, desc }, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-indigo-100"
//                 >
//                   <div className="text-4xl mb-3">{icon}</div>
//                   <h4 className="font-semibold text-lg text-gray-800 mb-2">{title}</h4>
//                   <p className="text-sm text-gray-600">{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </main>

//         {/* FOOTER */}
//         <footer className="py-4 text-center text-xs md:text-sm text-gray-500 border-t bg-white">
//           © {new Date().getFullYear()} SAFESPHERE · All rights reserved
//         </footer>
//       </div>
//     );
//   }

//   // Non logged-in user view (unchanged)
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900">
//       {/* HEADER */}
//       <header className="px-6 md:px-12 py-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
//         <div className="flex items-center gap-4 ml-16 md:ml-0">
//           <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg">
//             <ShieldCheck className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//               SAFESPHERE
//             </h1>
//             <p className="text-xs md:text-sm text-gray-500 hidden md:block">
//               Secure Your Business with Confidence
//             </p>
//           </div>
//         </div>

//         {/* LOGIN BUTTON */}
//         <div>
//           <button
//             className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
//             onClick={() => history.push("/login")}
//           >
//             <LogIn className="w-4 h-4" /> Login
//           </button>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="text-center py-12 md:py-20 px-6">
//         <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
//           Secure Your Business with{" "}
//           <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//             SafeSphere
//           </span>
//         </h2>
//         <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
//           SafeSphere helps you identify, analyze, and manage cybersecurity
//           risks. Stay one step ahead of threats.
//         </p>
//         <button
//           onClick={() => history.push("/login")}
//           className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
//         >
//           Get Started
//         </button>
//       </section>

//       {/* WHY CHOOSE SECTION */}
//       <section className="py-12 px-6 bg-white/50">
//         <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
//           Why Choose SafeSphere?
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {whyChooseItems.map(({ title, desc }, idx) => (
//             <div
//               key={idx}
//               className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-indigo-100"
//             >
              
//               <h4 className="font-semibold text-base md:text-lg text-gray-800 mb-2">
//                 {title}
//               </h4>
//               <p className="text-xs md:text-sm text-gray-600">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* KEY FEATURES SECTION */}
//       <section className="py-12 px-6">
//         <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
//           Explore Key Features
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {tiles.map(({ label, route, description, icon }) => (
//             <div
//               key={label}
//               className="group relative bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden opacity-60 cursor-not-allowed"
//               role="presentation"
//             >
//               <div className="p-8 flex flex-col items-center text-center relative z-10">
//                 <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
//                   {icon}
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
//                   {label}
//                 </h3>
//                 <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CALL TO ACTION */}
//       <section className="py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
//         <h3 className="text-2xl md:text-2xl font-bold mb-4">
//           Ready to safeguard your business?
//         </h3>
//         <p className="text-sm md:text-lg mb-4 opacity-90">
//           Sign up now and get started with SafeSphere today.
//         </p>
//         <button
//           onClick={() => history.push("/login")}
//           className="bg-white text-indigo-600 px-3 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
//         >
//           Sign Up
//         </button>
//       </section>

//       {/* FOOTER */}
//       <footer className="py-4 text-center text-xs md:text-sm text-gray-500 border-t bg-white">
//         © {new Date().getFullYear()} SAFESPHERE · All rights reserved · Made in
//         India
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import "./Dashboard.css";

// import {
//   ShieldCheck,
//   FileText,
//   Activity,
//   LogIn,
//   UserCircle2,
//   Lock,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   Users,
//   Zap,
//   BarChart3,
//   Lock as LockIcon,
//   Globe,
//   Award,
//   ChevronDown,
//   Play,
// } from "lucide-react";
// import ChangePasswordModal from "./ChangePasswordModal";

// const tiles = [
//   {
//     label: "Risk Management",
//     route: "/risk-assessment",
//     description:
//       "Identify, analyze, and mitigate organizational risks before they impact your business.",
//     icon: <ShieldCheck className="w-12 h-12" />,
//     color: "from-blue-500 to-blue-600",
//     bgColor: "bg-blue-50",
//     iconColor: "text-blue-600",
//   },
//   {
//     label: "Documentation",
//     route: "/documentation",
//     description:
//       "Maintain audit-ready documentation and ensure compliance with industry standards.",
//     icon: <FileText className="w-12 h-12" />,
//     color: "from-purple-500 to-purple-600",
//     bgColor: "bg-purple-50",
//     iconColor: "text-purple-600",
//   },
//   {
//     label: "Gap Assessment",
//     route: "/gap-assessment",
//     description:
//       "Evaluate compliance gaps and get actionable insights for your organization.",
//     icon: <Activity className="w-12 h-12" />,
//     color: "from-cyan-500 to-cyan-600",
//     bgColor: "bg-cyan-50",
//     iconColor: "text-cyan-600",
//   },
// ];

// const statsData = [
//   {
//     label: "Real-time Monitoring",
//     value: "24/7",
//     icon: <TrendingUp className="w-5 h-5" />,
//     color: "from-emerald-400 to-teal-600",
//   },
//   {
//     label: "Compliance Rate",
//     value: "99%",
//     icon: <CheckCircle className="w-5 h-5" />,
//     color: "from-blue-400 to-indigo-600",
//   },
//   {
//     label: "Risk Reduction",
//     value: "87%",
//     icon: <AlertCircle className="w-5 h-5" />,
//     color: "from-orange-400 to-red-600",
//   },
//   {
//     label: "Team Collaboration",
//     value: "∞",
//     icon: <Users className="w-5 h-5" />,
//     color: "from-pink-400 to-purple-600",
//   },
// ];

// const features = [
//   {
//     title: "Continuous Risk Monitoring",
//     description:
//       "Track vulnerabilities and security events in real-time across your entire infrastructure.",
//     icon: "⚡",
//   },
//   {
//     title: "Automated Compliance Checks",
//     description:
//       "Stay audit-ready with automated control mapping and evidence collection.",
//     icon: "✓",
//   },
//   {
//     title: "Intelligent Analytics",
//     description:
//       "AI-powered insights help you identify trends, predict risks, and make data-driven decisions.",
//     icon: "📊",
//   },
//   {
//     title: "Team Collaboration Hub",
//     description:
//       "Assign tasks, track progress, and collaborate seamlessly with your security team.",
//     icon: "👥",
//   },
//   {
//     title: "Custom Reporting",
//     description:
//       "Generate executive reports with actionable insights for stakeholders.",
//     icon: "📄",
//   },
//   {
//     title: "Enterprise-Grade Security",
//     description:
//       "Bank-level encryption and compliance with SOC 2, ISO 27001, and GDPR standards.",
//     icon: "🔐",
//   },
// ];

// const benefits = [
//   {
//     title: "Reduce Risk Exposure",
//     subtitle: "By up to 87% in the first year",
//     icon: "🛡️",
//   },
//   {
//     title: "Accelerate Compliance",
//     subtitle: "Audit-ready in days, not months",
//     icon: "⏱️",
//   },
//   {
//     title: "Cut Operational Cost",
//     subtitle: "50% reduction in manual compliance work",
//     icon: "💰",
//   },
//   {
//     title: "Improve Security Posture",
//     subtitle: "Continuous monitoring & threat detection",
//     icon: "🔒",
//   },
// ];

// const integrations = [
//   { name: "AWS", logo: "☁️" },
//   { name: "Azure", logo: "📘" },
//   { name: "Google Cloud", logo: "🔵" },
//   { name: "ServiceNow", logo: "🔧" },
//   { name: "Okta", logo: "🔐" },
//   { name: "Slack", logo: "💬" },
// ];

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "CISO, Fortune 500 Tech",
//     quote:
//       "SafeSphere transformed our compliance process. We reduced audit time by 70% and improved our security posture significantly.",
//     avatar: "👩‍💼",
//   },
//   {
//     name: "Michael Chen",
//     role: "Risk Manager, Financial Services",
//     quote:
//       "The real-time monitoring capabilities are exceptional. We catch potential risks before they become issues.",
//     avatar: "👨‍💼",
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Compliance Officer, Healthcare",
//     quote:
//       "SafeSphere made HIPAA compliance effortless. The automated checks save us countless hours every month.",
//     avatar: "👩‍🔬",
//   },
// ];

// const faqs = [
//   {
//     question: "How long does it take to implement SafeSphere?",
//     answer:
//       "Most organizations are up and running within 2-4 weeks. Our onboarding team provides full support throughout the process.",
//   },
//   {
//     question: "Is SafeSphere compliant with industry standards?",
//     answer:
//       "Yes! SafeSphere is SOC 2 Type II certified, ISO 27001 compliant, GDPR ready, and supports HIPAA, NIST, and CIS frameworks.",
//   },
//   {
//     question: "Can SafeSphere integrate with our existing tools?",
//     answer:
//       "Absolutely. SafeSphere integrates with 100+ enterprise tools including AWS, Azure, ServiceNow, Okta, and Slack.",
//   },
//   {
//     question: "What kind of support do you offer?",
//     answer:
//       "We provide 24/7 enterprise support, dedicated account managers, and regular training sessions for your team.",
//   },
//   {
//     question: "How is pricing structured?",
//     answer:
//       "Pricing is based on the number of assets monitored and features used. Contact our sales team for a custom quote.",
//   },
// ];

// const Dashboard = () => {
//   const history = useHistory();
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [expandedFaq, setExpandedFaq] = useState(null);
//   const [counters, setCounters] = useState({
//     companies: 0,
//     risks: 0,
//     compliance: 0,
//   });

//   // Counter animation
//   useEffect(() => {
//     let interval;
//     if (counters.companies < 500) {
//       interval = setInterval(() => {
//         setCounters((prev) => ({
//           ...prev,
//           companies: Math.min(prev.companies + 10, 500),
//           risks: Math.min(prev.risks + 100, 50000),
//           compliance: Math.min(prev.compliance + 1, 99),
//         }));
//       }, 20);
//     }
//     return () => clearInterval(interval);
//   }, [counters]);

//   // Signed-in user view
//   if (user) {
//     return (
//       <div className="dashboard-signed-in">
//         {/* HEADER */}
//         <header className="dashboard-header">
//           <div className="dashboard-header-content">
//             <div className="dashboard-logo-section">
//               <div className="dashboard-logo-icon">
//                 <ShieldCheck className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="dashboard-logo-text">SAFESPHERE</h1>
//                 <p className="dashboard-logo-subtext">Enterprise Risk & Compliance Platform</p>
//               </div>
//             </div>

//             <div className="dashboard-user-card">
//               <UserCircle2 className="text-indigo-600 w-5 h-5" />
//               <div className="dashboard-user-info">
//                 <span className="dashboard-user-name">{user.name || "User"}</span>
//                 <span className="dashboard-user-role">
//                   {user.department?.name || "Consultant"}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowChangePassword(true)}
//                 className="dashboard-change-pwd-btn"
//               >
//                 <Lock className="w-4 h-4" /> Change
//               </button>

//               {showChangePassword && (
//                 <ChangePasswordModal
//                   onClose={() => setShowChangePassword(false)}
//                 />
//               )}
//             </div>
//           </div>
//         </header>

//         {/* MAIN CONTENT */}
//         <main className="dashboard-main">
//           {/* HERO SECTION */}
//           <section className="dashboard-hero">
//             <div className="dashboard-hero-left">
//               <div className="dashboard-badge">Welcome back, {user.name?.split(" ")[0]}!</div>
//               <h2 className="dashboard-hero-title">
//                 Manage Risk, Ensure Compliance, Build Confidence
//               </h2>
//               <p className="dashboard-hero-description">
//                 SafeSphere empowers security and compliance teams with real-time monitoring, 
//                 automated controls, and intelligent insights to stay ahead of threats.
//               </p>
//               <div className="dashboard-hero-buttons">
//                 <button
//                   onClick={() => history.push("/risk-assessment")}
//                   className="dashboard-primary-btn"
//                 >
//                   Start Risk Assessment
//                 </button>
//                 <button
//                   onClick={() => history.push("/documentation")}
//                   className="dashboard-secondary-btn"
//                 >
//                   View Documentation
//                 </button>
//               </div>
//             </div>

//             {/* STATS CARDS */}
//             <div className="dashboard-stats-grid">
//               {statsData.map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className="dashboard-stat-card"
//                   style={{ "--delay": `${idx * 100}ms` }}
//                 >
//                   <div className={`dashboard-stat-icon bg-gradient-to-br ${stat.color}`}>
//                     {stat.icon}
//                   </div>
//                   <div className="dashboard-stat-content">
//                     <div className="dashboard-stat-value">{stat.value}</div>
//                     <div className="dashboard-stat-label">{stat.label}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* TILES SECTION */}
//           <section className="dashboard-tiles-section">
//             <h3 className="dashboard-section-title">Core Modules</h3>
//             <div className="dashboard-tiles-grid">
//               {tiles.map(({ label, route, description, icon, color, bgColor, iconColor }) => (
//                 <div
//                   key={label}
//                   className="dashboard-tile"
//                   onClick={() => history.push(route)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") history.push(route);
//                   }}
//                 >
//                   <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
//                     <div className={`dashboard-tile-icon ${iconColor}`}>{icon}</div>
//                   </div>
//                   <h3 className="dashboard-tile-title">{label}</h3>
//                   <p className="dashboard-tile-description">{description}</p>
//                   <div className={`dashboard-tile-accent bg-gradient-to-r ${color}`} />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* BENEFITS SECTION */}
//           <section className="dashboard-benefits-section">
//             <div className="dashboard-section-header">
//               <h3 className="dashboard-section-title">Why SafeSphere?</h3>
//               <p className="dashboard-section-subtitle">
//                 Proven impact across 500+ organizations worldwide
//               </p>
//             </div>
//             <div className="dashboard-benefits-grid">
//               {benefits.map((benefit, idx) => (
//                 <div
//                   key={idx}
//                   className="dashboard-benefit-card"
//                   style={{ "--delay": `${idx * 75}ms` }}
//                 >
//                   <div className="dashboard-benefit-icon">{benefit.icon}</div>
//                   <h4 className="dashboard-benefit-title">{benefit.title}</h4>
//                   <p className="dashboard-benefit-subtitle">{benefit.subtitle}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* FEATURES SECTION */}
//           <section className="dashboard-features-section">
//             <div className="dashboard-features-header">
//               <h3 className="dashboard-section-title">Powerful Features</h3>
//               <p className="dashboard-features-subtitle">
//                 Everything you need to manage risk and compliance at enterprise scale
//               </p>
//             </div>
//             <div className="dashboard-features-grid">
//               {features.map((feature, idx) => (
//                 <div
//                   key={idx}
//                   className="dashboard-feature-card"
//                   style={{ "--delay": `${idx * 50}ms` }}
//                 >
//                   <div className="dashboard-feature-icon">{feature.icon}</div>
//                   <h4 className="dashboard-feature-title">{feature.title}</h4>
//                   <p className="dashboard-feature-description">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* METRICS SECTION */}
//           <section className="dashboard-metrics-section">
//             <h3 className="dashboard-section-title">Our Impact</h3>
//             <div className="dashboard-metrics-grid">
//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">{counters.companies}+</div>
//                 <div className="dashboard-metric-label">Organizations Protected</div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{ width: `${(counters.companies / 500) * 100}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">{counters.risks.toLocaleString()}+</div>
//                 <div className="dashboard-metric-label">Risks Identified & Mitigated</div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{ width: `${(counters.risks / 50000) * 100}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">{counters.compliance}%</div>
//                 <div className="dashboard-metric-label">Average Compliance Improvement</div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{ width: `${counters.compliance}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* VIDEO SECTION */}
//           <section className="dashboard-video-section">
//             <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
//             <div className="dashboard-video-container">
//               <div className="dashboard-video-placeholder">
//                 <Play className="w-16 h-16 text-white" />
//                 <p>Compliance Management Demo</p>
//               </div>
//               <div className="dashboard-video-description">
//                 <h4>Watch how SafeSphere streamlines compliance management</h4>
//                 <ul className="dashboard-video-points">
//                   <li>✓ Real-time risk dashboard</li>
//                   <li>✓ Automated compliance checks</li>
//                   <li>✓ Custom report generation</li>
//                   <li>✓ Team collaboration features</li>
//                 </ul>
//               </div>
//             </div>
//           </section>

//           {/* INTEGRATIONS SECTION */}
//           <section className="dashboard-integrations-section">
//             <h3 className="dashboard-section-title">Integrations You Love</h3>
//             <p className="dashboard-section-subtitle">
//               SafeSphere works seamlessly with 100+ enterprise tools
//             </p>
//             <div className="dashboard-integrations-grid">
//               {integrations.map((integration, idx) => (
//                 <div
//                   key={idx}
//                   className="dashboard-integration-card"
//                   style={{ "--delay": `${idx * 60}ms` }}
//                 >
//                   <div className="dashboard-integration-logo">{integration.logo}</div>
//                   <div className="dashboard-integration-name">{integration.name}</div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* TESTIMONIALS SECTION */}
//           <section className="dashboard-testimonials-section">
//             <h3 className="dashboard-section-title">What Our Customers Say</h3>
//             <div className="dashboard-testimonials-grid">
//               {testimonials.map((testimonial, idx) => (
//                 <div
//                   key={idx}
//                   className="dashboard-testimonial-card"
//                   style={{ "--delay": `${idx * 100}ms` }}
//                 >
//                   <div className="dashboard-testimonial-stars">⭐⭐⭐⭐⭐</div>
//                   <p className="dashboard-testimonial-quote">"{testimonial.quote}"</p>
//                   <div className="dashboard-testimonial-author">
//                     <div className="dashboard-testimonial-avatar">{testimonial.avatar}</div>
//                     <div>
//                       <div className="dashboard-testimonial-name">{testimonial.name}</div>
//                       <div className="dashboard-testimonial-role">{testimonial.role}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* FAQ SECTION */}
//           <section className="dashboard-faq-section">
//             <h3 className="dashboard-section-title">Frequently Asked Questions</h3>
//             <div className="dashboard-faq-grid">
//               {faqs.map((faq, idx) => (
//                 <div
//                   key={idx}
//                   className={`dashboard-faq-item ${expandedFaq === idx ? "expanded" : ""}`}
//                 >
//                   <button
//                     className="dashboard-faq-question"
//                     onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
//                   >
//                     <span>{faq.question}</span>
//                     <ChevronDown className="w-5 h-5" />
//                   </button>
//                   {expandedFaq === idx && (
//                     <div className="dashboard-faq-answer">{faq.answer}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* FINAL CTA SECTION */}
//           <section className="dashboard-final-cta">
//             <h3 className="dashboard-cta-title">Ready to Transform Your Compliance?</h3>
//             <p className="dashboard-cta-subtitle">
//               Join 500+ organizations managing risk smarter with SafeSphere
//             </p>
//             <div className="dashboard-cta-buttons">
//               <button
//                 onClick={() => history.push("/risk-assessment")}
//                 className="dashboard-cta-primary"
//               >
//                 Get Started
//               </button>
             
//             </div>
//           </section>

//           {/* TRUST SECTION */}
//           <section className="dashboard-trust-section">
//             <h4 className="dashboard-trust-title">Enterprise-Grade Trust</h4>
//             <p className="dashboard-trust-subtitle">
//               Trusted by the world's leading security teams
//             </p>
//             <div className="dashboard-trust-badges">
//               <span className="dashboard-trust-badge">🔐 SOC 2 Type II</span>
//               <span className="dashboard-trust-badge">📋 ISO 27001</span>
//               <span className="dashboard-trust-badge">🌍 GDPR Ready</span>
//               <span className="dashboard-trust-badge">🏥 HIPAA Compliant</span>
//               <span className="dashboard-trust-badge">🏛️ NIST Aligned</span>
//               <span className="dashboard-trust-badge">✅ CIS Frameworks</span>
//             </div>
//           </section>
//         </main>

//         {/* FOOTER */}
//         <footer className="dashboard-footer">
//           <div className="dashboard-footer-content">
//             <div className="dashboard-footer-section">
//               <h4>SafeSphere</h4>
//               <p>Enterprise Risk & Compliance Management Platform</p>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Product</h4>
//               <ul>
//                 <li><a href="#">Risk Management</a></li>
//                 <li><a href="#">Compliance</a></li>
//                 <li><a href="#">Gap Assessment</a></li>
//               </ul>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Company</h4>
//               <ul>
//                 <li><a href="#">About</a></li>
//                 <li><a href="#">Blog</a></li>
//                 <li><a href="#">Careers</a></li>
//               </ul>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Legal</h4>
//               <ul>
//                 <li><a href="#">Privacy</a></li>
//                 <li><a href="#">Terms</a></li>
//                 <li><a href="#">Security</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="dashboard-footer-bottom">
//             © {new Date().getFullYear()} SafeSphere · All rights reserved
//           </div>
//         </footer>
//       </div>
//     );
//   }

//   // Non logged-in user view
//   return (
//     <div className="dashboard-guest">
//       {/* HEADER */}
//       <header className="dashboard-header">
//         <div className="dashboard-header-content">
//           <div className="dashboard-logo-section">
//             <div className="dashboard-logo-icon">
//               <ShieldCheck className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="dashboard-logo-text">SAFESPHERE</h1>
//               <p className="dashboard-logo-subtext">Enterprise Risk & Compliance Platform</p>
//             </div>
//           </div>

//           <button
//             className="dashboard-login-btn"
//             onClick={() => history.push("/login")}
//           >
//             <LogIn className="w-4 h-4" /> Login
//           </button>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="dashboard-guest-hero">
//         <div className="dashboard-guest-hero-content">
//           <div className="dashboard-guest-badge">Secure Your Business</div>
//           <h2 className="dashboard-guest-title">
//             Enterprise Risk & Compliance Management
//           </h2>
//           <p className="dashboard-guest-description">
//             SafeSphere helps security and compliance teams identify, analyze, and 
//             mitigate organizational risks. Stay ahead of threats with real-time monitoring 
//             and automated compliance checks.
//           </p>
//           <button
//             onClick={() => history.push("/login")}
//             className="dashboard-primary-btn"
//           >
//             Get Started
//           </button>
//         </div>
//       </section>

//       {/* BENEFITS SECTION */}
//       <section className="dashboard-benefits-section">
//         <div className="dashboard-section-header">
//           <h3 className="dashboard-section-title">Why SafeSphere?</h3>
//           <p className="dashboard-section-subtitle">
//             Proven impact across 500+ organizations worldwide
//           </p>
//         </div>
//         <div className="dashboard-benefits-grid">
//           {benefits.map((benefit, idx) => (
//             <div
//               key={idx}
//               className="dashboard-benefit-card"
//               style={{ "--delay": `${idx * 75}ms` }}
//             >
//               <div className="dashboard-benefit-icon">{benefit.icon}</div>
//               <h4 className="dashboard-benefit-title">{benefit.title}</h4>
//               <p className="dashboard-benefit-subtitle">{benefit.subtitle}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="dashboard-guest-features">
//         <div className="dashboard-features-header">
//           <h3 className="dashboard-section-title">Powerful Features</h3>
//           <p className="dashboard-features-subtitle">
//             Everything you need to manage risk and compliance at enterprise scale
//           </p>
//         </div>
//         <div className="dashboard-features-grid">
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="dashboard-feature-card"
//               style={{ "--delay": `${idx * 50}ms` }}
//             >
//               <div className="dashboard-feature-icon">{feature.icon}</div>
//               <h4 className="dashboard-feature-title">{feature.title}</h4>
//               <p className="dashboard-feature-description">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* METRICS SECTION */}
//       <section className="dashboard-metrics-section">
//         <h3 className="dashboard-section-title">Our Impact</h3>
//         <div className="dashboard-metrics-grid">
//           <div className="dashboard-metric-card">
//             <div className="dashboard-metric-value">{counters.companies}+</div>
//             <div className="dashboard-metric-label">Organizations Protected</div>
//             <div className="dashboard-metric-bar">
//               <div
//                 className="dashboard-metric-fill"
//                 style={{ width: `${(counters.companies / 500) * 100}%` }}
//               />
//             </div>
//           </div>
//           <div className="dashboard-metric-card">
//             <div className="dashboard-metric-value">{counters.risks.toLocaleString()}+</div>
//             <div className="dashboard-metric-label">Risks Identified & Mitigated</div>
//             <div className="dashboard-metric-bar">
//               <div
//                 className="dashboard-metric-fill"
//                 style={{ width: `${(counters.risks / 50000) * 100}%` }}
//               />
//             </div>
//           </div>
//           <div className="dashboard-metric-card">
//             <div className="dashboard-metric-value">{counters.compliance}%</div>
//             <div className="dashboard-metric-label">Average Compliance Improvement</div>
//             <div className="dashboard-metric-bar">
//               <div
//                 className="dashboard-metric-fill"
//                 style={{ width: `${counters.compliance}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* KEY MODULES SECTION */}
//       <section className="dashboard-guest-modules">
//         <h3 className="dashboard-section-title">Explore Key Modules</h3>
//         <div className="dashboard-tiles-grid">
//           {tiles.map(({ label, description, icon, color, bgColor, iconColor }) => (
//             <div key={label} className="dashboard-tile dashboard-tile-disabled">
//               <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
//                 <div className={`dashboard-tile-icon ${iconColor}`}>{icon}</div>
//               </div>
//               <h3 className="dashboard-tile-title">{label}</h3>
//               <p className="dashboard-tile-description">{description}</p>
//               <div className={`dashboard-tile-accent bg-gradient-to-r ${color}`} />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* VIDEO SECTION */}
//       <section className="dashboard-video-section">
//         <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
//         <div className="dashboard-video-container">
//           <div className="dashboard-video-placeholder">
//             <Play className="w-16 h-16 text-white" />
//             <p>Compliance Management Demo</p>
//           </div>
//           <div className="dashboard-video-description">
//             <h4>Watch how SafeSphere streamlines compliance management</h4>
//             <ul className="dashboard-video-points">
//               <li>✓ Real-time risk dashboard</li>
//               <li>✓ Automated compliance checks</li>
//               <li>✓ Custom report generation</li>
//               <li>✓ Team collaboration features</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* INTEGRATIONS SECTION */}
//       <section className="dashboard-integrations-section">
//         <h3 className="dashboard-section-title">Integrations You Love</h3>
//         <p className="dashboard-section-subtitle">
//           SafeSphere works seamlessly with 100+ enterprise tools
//         </p>
//         <div className="dashboard-integrations-grid">
//           {integrations.map((integration, idx) => (
//             <div
//               key={idx}
//               className="dashboard-integration-card"
//               style={{ "--delay": `${idx * 60}ms` }}
//             >
//               <div className="dashboard-integration-logo">{integration.logo}</div>
//               <div className="dashboard-integration-name">{integration.name}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TESTIMONIALS SECTION */}
//       <section className="dashboard-testimonials-section">
//         <h3 className="dashboard-section-title">What Our Customers Say</h3>
//         <div className="dashboard-testimonials-grid">
//           {testimonials.map((testimonial, idx) => (
//             <div
//               key={idx}
//               className="dashboard-testimonial-card"
//               style={{ "--delay": `${idx * 100}ms` }}
//             >
//               <div className="dashboard-testimonial-stars">⭐⭐⭐⭐⭐</div>
//               <p className="dashboard-testimonial-quote">"{testimonial.quote}"</p>
//               <div className="dashboard-testimonial-author">
//                 <div className="dashboard-testimonial-avatar">{testimonial.avatar}</div>
//                 <div>
//                   <div className="dashboard-testimonial-name">{testimonial.name}</div>
//                   <div className="dashboard-testimonial-role">{testimonial.role}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ SECTION */}
//       <section className="dashboard-faq-section">
//         <h3 className="dashboard-section-title">Frequently Asked Questions</h3>
//         <div className="dashboard-faq-grid">
//           {faqs.map((faq, idx) => (
//             <div
//               key={idx}
//               className={`dashboard-faq-item ${expandedFaq === idx ? "expanded" : ""}`}
//             >
//               <button
//                 className="dashboard-faq-question"
//                 onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
//               >
//                 <span>{faq.question}</span>
//                 <ChevronDown className="w-5 h-5" />
//               </button>
//               {expandedFaq === idx && (
//                 <div className="dashboard-faq-answer">{faq.answer}</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TRUST SECTION */}
//       <section className="dashboard-trust-section">
//         <h4 className="dashboard-trust-title">Enterprise-Grade Trust</h4>
//         <p className="dashboard-trust-subtitle">
//           Trusted by the world's leading security teams
//         </p>
//         <div className="dashboard-trust-badges">
//           <span className="dashboard-trust-badge">🔐 SOC 2 Type II</span>
//           <span className="dashboard-trust-badge">📋 ISO 27001</span>
//           <span className="dashboard-trust-badge">🌍 GDPR Ready</span>
//           <span className="dashboard-trust-badge">🏥 HIPAA Compliant</span>
//           <span className="dashboard-trust-badge">🏛️ NIST Aligned</span>
//           <span className="dashboard-trust-badge">✅ CIS Frameworks</span>
//         </div>
//       </section>

//       {/* FINAL CTA */}
//       <section className="dashboard-final-cta">
//         <h3 className="dashboard-cta-title">Ready to Transform Your Compliance?</h3>
//         <p className="dashboard-cta-subtitle">
//           Join 500+ organizations managing risk smarter with SafeSphere
//         </p>
//         <button
//           onClick={() => history.push("/login")}
//           className="dashboard-cta-primary"
//         >
//           Get Started Today
//         </button>
//       </section>

//       {/* FOOTER */}
//       <footer className="dashboard-footer">
//         <div className="dashboard-footer-content">
//           <div className="dashboard-footer-section">
//             <h4>SafeSphere</h4>
//             <p>Enterprise Risk & Compliance Management Platform</p>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Product</h4>
//             <ul>
//               <li><a href="#">Risk Management</a></li>
//               <li><a href="#">Compliance</a></li>
//               <li><a href="#">Gap Assessment</a></li>
//             </ul>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Company</h4>
//             <ul>
//               <li><a href="#">About</a></li>
//               <li><a href="#">Blog</a></li>
//               <li><a href="#">Careers</a></li>
//             </ul>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Legal</h4>
//             <ul>
//               <li><a href="#">Privacy</a></li>
//               <li><a href="#">Terms</a></li>
//               <li><a href="#">Security</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="dashboard-footer-bottom">
//           © {new Date().getFullYear()} SafeSphere · All rights reserved · Made in India
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import "./Dashboard.css";
// import {
//   ShieldCheck,
//   FileText,
//   Activity,
//   LogIn,
//   UserCircle2,
//   Lock,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   Users,
//   Zap,
//   BarChart3,
//   ChevronDown,
//   Play,
//   Menu,
//   X,
// } from "lucide-react";
// import ChangePasswordModal from "./ChangePasswordModal";

// const Hero3DEarth = ({ isLoggedIn, user }) => {
//   const history = useHistory();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <section className={`hero-section ${mounted ? "hero-loaded" : ""}`}>
//       <div className="hero-inner">
//         <div className="hero-text">
//           <span className="hero-badge">
//             {isLoggedIn
//               ? `Welcome back, ${user?.name || "Security Team"}`
//               : "Secure Your Entire Sphere"}
//           </span>
//           <h1 className="hero-title">
//             SafeSphere – Enterprise Risk &amp; Compliance Intelligence
//           </h1>
//           <p className="hero-description">
//             A unified control plane for risk assessment, documentation, and
//             compliance automation. Visualize your security posture across
//             frameworks like ISO 27001 and NIST in real time.
//           </p>
//           <div className="hero-cta-row">
//             <button
//               className="hero-cta-primary"
//               onClick={() => history.push("/login")}
//             >
//               {isLoggedIn ? "Go to Risk Dashboard" : "Get Started"}
//             </button>
//             <button
//               className="hero-cta-secondary"
//               onClick={() => history.push("/demo")}
//             >
//               <LogIn size={16} />
//               Get a Demo
//             </button>
//           </div>
//           <div className="hero-meta">
//             <span>ISO 27001 · NIST CSF · SOC 2</span>
//             <span>Continuous monitoring · Audit-ready evidence</span>
//           </div>
//         </div>
//         <div className="hero-visual">
//           <div className="hero-sphere">
//             <div className="hero-sphere-inner"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const CoreCards = () => {
//   const cards = [
//     {
//       title: "Risk Assessment",
//       description:
//         "Continuously score, prioritize, and track risks across assets, vendors, and business units.",
//       icon: <ShieldCheck size={26} />,
//     },
//     {
//       title: "Documentation Management",
//       description:
//         "Centralize policies, procedures, and evidence with version control and review workflows.",
//       icon: <FileText size={26} />,
//     },
//     {
//       title: "Gap Assessment",
//       description:
//         "Map ISO and NIST controls, highlight gaps, and generate implementation roadmaps.",
//       icon: <Activity size={26} />,
//     },
//   ];

//   return (
//     <section className="corecards-section">
//       <div className="corecards-header">
//         <h2>Core Intelligence Pillars</h2>
//         <p>
//           Everything starts with understanding risk, documenting controls, and
//           closing compliance gaps – SafeSphere unifies all three.
//         </p>
//       </div>
//       <div className="corecards-grid">
//         {cards.map((card, idx) => (
//           <div key={card.title} className={`corecard corecard-${idx}`}>
//             <div className="corecard-icon">{card.icon}</div>
//             <h3>{card.title}</h3>
//             <p>{card.description}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// const SplitEarthSection = () => (
//   <section className="split-section">
//     <div className="split-text">
//       <h2>Compliance Intelligence in Motion</h2>
//       <p>
//         SafeSphere continuously ingests signals from your cloud, infrastructure,
//         and business processes. Controls are auto-mapped to ISO 27001 and NIST
//         CSF so you always know what's in place, what's drifting, and what's at
//         risk.
//       </p>
//       <ul>
//         <li>Automated control mapping and evidence suggestions</li>
//         <li>Live posture snapshots across all frameworks</li>
//         <li>Scenario views for audits, board reviews, and incidents</li>
//       </ul>
//     </div>
//     <div className="split-visual">
//       <div className="split-sphere">
//         <div className="split-sphere-inner"></div>
//       </div>
//       <div className="split-orbit-ring" />
//     </div>
//   </section>
// );

// const RotatingFeatures = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const features = [
//     {
//       name: "Team Collaboration Hub",
//       icon: "👥",
//       short:
//         "Coordinate tasks, approvals, and evidence in a single workspace.",
//     },
//     {
//       name: "Continuous Risk Monitoring",
//       icon: "⚡",
//       short:
//         "Detect control drift and critical risks in real time across assets.",
//     },
//     {
//       name: "Enterprise Grade Security",
//       icon: "🔐",
//       short:
//         "Zero trust access, strong encryption, and multi region resilience.",
//     },
//     {
//       name: "Intelligence Analytics",
//       icon: "📊",
//       short:
//         "Surface trends, hotspots, and prioritized remediation with AI.",
//     },
//     {
//       name: "Custom Reporting",
//       icon: "📄",
//       short:
//         "Generate audit ready, stakeholder friendly reports on demand.",
//     },
//   ];

//   const anglePerItem = 360 / features.length;
//   const radius = 230;
//   const center = 270; // must match half of circle size in CSS (540 / 2)

//   const handleCenterClick = () => {
//     setActiveIndex(null);
//   };

//   return (
//     <section className="rot-pro-section">
//       <div className="rot-pro-inner" onClick={handleCenterClick}>
//         <div
//           className="rot-pro-circle"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="rot-pro-circle-outline" />

//           {features.map((f, index) => {
//             const angleDeg = index * anglePerItem - 90;
//             const angle = (angleDeg * Math.PI) / 180;

//             const x = center + radius * Math.cos(angle);
//             const y = center + radius * Math.sin(angle);

//             const isActive = activeIndex === index;

//             return (
//               <button
//                 key={f.name}
//                 type="button"
//                 className={`rot-pro-item ${
//                   isActive ? "rot-pro-item--active" : ""
//                 }`}
//                 style={{ left: x, top: y }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setActiveIndex(isActive ? null : index);
//                 }}
//               >
//                 <div className="rot-pro-item-shell">
//                   <span className="rot-pro-item-icon">{f.icon}</span>
//                   <span className="rot-pro-item-label">{f.name}</span>
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         <div className="rot-pro-center">
//           <h2>Orchestrate Every Compliance Motion</h2>
//           <p className="rot-pro-center-sub">
//             Click any feature around the sphere to see how it powers your
//             compliance journey.
//           </p>

//           {activeIndex !== null && (
//             <div className="rot-pro-card">
//               <div className="rot-pro-card-glow" />
//               <div className="rot-pro-card-top">
//                 <span className="rot-pro-card-icon">
//                   {features[activeIndex].icon}
//                 </span>
//                 <span className="rot-pro-card-title">
//                   {features[activeIndex].name}
//                 </span>
//               </div>
//               <p className="rot-pro-card-desc">
//                 {features[activeIndex].short}
//               </p>
//             </div>
//           )}

//           <button
//             className="rot-pro-cta"
//             onClick={(e) => e.stopPropagation()}
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// const WhySafeSphere = () => {
//   const pillars = [
//     {
//       title: "Reduce Risk & Compliance Burden",
//       icon: <ShieldCheck size={24} />,
//       desc: "Consolidate tools, automate evidence, and remove spreadsheet work from your security team.",
//     },
//     {
//       title: "Accelerate Compliance Readiness",
//       icon: <TrendingUp size={24} />,
//       desc: "Pre-built templates and guided workflows shorten ISO and SOC 2 timelines from months to weeks.",
//     },
//     {
//       title: "Cut Operational Costs",
//       icon: <Zap size={24} />,
//       desc: "Reuse evidence across frameworks and automate follow-ups to cut manual hours by up to 50%.",
//     },
//     {
//       title: "Improve Security Posture",
//       icon: <BarChart3 size={24} />,
//       desc: "Risk scoring and continuous monitoring keep your posture live, not locked in last year's report.",
//     },
//   ];

//   return (
//     <section className="why-section">
//       <div className="why-header">
//         <h2>Why SafeSphere</h2>
//         <p>Four pillars designed for modern security and compliance teams.</p>
//       </div>
//       <div className="why-grid">
//         {pillars.map((p, idx) => (
//           <div key={p.title} className={`why-card why-card-${idx}`}>
//             <div className="why-icon">{p.icon}</div>
//             <h3>{p.title}</h3>
//             <p>{p.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// const ExtraFeaturesLongScroll = () => {
//   const items = [
//     {
//       title: "Automated Evidence Collection",
//       desc: "Connect cloud providers and ticketing tools to auto-pull screenshots, logs, and approvals.",
//     },
//     {
//       title: "Framework Mapping (ISO ↔ NIST)",
//       desc: "One control library mapped across frameworks so you never duplicate work.",
//     },
//     {
//       title: "Role-Based Access Control",
//       desc: "Give auditors, executives, and engineers tailored views without exposing sensitive data.",
//     },
//     {
//       title: "Compliance Dashboards",
//       desc: "See real-time coverage, residual risk, and exceptions in a single pane of glass.",
//     },
//     {
//       title: "Audit Trail & Logs",
//       desc: "Immutable timelines for every change, ready for regulators and internal reviews.",
//     },
//     {
//       title: "Secure Cloud Architecture",
//       desc: "Built for AWS with encryption, segmentation, and hardened services.",
//     },
//     {
//       title: "AI-Driven Recommendations",
//       desc: "Let SafeSphere surface next-best actions based on your controls and incidents.",
//     },
//   ];

//   return (
//     <section className="extra-section">
//       <div className="extra-inner">
//         <h2>Built for Enterprise-Grade Compliance</h2>
//         <p>
//           As you scroll, SafeSphere reveals everything your team needs – from
//           evidence capture to AI insights.
//         </p>
//         <div className="extra-grid">
//           {items.map((item, idx) => (
//             <div key={item.title} className={`extra-card extra-card-${idx}`}>
//               <h3>{item.title}</h3>
//               <p>{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const tiles = [
//   {
//     label: "Risk Management",
//     route: "/risk-assessment",
//     description:
//       "Identify, analyze, and mitigate organizational risks before they impact your business.",
//     icon: <ShieldCheck className="w-12 h-12" />,
//     color: "from-blue-500 to-blue-600",
//     bgColor: "bg-blue-50",
//     iconColor: "text-blue-600",
//   },
//   {
//     label: "Documentation",
//     route: "/documentation",
//     description:
//       "Maintain audit-ready documentation and ensure compliance with industry standards.",
//     icon: <FileText className="w-12 h-12" />,
//     color: "from-purple-500 to-purple-600",
//     bgColor: "bg-purple-50",
//     iconColor: "text-purple-600",
//   },
//   {
//     label: "Gap Assessment",
//     route: "/gap-assessment",
//     description:
//       "Evaluate compliance gaps and get actionable insights for your organization.",
//     icon: <Activity className="w-12 h-12" />,
//     color: "from-cyan-500 to-cyan-600",
//     bgColor: "bg-cyan-50",
//     iconColor: "text-cyan-600",
//   },
// ];

// const features = [
//   {
//     title: "Continuous Risk Monitoring",
//     description:
//       "Track vulnerabilities and security events in real-time across your entire infrastructure.",
//     icon: "⚡",
//   },
//   {
//     title: "Automated Compliance Checks",
//     description:
//       "Stay audit-ready with automated control mapping and evidence collection.",
//     icon: "✓",
//   },
//   {
//     title: "Intelligent Analytics",
//     description:
//       "AI-powered insights help you identify trends, predict risks, and make data-driven decisions.",
//     icon: "📊",
//   },
//   {
//     title: "Team Collaboration Hub",
//     description:
//       "Assign tasks, track progress, and collaborate seamlessly with your security team.",
//     icon: "👥",
//   },
//   {
//     title: "Custom Reporting",
//     description:
//       "Generate executive reports with actionable insights for stakeholders.",
//     icon: "📄",
//   },
//   {
//     title: "Enterprise-Grade Security",
//     description:
//       "Bank-level encryption and compliance with SOC 2, ISO 27001, and GDPR standards.",
//     icon: "🔐",
//   },
// ];

// const benefits = [
//   {
//     title: "Reduce Risk Exposure",
//     subtitle: "By up to 87% in the first year",
//     icon: "🛡️",
//   },
//   {
//     title: "Accelerate Compliance",
//     subtitle: "Audit-ready in days, not months",
//     icon: "⏱️",
//   },
//   {
//     title: "Cut Operational Cost",
//     subtitle: "50% reduction in manual compliance work",
//     icon: "💰",
//   },
//   {
//     title: "Improve Security Posture",
//     subtitle: "Continuous monitoring & threat detection",
//     icon: "🔒",
//   },
// ];

// const integrations = [
//   { name: "AWS", logo: "☁️" },
//   { name: "Azure", logo: "📘" },
//   { name: "Google Cloud", logo: "🔵" },
//   { name: "ServiceNow", logo: "🔧" },
//   { name: "Okta", logo: "🔐" },
//   { name: "Slack", logo: "💬" },
// ];

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "CISO, Fortune 500 Tech",
//     quote:
//       "SafeSphere transformed our compliance process. We reduced audit time by 70%.",
//     avatar: "👩‍💼",
//   },
//   {
//     name: "Michael Chen",
//     role: "Risk Manager, Financial Services",
//     quote:
//       "The real-time monitoring capabilities are exceptional. We catch potential risks before they become issues.",
//     avatar: "👨‍💼",
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Compliance Officer, Healthcare",
//     quote:
//       "SafeSphere made HIPAA compliance effortless. The automated checks save us countless hours.",
//     avatar: "👩‍🔬",
//   },
// ];

// const faqs = [
//   {
//     question: "How long does it take to implement SafeSphere?",
//     answer:
//       "Most organizations are up and running within 2-4 weeks. Our onboarding team provides full support.",
//   },
//   {
//     question: "Is SafeSphere compliant with industry standards?",
//     answer:
//       "Yes! SOC 2 Type II certified, ISO 27001 compliant, GDPR ready, and supports HIPAA, NIST, and CIS frameworks.",
//   },
//   {
//     question: "Can SafeSphere integrate with our existing tools?",
//     answer:
//       "Absolutely. SafeSphere integrates with 100+ enterprise tools including AWS, Azure, ServiceNow, Okta, and Slack.",
//   },
//   {
//     question: "What kind of support do you offer?",
//     answer:
//       "We provide 24/7 enterprise support, dedicated account managers, and regular training sessions.",
//   },
//   {
//     question: "How is pricing structured?",
//     answer:
//       "Pricing is based on the number of assets monitored and features used. Contact our sales team for a custom quote.",
//   },
// ];

// const Dashboard = () => {
//   const history = useHistory();
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [expandedFaq, setExpandedFaq] = useState(null);
//   const [counters, setCounters] = useState({
//     companies: 0,
//     risks: 0,
//     compliance: 0,
//   });

//   useEffect(() => {
//     let interval;
//     if (counters.companies < 500) {
//       interval = setInterval(() => {
//         setCounters((prev) => ({
//           ...prev,
//           companies: Math.min(prev.companies + 10, 500),
//           risks: Math.min(prev.risks + 100, 50000),
//           compliance: Math.min(prev.compliance + 1, 99),
//         }));
//       }, 20);
//     }
//     return () => clearInterval(interval);
//   }, [counters]);

//   if (user) {
//     return (
//       <div className="dashboard-signed-in">
//         <header className="dashboard-header">
//           <div className="dashboard-header-content">
//             <div className="dashboard-logo-section">
//               <div className="dashboard-logo-icon">
//                 <ShieldCheck className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="dashboard-logo-text">SAFESPHERE</h1>
//                 <p className="dashboard-logo-subtext">
//                   Enterprise Risk & Compliance Platform
//                 </p>
//               </div>
//             </div>
//             <div className="dashboard-user-card">
//               <UserCircle2 className="text-indigo-600 w-5 h-5" />
//               <div className="dashboard-user-info">
//                 <span className="dashboard-user-name">
//                   {user.name || "User"}
//                 </span>
//                 <span className="dashboard-user-role">
//                   {user.department?.name || "Consultant"}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowChangePassword(true)}
//                 className="dashboard-change-pwd-btn"
//               >
//                 <Lock className="w-4 h-4" /> Change
//               </button>
//               {showChangePassword && (
//                 <ChangePasswordModal
//                   onClose={() => setShowChangePassword(false)}
//                 />
//               )}
//             </div>
//           </div>
//         </header>

//         <main className="dashboard-main">
//           <Hero3DEarth isLoggedIn={true} user={user} />
//           <CoreCards />
//           <SplitEarthSection />
//           <RotatingFeatures />
//           <WhySafeSphere />
//           <ExtraFeaturesLongScroll />

//           <section className="dashboard-tiles-section">
//             <h3 className="dashboard-section-title">Core Modules</h3>
//             <div className="dashboard-tiles-grid">
//               {tiles.map(
//                 ({
//                   label,
//                   route,
//                   description,
//                   icon,
//                   color,
//                   bgColor,
//                   iconColor,
//                 }) => (
//                   <div
//                     key={label}
//                     className="dashboard-tile"
//                     onClick={() => history.push(route)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyPress={(e) => {
//                       if (e.key === "Enter") history.push(route);
//                     }}
//                   >
//                     <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
//                       <div className={`dashboard-tile-icon ${iconColor}`}>
//                         {icon}
//                       </div>
//                     </div>
//                     <h3 className="dashboard-tile-title">{label}</h3>
//                     <p className="dashboard-tile-description">
//                       {description}
//                     </p>
//                     <div
//                       className={`dashboard-tile-accent bg-gradient-to-r ${color}`}
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           </section>

//           <section className="dashboard-benefits-section">
//             <div className="dashboard-section-header">
//               <h3 className="dashboard-section-title">Why SafeSphere?</h3>
//               <p className="dashboard-section-subtitle">
//                 Proven impact across 500+ organizations worldwide
//               </p>
//             </div>
//             <div className="dashboard-benefits-grid">
//               {benefits.map((benefit, idx) => (
//                 <div key={idx} className="dashboard-benefit-card">
//                   <div className="dashboard-benefit-icon">{benefit.icon}</div>
//                   <h4 className="dashboard-benefit-title">
//                     {benefit.title}
//                   </h4>
//                   <p className="dashboard-benefit-subtitle">
//                     {benefit.subtitle}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="dashboard-features-section">
//             <div className="dashboard-features-header">
//               <h3 className="dashboard-section-title">Powerful Features</h3>
//               <p className="dashboard-features-subtitle">
//                 Everything you need to manage risk and compliance at enterprise
//                 scale
//               </p>
//             </div>
//             <div className="dashboard-features-grid">
//               {features.map((feature, idx) => (
//                 <div key={idx} className="dashboard-feature-card">
//                   <div className="dashboard-feature-icon">
//                     {feature.icon}
//                   </div>
//                   <h4 className="dashboard-feature-title">
//                     {feature.title}
//                   </h4>
//                   <p className="dashboard-feature-description">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="dashboard-metrics-section">
//             <h3 className="dashboard-section-title">Our Impact</h3>
//             <div className="dashboard-metrics-grid">
//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">
//                   {counters.companies}+
//                 </div>
//                 <div className="dashboard-metric-label">
//                   Organizations Protected
//                 </div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{
//                       width: `${(counters.companies / 500) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">
//                   {counters.risks.toLocaleString()}+
//                 </div>
//                 <div className="dashboard-metric-label">
//                   Risks Identified & Mitigated
//                 </div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{
//                       width: `${(counters.risks / 50000) * 100}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="dashboard-metric-card">
//                 <div className="dashboard-metric-value">
//                   {counters.compliance}%
//                 </div>
//                 <div className="dashboard-metric-label">
//                   Average Compliance Improvement
//                 </div>
//                 <div className="dashboard-metric-bar">
//                   <div
//                     className="dashboard-metric-fill"
//                     style={{ width: `${counters.compliance}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="dashboard-video-section">
//             <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
//             <div className="dashboard-video-container">
//               <div className="dashboard-video-placeholder">
//                 <Play className="w-16 h-16 text-white" />
//                 <p>Compliance Management Demo</p>
//               </div>
//               <div className="dashboard-video-description">
//                 <h4>Watch how SafeSphere streamlines compliance management</h4>
//                 <ul className="dashboard-video-points">
//                   <li>✓ Real-time risk dashboard</li>
//                   <li>✓ Automated compliance checks</li>
//                   <li>✓ Custom report generation</li>
//                   <li>✓ Team collaboration features</li>
//                 </ul>
//               </div>
//             </div>
//           </section>

//           <section className="dashboard-integrations-section">
//             <h3 className="dashboard-section-title">Integrations You Love</h3>
//             <p className="dashboard-section-subtitle">
//               SafeSphere works seamlessly with 100+ enterprise tools
//             </p>
//             <div className="dashboard-integrations-grid">
//               {integrations.map((integration, idx) => (
//                 <div key={idx} className="dashboard-integration-card">
//                   <div className="dashboard-integration-logo">
//                     {integration.logo}
//                   </div>
//                   <div className="dashboard-integration-name">
//                     {integration.name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="dashboard-testimonials-section">
//             <h3 className="dashboard-section-title">
//               What Our Customers Say
//             </h3>
//             <div className="dashboard-testimonials-grid">
//               {testimonials.map((testimonial, idx) => (
//                 <div key={idx} className="dashboard-testimonial-card">
//                   <div className="dashboard-testimonial-stars">
//                     ⭐⭐⭐⭐⭐
//                   </div>
//                   <p className="dashboard-testimonial-quote">
//                     "{testimonial.quote}"
//                   </p>
//                   <div className="dashboard-testimonial-author">
//                     <div className="dashboard-testimonial-avatar">
//                       {testimonial.avatar}
//                     </div>
//                     <div>
//                       <div className="dashboard-testimonial-name">
//                         {testimonial.name}
//                       </div>
//                       <div className="dashboard-testimonial-role">
//                         {testimonial.role}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="dashboard-faq-section">
//             <h3 className="dashboard-section-title">
//               Frequently Asked Questions
//             </h3>
//             <div className="dashboard-faq-grid">
//               {faqs.map((faq, idx) => (
//                 <div
//                   key={idx}
//                   className={`dashboard-faq-item ${
//                     expandedFaq === idx ? "expanded" : ""
//                   }`}
//                 >
//                   <button
//                     className="dashboard-faq-question"
//                     onClick={() =>
//                       setExpandedFaq(
//                         expandedFaq === idx ? null : idx
//                       )
//                     }
//                   >
//                     <span>{faq.question}</span>
//                     <ChevronDown className="w-5 h-5" />
//                   </button>
//                   {expandedFaq === idx && (
//                     <div className="dashboard-faq-answer">
//                       {faq.answer}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="dashboard-final-cta">
//             <h3 className="dashboard-cta-title">
//               Ready to Transform Your Compliance?
//             </h3>
//             <p className="dashboard-cta-subtitle">
//               Join 500+ organizations managing risk smarter with SafeSphere
//             </p>
//             <div className="dashboard-cta-buttons">
//               <button
//                 onClick={() => history.push("/risk-assessment")}
//                 className="dashboard-cta-primary"
//               >
//                 Get Started
//               </button>
//             </div>
//           </section>

//           <section className="dashboard-trust-section">
//             <h4 className="dashboard-trust-title">
//               Enterprise-Grade Trust
//             </h4>
//             <p className="dashboard-trust-subtitle">
//               Trusted by the world's leading security teams
//             </p>
//             <div className="dashboard-trust-badges">
//               <span className="dashboard-trust-badge">
//                 🔐 SOC 2 Type II
//               </span>
//               <span className="dashboard-trust-badge">
//                 📋 ISO 27001
//               </span>
//               <span className="dashboard-trust-badge">
//                 🌍 GDPR Ready
//               </span>
//               <span className="dashboard-trust-badge">
//                 🏥 HIPAA Compliant
//               </span>
//               <span className="dashboard-trust-badge">
//                 🏛️ NIST Aligned
//               </span>
//               <span className="dashboard-trust-badge">
//                 ✅ CIS Frameworks
//               </span>
//             </div>
//           </section>
//         </main>

//         <footer className="dashboard-footer">
//           <div className="dashboard-footer-content">
//             <div className="dashboard-footer-section">
//               <h4>SafeSphere</h4>
//               <p>Enterprise Risk & Compliance Management Platform</p>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Product</h4>
//               <ul>
//                 <li>
//                   <a href="#">Risk Management</a>
//                 </li>
//                 <li>
//                   <a href="#">Compliance</a>
//                 </li>
//                 <li>
//                   <a href="#">Gap Assessment</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Company</h4>
//               <ul>
//                 <li>
//                   <a href="#">About</a>
//                 </li>
//                 <li>
//                   <a href="#">Blog</a>
//                 </li>
//                 <li>
//                   <a href="#">Careers</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="dashboard-footer-section">
//               <h4>Legal</h4>
//               <ul>
//                 <li>
//                   <a href="#">Privacy</a>
//                 </li>
//                 <li>
//                   <a href="#">Terms</a>
//                 </li>
//                 <li>
//                   <a href="#">Security</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="dashboard-footer-bottom">
//             © {new Date().getFullYear()} SafeSphere · All rights reserved ·
//             Made in India
//           </div>
//         </footer>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-guest">
//       <header className="dashboard-header">
//         <div className="dashboard-header-content">
//           <div className="dashboard-logo-section">
//             <div className="dashboard-logo-icon">
//               <ShieldCheck className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="dashboard-logo-text">SAFESPHERE</h1>
//               <p className="dashboard-logo-subtext">
//                 Enterprise Risk & Compliance Platform
//               </p>
//             </div>
//           </div>
//           <button
//             className="dashboard-login-btn"
//             onClick={() => history.push("/login")}
//           >
//             <LogIn className="w-4 h-4" /> Login
//           </button>
//         </div>
//       </header>

//       <main className="dashboard-main">
//         <Hero3DEarth isLoggedIn={false} user={null} />
//         <CoreCards />
//         <SplitEarthSection />
//         <RotatingFeatures />
//         <WhySafeSphere />
//         <ExtraFeaturesLongScroll />

//         <section className="dashboard-guest-modules">
//           <h3 className="dashboard-section-title">Explore Key Modules</h3>
//           <div className="dashboard-tiles-grid">
//             {tiles.map(
//               ({ label, description, icon, color, bgColor, iconColor }) => (
//                 <div
//                   key={label}
//                   className="dashboard-tile dashboard-tile-disabled"
//                 >
//                   <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
//                     <div className={`dashboard-tile-icon ${iconColor}`}>
//                       {icon}
//                     </div>
//                   </div>
//                   <h3 className="dashboard-tile-title">{label}</h3>
//                   <p className="dashboard-tile-description">
//                     {description}
//                   </p>
//                   <div
//                     className={`dashboard-tile-accent bg-gradient-to-r ${color}`}
//                   />
//                 </div>
//               )
//             )}
//           </div>
//         </section>


//         <section className="dashboard-guest-features">
//           <div className="dashboard-features-header">
//             <h3 className="dashboard-section-title">Powerful Features</h3>
//             <p className="dashboard-features-subtitle">
//               Everything you need to manage risk and compliance at enterprise
//               scale
//             </p>
//           </div>
//           <div className="dashboard-features-grid">
//             {features.map((feature, idx) => (
//               <div key={idx} className="dashboard-feature-card">
//                 <div className="dashboard-feature-icon">
//                   {feature.icon}
//                 </div>
//                 <h4 className="dashboard-feature-title">
//                   {feature.title}
//                 </h4>
//                 <p className="dashboard-feature-description">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="dashboard-metrics-section">
//           <h3 className="dashboard-section-title">Our Impact</h3>
//           <div className="dashboard-metrics-grid">
//             <div className="dashboard-metric-card">
//               <div className="dashboard-metric-value">
//                 {counters.companies}+
//               </div>
//               <div className="dashboard-metric-label">
//                 Organizations Protected
//               </div>
//               <div className="dashboard-metric-bar">
//                 <div
//                   className="dashboard-metric-fill"
//                   style={{
//                     width: `${(counters.companies / 500) * 100}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="dashboard-metric-card">
//               <div className="dashboard-metric-value">
//                 {counters.risks.toLocaleString()}+
//               </div>
//               <div className="dashboard-metric-label">
//                 Risks Identified & Mitigated
//               </div>
//               <div className="dashboard-metric-bar">
//                 <div
//                   className="dashboard-metric-fill"
//                   style={{
//                     width: `${(counters.risks / 50000) * 100}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="dashboard-metric-card">
//               <div className="dashboard-metric-value">
//                 {counters.compliance}%
//               </div>
//               <div className="dashboard-metric-label">
//                 Average Compliance Improvement
//               </div>
//               <div className="dashboard-metric-bar">
//                 <div
//                   className="dashboard-metric-fill"
//                   style={{ width: `${counters.compliance}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-video-section">
//           <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
//           <div className="dashboard-video-container">
//             <div className="dashboard-video-placeholder">
//               <Play className="w-16 h-16 text-white" />
//               <p>Compliance Management Demo</p>
//             </div>
//             <div className="dashboard-video-description">
//               <h4>Watch how SafeSphere streamlines compliance management</h4>
//               <ul className="dashboard-video-points">
//                 <li>✓ Real-time risk dashboard</li>
//                 <li>✓ Automated compliance checks</li>
//                 <li>✓ Custom report generation</li>
//                 <li>✓ Team collaboration features</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-integrations-section">
//           <h3 className="dashboard-section-title">Integrations You Love</h3>
//           <p className="dashboard-section-subtitle">
//             SafeSphere works seamlessly with 100+ enterprise tools
//           </p>
//           <div className="dashboard-integrations-grid">
//             {integrations.map((integration, idx) => (
//               <div key={idx} className="dashboard-integration-card">
//                 <div className="dashboard-integration-logo">
//                   {integration.logo}
//                 </div>
//                 <div className="dashboard-integration-name">
//                   {integration.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="dashboard-testimonials-section">
//           <h3 className="dashboard-section-title">What Our Customers Say</h3>
//           <div className="dashboard-testimonials-grid">
//             {testimonials.map((testimonial, idx) => (
//               <div key={idx} className="dashboard-testimonial-card">
//                 <div className="dashboard-testimonial-stars">
//                   ⭐⭐⭐⭐⭐
//                 </div>
//                 <p className="dashboard-testimonial-quote">
//                   "{testimonial.quote}"
//                 </p>
//                 <div className="dashboard-testimonial-author">
//                   <div className="dashboard-testimonial-avatar">
//                     {testimonial.avatar}
//                   </div>
//                   <div>
//                     <div className="dashboard-testimonial-name">
//                       {testimonial.name}
//                     </div>
//                     <div className="dashboard-testimonial-role">
//                       {testimonial.role}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="dashboard-faq-section">
//           <h3 className="dashboard-section-title">
//             Frequently Asked Questions
//           </h3>
//           <div className="dashboard-faq-grid">
//             {faqs.map((faq, idx) => (
//               <div
//                 key={idx}
//                 className={`dashboard-faq-item ${
//                   expandedFaq === idx ? "expanded" : ""
//                 }`}
//               >
//                 <button
//                   className="dashboard-faq-question"
//                   onClick={() =>
//                     setExpandedFaq(expandedFaq === idx ? null : idx)
//                   }
//                 >
//                   <span>{faq.question}</span>
//                   <ChevronDown className="w-5 h-5" />
//                 </button>
//                 {expandedFaq === idx && (
//                   <div className="dashboard-faq-answer">
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="dashboard-trust-section">
//           <h4 className="dashboard-trust-title">Enterprise-Grade Trust</h4>
//           <p className="dashboard-trust-subtitle">
//             Trusted by the world's leading security teams
//           </p>
//           <div className="dashboard-trust-badges">
//             <span className="dashboard-trust-badge">
//               🔐 SOC 2 Type II
//             </span>
//             <span className="dashboard-trust-badge">
//               📋 ISO 27001
//             </span>
//             <span className="dashboard-trust-badge">
//               🌍 GDPR Ready
//             </span>
//             <span className="dashboard-trust-badge">
//               🏥 HIPAA Compliant
//             </span>
//             <span className="dashboard-trust-badge">
//               🏛️ NIST Aligned
//             </span>
//             <span className="dashboard-trust-badge">
//               ✅ CIS Frameworks
//             </span>
//           </div>
//         </section>

//         <section className="dashboard-final-cta">
//           <h3 className="dashboard-cta-title">
//             Ready to Transform Your Compliance?
//           </h3>
//           <p className="dashboard-cta-subtitle">
//             Join 500+ organizations managing risk smarter with SafeSphere
//           </p>
//           <button
//             onClick={() => history.push("/login")}
//             className="dashboard-cta-primary"
//           >
//             Get Started Today
//           </button>
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <div className="dashboard-footer-content">
//           <div className="dashboard-footer-section">
//             <h4>SafeSphere</h4>
//             <p>Enterprise Risk & Compliance Management Platform</p>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Product</h4>
//             <ul>
//               <li>
//                 <a href="#">Risk Management</a>
//               </li>
//               <li>
//                 <a href="#">Compliance</a>
//               </li>
//               <li>
//                 <a href="#">Gap Assessment</a>
//               </li>
//             </ul>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Company</h4>
//             <ul>
//               <li>
//                 <a href="#">About</a>
//               </li>
//               <li>
//                 <a href="#">Blog</a>
//               </li>
//               <li>
//                 <a href="#">Careers</a>
//               </li>
//             </ul>
//           </div>
//           <div className="dashboard-footer-section">
//             <h4>Legal</h4>
//             <ul>
//               <li>
//                 <a href="#">Privacy</a>
//               </li>
//               <li>
//                 <a href="#">Terms</a>
//               </li>
//               <li>
//                 <a href="#">Security</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="dashboard-footer-bottom">
//           © {new Date().getFullYear()} SafeSphere · All rights reserved · Made
//           in India
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;








import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import {
  ShieldCheck,
  FileText,
  Activity,
  LogIn,
  UserCircle2,
  Lock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users,
  Zap,
  BarChart3,
  ChevronDown,
  Play,
  Menu,
  X,
} from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModal";
import SprintoReplica from './SprintoReplica'
const Hero3DEarth = ({ isLoggedIn, user }) => {
  const history = useHistory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={`hero-section ${mounted ? "hero-loaded" : ""}`}>
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-badge">
            {isLoggedIn
              ? `Welcome back, ${user?.name || "Security Team"}`
              : "Secure Your Entire Sphere"}
          </span>
          <h1 className="hero-title">
            SafeSphere – Enterprise Risk &amp; Compliance Intelligence
          </h1>
          <p className="hero-description">
            A unified control plane for risk assessment, documentation, and
            compliance automation. Visualize your security posture across
            frameworks like ISO 27001 and NIST in real time.
          </p>
          <div className="hero-cta-row">
            <button
              className="hero-cta-primary"
              onClick={() =>
                history.push(isLoggedIn ? "/risk-assessment" : "/login")
              }
            >
              {isLoggedIn ? "Go to Risk Dashboard" : "Get Started"}
            </button>
            <button
              className="hero-cta-secondary"
              onClick={() => history.push("/demo")}
            >
              <LogIn size={16} />
              Get a Demo
            </button>
          </div>
          <div className="hero-meta">
            <span>ISO 27001 · NIST CSF · SOC 2</span>
            <span>Continuous monitoring · Audit-ready evidence</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-sphere">
            <div className="hero-sphere-inner"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreCards = () => {
  const cards = [
    {
      title: "Risk Assessment",
      description:
        "Continuously score, prioritize, and track risks across assets, vendors, and business units.",
      icon: <ShieldCheck size={26} />,
    },
    {
      title: "Documentation Management",
      description:
        "Centralize policies, procedures, and evidence with version control and review workflows.",
      icon: <FileText size={26} />,
    },
    {
      title: "Gap Assessment",
      description:
        "Map ISO and NIST controls, highlight gaps, and generate implementation roadmaps.",
      icon: <Activity size={26} />,
    },
  ];

  return (
    <section className="corecards-section">
      <div className="corecards-header">
        <h2>Core Intelligence Pillars</h2>
        <p>
          Everything starts with understanding risk, documenting controls, and
          closing compliance gaps – SafeSphere unifies all three.
        </p>
      </div>
      <div className="corecards-grid">
        {cards.map((card, idx) => (
          <div key={card.title} className={`corecard corecard-${idx}`}>
            <div className="corecard-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SplitEarthSection = () => (
  <section className="split-section">
    <div className="split-text">
      <h2>Compliance Intelligence in Motion</h2>
      <p>
        SafeSphere continuously ingests signals from your cloud, infrastructure,
        and business processes. Controls are auto-mapped to ISO 27001 and NIST
        CSF so you always know what's in place, what's drifting, and what's at
        risk.
      </p>
      <ul>
        <li>Automated control mapping and evidence suggestions</li>
        <li>Live posture snapshots across all frameworks</li>
        <li>Scenario views for audits, board reviews, and incidents</li>
      </ul>
    </div>
    <div className="split-visual">
      <div className="split-sphere">
        <div className="split-sphere-inner"></div>
      </div>
      <div className="split-orbit-ring" />
    </div>
  </section>
);

const RotatingFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      name: "Team Collaboration Hub",
      icon: "👥",
      short:
        "Coordinate tasks, approvals, and evidence in a single workspace.",
    },
    {
      name: "Continuous Risk Monitoring",
      icon: "⚡",
      short:
        "Detect control drift and critical risks in real time across assets.",
    },
    {
      name: "Enterprise Grade Security",
      icon: "🔐",
      short:
        "Zero trust access, strong encryption, and multi region resilience.",
    },
    {
      name: "Intelligence Analytics",
      icon: "📊",
      short:
        "Surface trends, hotspots, and prioritized remediation with AI.",
    },
    {
      name: "Custom Reporting",
      icon: "📄",
      short:
        "Generate audit ready, stakeholder friendly reports on demand.",
    },
  ];

  const anglePerItem = 360 / features.length;
  const radius = 230;
  const center = 270; // 540 / 2

  const handleCenterClick = () => {
    setActiveIndex(null);
  };

  return (
    <section className="rot-pro-section flex justify-center">
   <SprintoReplica/>
    </section>
  );
};

const WhySafeSphere = () => {
  const pillars = [
    {
      title: "Reduce Risk & Compliance Burden",
      icon: <ShieldCheck size={24} />,
      desc: "Consolidate tools, automate evidence, and remove spreadsheet work from your security team.",
    },
    {
      title: "Accelerate Compliance Readiness",
      icon: <TrendingUp size={24} />,
      desc: "Pre-built templates and guided workflows shorten ISO and SOC 2 timelines from months to weeks.",
    },
    {
      title: "Cut Operational Costs",
      icon: <Zap size={24} />,
      desc: "Reuse evidence across frameworks and automate follow-ups to cut manual hours by up to 50%.",
    },
    {
      title: "Improve Security Posture",
      icon: <BarChart3 size={24} />,
      desc: "Risk scoring and continuous monitoring keep your posture live, not locked in last year's report.",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-header">
        <h2>Why SafeSphere</h2>
        <p>Four pillars designed for modern security and compliance teams.</p>
      </div>
      <div className="why-grid">
        {pillars.map((p, idx) => (
          <div key={p.title} className={`why-card why-card-${idx}`}>
            <div className="why-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ExtraFeaturesLongScroll = () => {
  const items = [
    {
      title: "Automated Evidence Collection",
      desc: "Connect cloud providers and ticketing tools to auto-pull screenshots, logs, and approvals.",
    },
    {
      title: "Framework Mapping (ISO ↔ NIST)",
      desc: "One control library mapped across frameworks so you never duplicate work.",
    },
    {
      title: "Role-Based Access Control",
      desc: "Give auditors, executives, and engineers tailored views without exposing sensitive data.",
    },
    {
      title: "Compliance Dashboards",
      desc: "See real-time coverage, residual risk, and exceptions in a single pane of glass.",
    },
    {
      title: "Audit Trail & Logs",
      desc: "Immutable timelines for every change, ready for regulators and internal reviews.",
    },
    {
      title: "Secure Cloud Architecture",
      desc: "Built for AWS with encryption, segmentation, and hardened services.",
    },
    {
      title: "AI-Driven Recommendations",
      desc: "Let SafeSphere surface next-best actions based on your controls and incidents.",
    },
  ];

  return (
    <section className="extra-section">
      <div className="extra-inner">
        <h2>Built for Enterprise-Grade Compliance</h2>
        <p>
          As you scroll, SafeSphere reveals everything your team needs – from
          evidence capture to AI insights.
        </p>
        <div className="extra-grid">
          {items.map((item, idx) => (
            <div key={item.title} className={`extra-card extra-card-${idx}`}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const tiles = [
  {
    label: "Risk Management",
    route: "/risk-assessment",
    description:
      "Identify, analyze, and mitigate organizational risks before they impact your business.",
    icon: <ShieldCheck className="w-12 h-12" />,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Documentation",
    route: "/documentation",
    description:
      "Maintain audit-ready documentation and ensure compliance with industry standards.",
    icon: <FileText className="w-12 h-12" />,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    label: "Gap Assessment",
    route: "/gap-assessment",
    description:
      "Evaluate compliance gaps and get actionable insights for your organization.",
    icon: <Activity className="w-12 h-12" />,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

const features = [
  {
    title: "Continuous Risk Monitoring",
    description:
      "Track vulnerabilities and security events in real-time across your entire infrastructure.",
    icon: "⚡",
  },
  {
    title: "Automated Compliance Checks",
    description:
      "Stay audit-ready with automated control mapping and evidence collection.",
    icon: "✓",
  },
  {
    title: "Intelligent Analytics",
    description:
      "AI-powered insights help you identify trends, predict risks, and make data-driven decisions.",
    icon: "📊",
  },
  {
    title: "Team Collaboration Hub",
    description:
      "Assign tasks, track progress, and collaborate seamlessly with your security team.",
    icon: "👥",
  },
  {
    title: "Custom Reporting",
    description:
      "Generate executive reports with actionable insights for stakeholders.",
    icon: "📄",
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Bank-level encryption and compliance with SOC 2, ISO 27001, and GDPR standards.",
    icon: "🔐",
  },
];

const benefits = [
  {
    title: "Reduce Risk Exposure",
    subtitle: "By up to 87% in the first year",
    icon: "🛡️",
  },
  {
    title: "Accelerate Compliance",
    subtitle: "Audit-ready in days, not months",
    icon: "⏱️",
  },
  {
    title: "Cut Operational Cost",
    subtitle: "50% reduction in manual compliance work",
    icon: "💰",
  },
  {
    title: "Improve Security Posture",
    subtitle: "Continuous monitoring & threat detection",
    icon: "🔒",
  },
];

const integrations = [
  { name: "AWS", logo: "☁️" },
  { name: "Azure", logo: "📘" },
  { name: "Google Cloud", logo: "🔵" },
  { name: "ServiceNow", logo: "🔧" },
  { name: "Okta", logo: "🔐" },
  { name: "Slack", logo: "💬" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CISO, Fortune 500 Tech",
    quote:
      "SafeSphere transformed our compliance process. We reduced audit time by 70%.",
    avatar: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "Risk Manager, Financial Services",
    quote:
      "The real-time monitoring capabilities are exceptional. We catch potential risks before they become issues.",
    avatar: "👨‍💼",
  },
  {
    name: "Emily Rodriguez",
    role: "Compliance Officer, Healthcare",
    quote:
      "SafeSphere made HIPAA compliance effortless. The automated checks save us countless hours.",
    avatar: "👩‍🔬",
  },
];

const faqs = [
  {
    question: "How long does it take to implement SafeSphere?",
    answer:
      "Most organizations are up and running within 2-4 weeks. Our onboarding team provides full support.",
  },
  {
    question: "Is SafeSphere compliant with industry standards?",
    answer:
      "Yes! SOC 2 Type II certified, ISO 27001 compliant, GDPR ready, and supports HIPAA, NIST, and CIS frameworks.",
  },
  {
    question: "Can SafeSphere integrate with our existing tools?",
    answer:
      "Absolutely. SafeSphere integrates with 100+ enterprise tools including AWS, Azure, ServiceNow, Okta, and Slack.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 enterprise support, dedicated account managers, and regular training sessions.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is based on the number of assets monitored and features used. Contact our sales team for a custom quote.",
  },
];

const Dashboard = () => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [counters, setCounters] = useState({
    companies: 0,
    risks: 0,
    compliance: 0,
  });

  useEffect(() => {
    let interval;
    if (counters.companies < 500) {
      interval = setInterval(() => {
        setCounters((prev) => ({
          ...prev,
          companies: Math.min(prev.companies + 10, 500),
          risks: Math.min(prev.risks + 100, 50000),
          compliance: Math.min(prev.compliance + 1, 99),
        }));
      }, 20);
    }
    return () => clearInterval(interval);
  }, [counters]);

  if (user) {
    return (
      <div className="dashboard-signed-in">
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-logo-section">
              <div className="dashboard-logo-icon">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="dashboard-logo-text">SAFESPHERE</h1>
                <p className="dashboard-logo-subtext">
                  Enterprise Risk & Compliance Platform
                </p>
              </div>
            </div>
            <div className="dashboard-user-card">
              <UserCircle2 className="text-indigo-600 w-5 h-5" />
              <div className="dashboard-user-info">
                <span className="dashboard-user-name">
                  {user.name || "User"}
                </span>
                <span className="dashboard-user-role">
                  {user.department?.name || "Consultant"}
                </span>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="dashboard-change-pwd-btn"
              >
                <Lock className="w-4 h-4" /> Change
              </button>
              {showChangePassword && (
                <ChangePasswordModal
                  onClose={() => setShowChangePassword(false)}
                />
              )}
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          <Hero3DEarth isLoggedIn={true} user={user} />
          <CoreCards />
          <SplitEarthSection />
          <RotatingFeatures />
          <WhySafeSphere />
          <ExtraFeaturesLongScroll />

          <section className="dashboard-tiles-section">
            <h3 className="dashboard-section-title">Core Modules</h3>
            <div className="dashboard-tiles-grid">
              {tiles.map(
                ({
                  label,
                  route,
                  description,
                  icon,
                  color,
                  bgColor,
                  iconColor,
                }) => (
                  <div
                    key={label}
                    className="dashboard-tile"
                    onClick={() => history.push(route)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") history.push(route);
                    }}
                  >
                    <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
                      <div className={`dashboard-tile-icon ${iconColor}`}>
                        {icon}
                      </div>
                    </div>
                    <h3 className="dashboard-tile-title">{label}</h3>
                    <p className="dashboard-tile-description">
                      {description}
                    </p>
                    <div
                      className={`dashboard-tile-accent bg-gradient-to-r ${color}`}
                    />
                  </div>
                )
              )}
            </div>
          </section>

         

          <section className="dashboard-features-section">
            <div className="dashboard-features-header">
              <h3 className="dashboard-section-title">Powerful Features</h3>
              <p className="dashboard-features-subtitle">
                Everything you need to manage risk and compliance at enterprise
                scale
              </p>
            </div>
            <div className="dashboard-features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="dashboard-feature-card">
                  <div className="dashboard-feature-icon">
                    {feature.icon}
                  </div>
                  <h4 className="dashboard-feature-title">
                    {feature.title}
                  </h4>
                  <p className="dashboard-feature-description">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-metrics-section">
            <h3 className="dashboard-section-title">Our Impact</h3>
            <div className="dashboard-metrics-grid">
              <div className="dashboard-metric-card">
                <div className="dashboard-metric-value">
                  {counters.companies}+
                </div>
                <div className="dashboard-metric-label">
                  Organizations Protected
                </div>
                <div className="dashboard-metric-bar">
                  <div
                    className="dashboard-metric-fill"
                    style={{
                      width: `${(counters.companies / 500) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="dashboard-metric-card">
                <div className="dashboard-metric-value">
                  {counters.risks.toLocaleString()}+
                </div>
                <div className="dashboard-metric-label">
                  Risks Identified & Mitigated
                </div>
                <div className="dashboard-metric-bar">
                  <div
                    className="dashboard-metric-fill"
                    style={{
                      width: `${(counters.risks / 50000) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="dashboard-metric-card">
                <div className="dashboard-metric-value">
                  {counters.compliance}%
                </div>
                <div className="dashboard-metric-label">
                  Average Compliance Improvement
                </div>
                <div className="dashboard-metric-bar">
                  <div
                    className="dashboard-metric-fill"
                    style={{ width: `${counters.compliance}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-video-section">
            <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
            <div className="dashboard-video-container">
              <div className="dashboard-video-placeholder">
                <Play className="w-16 h-16 text-white" />
                <p>Compliance Management Demo</p>
              </div>
              <div className="dashboard-video-description">
                <h4>Watch how SafeSphere streamlines compliance management</h4>
                <ul className="dashboard-video-points">
                  <li>✓ Real-time risk dashboard</li>
                  <li>✓ Automated compliance checks</li>
                  <li>✓ Custom report generation</li>
                  <li>✓ Team collaboration features</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="dashboard-integrations-section">
            <h3 className="dashboard-section-title">Integrations You Love</h3>
            <p className="dashboard-section-subtitle">
              SafeSphere works seamlessly with 100+ enterprise tools
            </p>
            <div className="dashboard-integrations-grid">
              {integrations.map((integration, idx) => (
                <div key={idx} className="dashboard-integration-card">
                  <div className="dashboard-integration-logo">
                    {integration.logo}
                  </div>
                  <div className="dashboard-integration-name">
                    {integration.name}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-testimonials-section">
            <h3 className="dashboard-section-title">
              What Our Customers Say
            </h3>
            <div className="dashboard-testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="dashboard-testimonial-card">
                  <div className="dashboard-testimonial-stars">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p className="dashboard-testimonial-quote">
                    "{testimonial.quote}"
                  </p>
                  <div className="dashboard-testimonial-author">
                    <div className="dashboard-testimonial-avatar">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="dashboard-testimonial-name">
                        {testimonial.name}
                      </div>
                      <div className="dashboard-testimonial-role">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-faq-section">
            <h3 className="dashboard-section-title">
              Frequently Asked Questions
            </h3>
            <div className="dashboard-faq-grid">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`dashboard-faq-item ${
                    expandedFaq === idx ? "expanded" : ""
                  }`}
                >
                  <button
                    className="dashboard-faq-question"
                    onClick={() =>
                      setExpandedFaq(
                        expandedFaq === idx ? null : idx
                      )
                    }
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  {expandedFaq === idx && (
                    <div className="dashboard-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-final-cta">
            <h3 className="dashboard-cta-title">
              Ready to Transform Your Compliance?
            </h3>
            <p className="dashboard-cta-subtitle">
              Join 500+ organizations managing risk smarter with SafeSphere
            </p>
            <div className="dashboard-cta-buttons">
              <button
                onClick={() => history.push("/risk-assessment")}
                className="dashboard-cta-primary"
              >
                Get Started
              </button>
            </div>
          </section>

          <section className="dashboard-trust-section">
            <h4 className="dashboard-trust-title">
              Enterprise-Grade Trust
            </h4>
            <p className="dashboard-trust-subtitle">
              Trusted by the world's leading security teams
            </p>
            <div className="dashboard-trust-badges">
              <span className="dashboard-trust-badge">
                🔐 SOC 2 Type II
              </span>
              <span className="dashboard-trust-badge">
                📋 ISO 27001
              </span>
              <span className="dashboard-trust-badge">
                🌍 GDPR Ready
              </span>
              <span className="dashboard-trust-badge">
                🏥 HIPAA Compliant
              </span>
              <span className="dashboard-trust-badge">
                🏛️ NIST Aligned
              </span>
              <span className="dashboard-trust-badge">
                ✅ CIS Frameworks
              </span>
            </div>
          </section>
        </main>

        <footer className="dashboard-footer">
          <div className="dashboard-footer-content">
            <div className="dashboard-footer-section">
              <h4>SafeSphere</h4>
              <p>Enterprise Risk & Compliance Management Platform</p>
            </div>
            <div className="dashboard-footer-section">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#">Risk Management</a>
                </li>
                <li>
                  <a href="#">Compliance</a>
                </li>
                <li>
                  <a href="#">Gap Assessment</a>
                </li>
              </ul>
            </div>
            <div className="dashboard-footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="dashboard-footer-section">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dashboard-footer-bottom">
            © {new Date().getFullYear()} SafeSphere · All rights reserved ·
            Made in India
          </div>
        </footer>
      </div>
    );
  }

  // guest (not logged in)
  return (
    <div className="dashboard-guest">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-logo-section">
            <div className="dashboard-logo-icon">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="dashboard-logo-text">SAFESPHERE</h1>
              <p className="dashboard-logo-subtext">
                Enterprise Risk & Compliance Platform
              </p>
            </div>
          </div>
          <button
            className="dashboard-login-btn"
            onClick={() => history.push("/login")}
          >
            <LogIn className="w-4 h-4" /> Login
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <Hero3DEarth isLoggedIn={false} user={null} />
        <CoreCards />
        <SplitEarthSection />
        <RotatingFeatures />
        <WhySafeSphere />
        <ExtraFeaturesLongScroll />

        <section className="dashboard-guest-modules">
          <h3 className="dashboard-section-title">Explore Key Modules</h3>
          <div className="dashboard-tiles-grid">
            {tiles.map(
              ({ label, description, icon, color, bgColor, iconColor }) => (
                <div
                  key={label}
                  className="dashboard-tile dashboard-tile-disabled"
                >
                  <div className={`dashboard-tile-icon-wrapper ${bgColor}`}>
                    <div className={`dashboard-tile-icon ${iconColor}`}>
                      {icon}
                    </div>
                  </div>
                  <h3 className="dashboard-tile-title">{label}</h3>
                  <p className="dashboard-tile-description">
                    {description}
                  </p>
                  <div
                    className={`dashboard-tile-accent bg-gradient-to-r ${color}`}
                  />
                </div>
              )
            )}
          </div>
        </section>


        <section className="dashboard-guest-features">
          <div className="dashboard-features-header">
            <h3 className="dashboard-section-title">Powerful Features</h3>
            <p className="dashboard-features-subtitle">
              Everything you need to manage risk and compliance at enterprise
              scale
            </p>
          </div>
          <div className="dashboard-features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="dashboard-feature-card">
                <div className="dashboard-feature-icon">
                  {feature.icon}
                </div>
                <h4 className="dashboard-feature-title">
                  {feature.title}
                </h4>
                <p className="dashboard-feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-metrics-section">
          <h3 className="dashboard-section-title">Our Impact</h3>
          <div className="dashboard-metrics-grid">
            <div className="dashboard-metric-card">
              <div className="dashboard-metric-value">
                {counters.companies}+
              </div>
              <div className="dashboard-metric-label">
                Organizations Protected
              </div>
              <div className="dashboard-metric-bar">
                <div
                  className="dashboard-metric-fill"
                  style={{
                    width: `${(counters.companies / 500) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="dashboard-metric-card">
              <div className="dashboard-metric-value">
                {counters.risks.toLocaleString()}+
              </div>
              <div className="dashboard-metric-label">
                Risks Identified & Mitigated
              </div>
              <div className="dashboard-metric-bar">
                <div
                  className="dashboard-metric-fill"
                  style={{
                    width: `${(counters.risks / 50000) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="dashboard-metric-card">
              <div className="dashboard-metric-value">
                {counters.compliance}%
              </div>
              <div className="dashboard-metric-label">
                Average Compliance Improvement
              </div>
              <div className="dashboard-metric-bar">
                <div
                  className="dashboard-metric-fill"
                  style={{ width: `${counters.compliance}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-video-section">
          <h3 className="dashboard-section-title">See SafeSphere in Action</h3>
          <div className="dashboard-video-container">
            <div className="dashboard-video-placeholder">
              <Play className="w-16 h-16 text-white" />
              <p>Compliance Management Demo</p>
            </div>
            <div className="dashboard-video-description">
              <h4>Watch how SafeSphere streamlines compliance management</h4>
              <ul className="dashboard-video-points">
                <li>✓ Real-time risk dashboard</li>
                <li>✓ Automated compliance checks</li>
                <li>✓ Custom report generation</li>
                <li>✓ Team collaboration features</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="dashboard-integrations-section">
          <h3 className="dashboard-section-title">Integrations You Love</h3>
          <p className="dashboard-section-subtitle">
            SafeSphere works seamlessly with 100+ enterprise tools
          </p>
          <div className="dashboard-integrations-grid">
            {integrations.map((integration, idx) => (
              <div key={idx} className="dashboard-integration-card">
                <div className="dashboard-integration-logo">
                  {integration.logo}
                </div>
                <div className="dashboard-integration-name">
                  {integration.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-testimonials-section">
          <h3 className="dashboard-section-title">What Our Customers Say</h3>
          <div className="dashboard-testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="dashboard-testimonial-card">
                <div className="dashboard-testimonial-stars">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="dashboard-testimonial-quote">
                  "{testimonial.quote}"
                </p>
                <div className="dashboard-testimonial-author">
                  <div className="dashboard-testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="dashboard-testimonial-name">
                      {testimonial.name}
                    </div>
                    <div className="dashboard-testimonial-role">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-faq-section">
          <h3 className="dashboard-section-title">
            Frequently Asked Questions
          </h3>
          <div className="dashboard-faq-grid">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`dashboard-faq-item ${
                  expandedFaq === idx ? "expanded" : ""
                }`}
              >
                <button
                  className="dashboard-faq-question"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                >
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                {expandedFaq === idx && (
                  <div className="dashboard-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-trust-section">
          <h4 className="dashboard-trust-title">Enterprise-Grade Trust</h4>
          <p className="dashboard-trust-subtitle">
            Trusted by the world's leading security teams
          </p>
          <div className="dashboard-trust-badges">
            <span className="dashboard-trust-badge">
              🔐 SOC 2 Type II
            </span>
            <span className="dashboard-trust-badge">
              📋 ISO 27001
            </span>
            <span className="dashboard-trust-badge">
              🌍 GDPR Ready
            </span>
            <span className="dashboard-trust-badge">
              🏥 HIPAA Compliant
            </span>
            <span className="dashboard-trust-badge">
              🏛️ NIST Aligned
            </span>
            <span className="dashboard-trust-badge">
              ✅ CIS Frameworks
            </span>
          </div>
        </section>

        <section className="dashboard-final-cta">
          <h3 className="dashboard-cta-title">
            Ready to Transform Your Compliance?
          </h3>
          <p className="dashboard-cta-subtitle">
            Join 500+ organizations managing risk smarter with SafeSphere
          </p>
          <button
            onClick={() => history.push("/login")}
            className="dashboard-cta-primary"
          >
            Get Started Today
          </button>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="dashboard-footer-content">
          <div className="dashboard-footer-section">
            <h4>SafeSphere</h4>
            <p>Enterprise Risk & Compliance Management Platform</p>
          </div>
          <div className="dashboard-footer-section">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Risk Management</a>
              </li>
              <li>
                <a href="#">Compliance</a>
              </li>
              <li>
                <a href="#">Gap Assessment</a>
              </li>
            </ul>
          </div>
          <div className="dashboard-footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div className="dashboard-footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-footer-bottom">
          © {new Date().getFullYear()} SafeSphere · All rights reserved · Made
          in India
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
