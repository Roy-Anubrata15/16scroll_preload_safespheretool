// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import "./loginPage.css";
// import Modal from "../../../components/navigations/Modal"; // ensure you have a reusable modal

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [forgotEmail, setForgotEmail] = useState("");

//   const [modal, setModal] = useState({ isOpen: false, title: "", message: "", onClose: null });

//   const history = useHistory();


//   const showModal = (title, message, onClose = null) => {
//     setModal({ isOpen: true, title, message, onClose });
//   };

//   const closeModal = () => {
//     if (modal.onClose) modal.onClose();
//     setModal({ ...modal, isOpen: false, onClose: null });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://safesphere.duckdns.org/user-service/api/users/login",
//         { email, password }
//       );

//       if (res.data.token) sessionStorage.setItem("token", res.data.token);
//       const { token, ...user } = res.data;
//       if (user && Object.keys(user).length > 0) {
//         sessionStorage.setItem("user", JSON.stringify(user));
//       }
//       console.log(user)
//       history.push("/");
//     } catch (err) {
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("user");
//       showModal("Login Failed", err.response?.data?.error || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = () => {
//     showModal("Registration Info", "Please contact admin - 123-456-7890");
//   };

//   const handleForgotPassword = () => {
//     setShowForgotPassword(true);
//     setOtpSent(false);
//     setForgotEmail("");
//     setOtp("");
//   };

//   const sendOtp = async () => {
//     if (!forgotEmail) return showModal("Error", "Please enter your email");
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/forgot-password",
//         { email: forgotEmail },
//         { withCredentials: true }
//       );
//       setOtpSent(true);
//       showModal("Success", "OTP sent to your email!");
//     } catch (err) {
//       showModal("Error", err.response?.data?.error || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) return showModal("Error", "Please enter OTP");
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/verify-otp",
//         { email: forgotEmail, otp },
//         { withCredentials: true }
//       );
//       showModal("Success", "OTP verified! Redirecting to Change Password...", () =>
//         history.push("/change-password?email=" + encodeURIComponent(forgotEmail))
//       );
//     } catch (err) {
//       showModal("Error", err.response?.data?.error || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1 className="login-title">SAFESPHERE Login</h1>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleLogin} className="login-form">
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={loading}
//             autoComplete="username"
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={loading}
//             autoComplete="current-password"
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="login-extra">
//           <button
//             type="button"
//             className="forgot-password-btn"
//             onClick={handleForgotPassword}
//             disabled={loading}
//           >
//             Forgot Password?
//           </button>

//           <button
//             type="button"
//             className="register-btn"
//             onClick={handleRegister}
//             disabled={loading}
//           >
//             Register
//           </button>
//         </div>

//         {showForgotPassword && (
//           <div className="forgot-password-modal">
//             <h3>Forgot Password</h3>
//             {!otpSent ? (
//               <>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   disabled={loading}
//                 />
//                 <button onClick={sendOtp} disabled={loading}>
//                   {loading ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   disabled={loading}
//                 />
//                 <button onClick={verifyOtp} disabled={loading}>
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modal.isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             backgroundColor: "rgba(0,0,0,0.45)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1500,
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               borderRadius: 8,
//               padding: 24,
//               maxWidth: 400,
//               width: "100%",
//               textAlign: "center",
//             }}
//           >
//             <h3 style={{ marginBottom: 12 }}>{modal.title}</h3>
//             <p style={{ marginBottom: 20 }}>{modal.message}</p>
//             <button
//               onClick={closeModal}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: 6,
//                 border: "none",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginPage;





// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import "./loginPage.css";
// import HamburgerMenu from "../../../components/navigations/HamburgerMenu";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [forgotEmail, setForgotEmail] = useState("");

//   const [infoModal, setInfoModal] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//   });

//   const [signupModalOpen, setSignupModalOpen] = useState(false);

//   const history = useHistory();

//   const openInfoModal = (title, message) => {
//     setInfoModal({ isOpen: true, title, message });
//   };

//   const closeInfoModal = () => {
//     setInfoModal({ ...infoModal, isOpen: false });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://safesphere.duckdns.org/user-service/api/users/login",
//         { email, password }
//       );

//       if (res.data.token) sessionStorage.setItem("token", res.data.token);
//       const { token, ...user } = res.data;
//       if (user && Object.keys(user).length > 0) {
//         sessionStorage.setItem("user", JSON.stringify(user));
//       }

//       history.push("/");
//     } catch (err) {
//       sessionStorage.removeItem("token");
//       sessionStorage.removeItem("user");
//       setError(err.response?.data?.error || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPasswordClick = () => {
//     setShowForgotPassword((prev) => !prev);
//     setOtpSent(false);
//     setForgotEmail("");
//     setOtp("");
//   };

//   const sendOtp = async () => {
//     if (!forgotEmail) {
//       openInfoModal("Error", "Please enter your email address.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/forgot-password",
//         { email: forgotEmail },
//         { withCredentials: true }
//       );
//       setOtpSent(true);
//       openInfoModal("Success", "OTP sent to your email. Check your inbox.");
//     } catch (err) {
//       openInfoModal(
//         "Error",
//         err.response?.data?.error || "Failed to send OTP. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) {
//       openInfoModal("Error", "Please enter the OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/verify-otp",
//         { email: forgotEmail, otp },
//         { withCredentials: true }
//       );
//       openInfoModal(
//         "Success",
//         "OTP verified successfully! Redirecting to change password..."
//       );
//       setTimeout(() => {
//         history.push(
//           "/change-password?email=" + encodeURIComponent(forgotEmail)
//         );
//       }, 1500);
//     } catch (err) {
//       openInfoModal(
//         "Error",
//         err.response?.data?.error || "Invalid OTP. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openSignupInfo = () => {
//     setSignupModalOpen(true);
//   };

//   const closeSignupInfo = () => {
//     setSignupModalOpen(false);
//   };

//   const handleStaticLink = (path) => {
//     history.push(path);
//   };

//   return (
//     <div className="auth-page-wrapper">
//       {/* Hamburger Menu */}
//       <HamburgerMenu />

//       <div className="auth-page">
//         {/* LEFT COLUMN – LOGIN FORM */}
//         <div className="auth-left">
//           <div className="auth-left-inner">
//             {/* Brand / Logo */}
//             <div className="auth-brand">
//               <div className="auth-logo-circle">S</div>
//               <div className="auth-brand-text">
//                 <span className="auth-brand-name">SafeSphere</span>
//                 <span className="auth-brand-tagline">
//                   Secure your business with confidence
//                 </span>
//               </div>
//             </div>

//             <h1 className="auth-heading">Welcome back!</h1>
//             <p className="auth-subheading">
//               Sign in with your work email to access SafeSphere risk, compliance,
//               and documentation tools.
//             </p>

//             {error && <div className="auth-error">{error}</div>}

//             <form className="auth-form" onSubmit={handleLogin}>
//               <label className="auth-label" htmlFor="email">
//                 Work email address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={loading}
//                 autoComplete="username"
//                 className="auth-input"
//               />

//               <label className="auth-label" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={loading}
//                 autoComplete="current-password"
//                 className="auth-input"
//               />

//               <div className="auth-remember-row">
//                 <label className="auth-remember">
//                   <input
//                     type="checkbox"
//                     disabled={loading}
//                     className="auth-remember-checkbox"
//                   />
//                   <span>Remember me</span>
//                 </label>

//                 <button
//                   type="button"
//                   className="auth-link-button"
//                   onClick={handleForgotPasswordClick}
//                   disabled={loading}
//                 >
//                   {showForgotPassword ? "Hide reset options" : "Forgot password?"}
//                 </button>
//               </div>

//               <button type="submit" className="auth-submit" disabled={loading}>
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </form>

//             {/* Forgot password / OTP block */}
//             {showForgotPassword && (
//               <div className="forgot-block">
//                 <h3 className="forgot-title">Reset your password</h3>
//                 {!otpSent ? (
//                   <>
//                     <input
//                       type="email"
//                       placeholder="Enter your work email"
//                       value={forgotEmail}
//                       onChange={(e) => setForgotEmail(e.target.value)}
//                       disabled={loading}
//                       className="auth-input"
//                     />
//                     <button
//                       onClick={sendOtp}
//                       disabled={loading}
//                       className="auth-secondary-btn"
//                     >
//                       {loading ? "Sending OTP..." : "Send OTP"}
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Enter OTP from your email"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       disabled={loading}
//                       className="auth-input"
//                     />
//                     <button
//                       onClick={verifyOtp}
//                       disabled={loading}
//                       className="auth-secondary-btn"
//                     >
//                       {loading ? "Verifying..." : "Verify OTP"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Sign up prompt */}
//             <div className="auth-signup-row">
//               <span>New to SafeSphere?</span>
//               <button
//                 type="button"
//                 className="auth-link-button"
//                 onClick={openSignupInfo}
//               >
//                 Create account
//               </button>
//             </div>

//             {/* Footer links under form */}
//             <div className="auth-footer-links">
//               <button
//                 type="button"
//                 className="auth-footer-link"
//                 onClick={() => handleStaticLink("/terms-of-service")}
//               >
//                 Terms of service
//               </button>
//               <span className="auth-footer-separator">|</span>
//               <button
//                 type="button"
//                 className="auth-footer-link"
//                 onClick={() => handleStaticLink("/privacy-policy")}
//               >
//                 Privacy policy
//               </button>
//               <span className="auth-footer-separator">|</span>
//               <button
//                 type="button"
//                 className="auth-footer-link"
//                 onClick={() => handleStaticLink("/contact")}
//               >
//                 Contact
//               </button>
//             </div>

//             <div className="auth-footer-copy">
//               © SafeSphere 2025. All Rights Reserved.
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN – MARKETING PANEL */}
//         <div className="auth-right">
//           <div className="auth-right-overlay" />
//           <div className="auth-right-content">
//             <div className="auth-right-badge">#1 Compliance Automation Tool</div>
//             <h2 className="auth-right-title">Stay one step ahead of risk.</h2>
//             <p className="auth-right-text">
//               SafeSphere helps security and compliance teams monitor risk in
//               real-time, automate checks, and keep every audit-ready report in
//               one secure place.
//             </p>

//             <div className="auth-features-grid">
//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Continuous</span>
//                 <span className="auth-feature-title">Risk monitoring</span>
//                 <p className="auth-feature-desc">
//                   Track vulnerabilities, controls, and incidents across your
//                   organization from a single dashboard.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Automated</span>
//                 <span className="auth-feature-title">Compliance checks</span>
//                 <p className="auth-feature-desc">
//                   Map your controls to frameworks and generate evidence for
//                   audits in just a few clicks.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Real-time</span>
//                 <span className="auth-feature-title">Threat detection</span>
//                 <p className="auth-feature-desc">
//                   Get notified about critical events before they turn into
//                   business-impacting incidents.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Team</span>
//                 <span className="auth-feature-title">Collaboration</span>
//                 <p className="auth-feature-desc">
//                   Assign owners, share context, and close gaps faster with your
//                   risk and compliance teams.
//                 </p>
//               </div>
//             </div>

//             <div className="auth-trust-text">
//               Trusted by security teams, risk managers, and compliance leaders.
//             </div>
//           </div>
//         </div>

//         {/* INFO MODAL (errors, OTP info) */}
//         {infoModal.isOpen && (
//           <div className="auth-modal-backdrop">
//             <div className="auth-modal">
//               <h3 className="auth-modal-title">{infoModal.title}</h3>
//               <p className="auth-modal-message">{infoModal.message}</p>
//               <button className="auth-modal-btn" onClick={closeInfoModal}>
//                 OK
//               </button>
//             </div>
//           </div>
//         )}

//         {/* SIGNUP INFO MODAL */}
//         {signupModalOpen && (
//           <div className="auth-modal-backdrop">
//             <div className="auth-modal">
//               <h3 className="auth-modal-title">Create your SafeSphere account</h3>
//               <p className="auth-modal-message">
//                 To create a new SafeSphere account, please contact your system
//                 administrator or SafeSphere support. Your organization controls
//                 who can access this workspace.
//               </p>
//               <button className="auth-modal-btn" onClick={closeSignupInfo}>
//                 Got it
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;












// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import "./loginPage.css";
// import HamburgerMenu from "../../../components/navigations/HamburgerMenu";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [region, setRegion] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [forgotEmail, setForgotEmail] = useState("");

//   const [infoModal, setInfoModal] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//   });

//   const [signupModalOpen, setSignupModalOpen] = useState(false);

//   const history = useHistory();

//   const openInfoModal = (title, message) => {
//     setInfoModal({ isOpen: true, title, message });
//   };

//   const closeInfoModal = () => {
//     setInfoModal({ ...infoModal, isOpen: false });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password || !region) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://safesphere.duckdns.org/user-service/api/users/login",
//         { email, password, region }
//       );

//       if (res.data.token) sessionStorage.setItem("token", res.data.token);
//       const { token, ...user } = res.data;
//       if (user) sessionStorage.setItem("user", JSON.stringify(user));

//       history.push("/");
//     } catch (err) {
//       sessionStorage.clear();
//       setError(err.response?.data?.error || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPasswordClick = () => {
//     setShowForgotPassword((prev) => !prev);
//     setOtpSent(false);
//     setForgotEmail("");
//     setOtp("");
//   };

//   const sendOtp = async () => {
//     if (!forgotEmail) {
//       openInfoModal("Error", "Please enter your email address.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/forgot-password",
//         { email: forgotEmail },
//         { withCredentials: true }
//       );
//       setOtpSent(true);
//       openInfoModal("Success", "OTP sent to your email.");
//     } catch (err) {
//       openInfoModal(
//         "Error",
//         err.response?.data?.error || "Failed to send OTP."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) {
//       openInfoModal("Error", "Please enter the OTP.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(
//         "https://cftoolbackend.duckdns.org/api/users/verify-otp",
//         { email: forgotEmail, otp },
//         { withCredentials: true }
//       );
//       openInfoModal("Success", "OTP verified. Redirecting...");
//       setTimeout(() => {
//         history.push(
//           "/change-password?email=" + encodeURIComponent(forgotEmail)
//         );
//       }, 1500);
//     } catch (err) {
//       openInfoModal(
//         "Error",
//         err.response?.data?.error || "Invalid OTP."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page-wrapper">
//       <HamburgerMenu />

//       <div className="auth-page">
//         {/* LEFT COLUMN */}
//         <div className="auth-left">
//           <div className="auth-left-inner">
//             <div className="auth-brand">
//               <div className="auth-logo-circle">S</div>
//               <div className="auth-brand-text">
//                 <span className="auth-brand-name">SafeSphere</span>
//                 <span className="auth-brand-tagline">
//                   Secure your business with confidence
//                 </span>
//               </div>
//             </div>

//             <h1 className="auth-heading">Welcome back!</h1>
//             <p className="auth-subheading">
//               Sign in with your work email to access SafeSphere risk, compliance,
//               and documentation tools.
//             </p>

//             {error && <div className="auth-error">{error}</div>}

//             <form className="auth-form" onSubmit={handleLogin}>
//               <label className="auth-label" htmlFor="email">
//                 Work email address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={loading}
//                 autoComplete="username"
//                 className="auth-input"
//               />

//               {/* ✅ REGION FIELD (DROPDOWN + TYPE + SCROLL) */}
//               <label className="auth-label" htmlFor="region">
//                 Region
//               </label>
//               <input
//                 id="region"
//                 type="text"
//                 list="region-list"
//                 placeholder="Select or type your region"
//                 value={region}
//                 onChange={(e) => setRegion(e.target.value)}
//                 required
//                 disabled={loading}
//                 className="auth-input"
//               />

//               <datalist id="region-list">
//                 <option value="Asia" />
//                 <option value="Africa" />
//                 <option value="Europe" />
//                 <option value="North America" />
//                 <option value="South America" />
//                 <option value="Australia" />
//                 <option value="Antarctica" />
//                 <option value="Middle East" />
//                 <option value="Central America" />
//                 <option value="Caribbean" />
//               </datalist>

//               <label className="auth-label" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={loading}
//                 autoComplete="current-password"
//                 className="auth-input"
//               />

//               <div className="auth-remember-row">
//                 <label className="auth-remember">
//                   <input type="checkbox" disabled={loading} />
//                   <span>Remember me</span>
//                 </label>

//                 <button
//                   type="button"
//                   className="auth-link-button"
//                   onClick={handleForgotPasswordClick}
//                   disabled={loading}
//                 >
//                   {showForgotPassword ? "Hide reset options" : "Forgot password?"}
//                 </button>
//               </div>

//               <button type="submit" className="auth-submit" disabled={loading}>
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </form>

//             {/* Forgot password block */}
//             {showForgotPassword && (
//               <div className="forgot-block">
//                 {!otpSent ? (
//                   <>
//                     <input
//                       type="email"
//                       placeholder="Enter your work email"
//                       value={forgotEmail}
//                       onChange={(e) => setForgotEmail(e.target.value)}
//                       disabled={loading}
//                       className="auth-input"
//                     />
//                     <button
//                       onClick={sendOtp}
//                       disabled={loading}
//                       className="auth-secondary-btn"
//                     >
//                       Send OTP
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Enter OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       disabled={loading}
//                       className="auth-input"
//                     />
//                     <button
//                       onClick={verifyOtp}
//                       disabled={loading}
//                       className="auth-secondary-btn"
//                     >
//                       Verify OTP
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}

//             <div className="auth-footer-copy">
//               © SafeSphere 2025. All Rights Reserved.
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN — UNCHANGED */}
//         <div className="auth-right">
//           <div className="auth-right-overlay" />
//           <div className="auth-right-content">
//             <div className="auth-right-badge">#1 Compliance Automation Tool</div>
//             <h2 className="auth-right-title">Stay one step ahead of risk.</h2>
//             <p className="auth-right-text">
//               SafeSphere helps security and compliance teams monitor risk in
//               real-time, automate checks, and keep every audit-ready report in
//               one secure place.
//             </p>

//             <div className="auth-features-grid">
//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Continuous</span>
//                 <span className="auth-feature-title">Risk monitoring</span>
//                 <p className="auth-feature-desc">
//                   Track vulnerabilities, controls, and incidents across your
//                   organization.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Automated</span>
//                 <span className="auth-feature-title">Compliance checks</span>
//                 <p className="auth-feature-desc">
//                   Generate audit evidence in just a few clicks.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Real-time</span>
//                 <span className="auth-feature-title">Threat detection</span>
//                 <p className="auth-feature-desc">
//                   Get notified before incidents impact your business.
//                 </p>
//               </div>

//               <div className="auth-feature-card">
//                 <span className="auth-feature-label">Team</span>
//                 <span className="auth-feature-title">Collaboration</span>
//                 <p className="auth-feature-desc">
//                   Assign owners and close gaps faster.
//                 </p>
//               </div>
//             </div>

//             <div className="auth-trust-text">
//               Trusted by security teams worldwide.
//             </div>
//           </div>
//         </div>

//         {/* INFO MODAL */}
//         {infoModal.isOpen && (
//           <div className="auth-modal-backdrop">
//             <div className="auth-modal">
//               <h3 className="auth-modal-title">{infoModal.title}</h3>
//               <p className="auth-modal-message">{infoModal.message}</p>
//               <button className="auth-modal-btn" onClick={closeInfoModal}>
//                 OK
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;









import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";
import HamburgerMenu from "../../../components/navigations/HamburgerMenu";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const history = useHistory();

  const openInfoModal = (title, message) => {
    setInfoModal({ isOpen: true, title, message });
  };

  const closeInfoModal = () => {
    setInfoModal({ ...infoModal, isOpen: false });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !region) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://safesphere.duckdns.org/user-service/api/users/login",
        { email, password, region }
      );

      if (res.data.token) sessionStorage.setItem("token", res.data.token);
      const { token, ...user } = res.data;
      if (user) sessionStorage.setItem("user", JSON.stringify(user));

      history.push("/");
    } catch (err) {
      sessionStorage.clear();
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword((prev) => !prev);
    setOtpSent(false);
    setForgotEmail("");
    setOtp("");
  };

  const sendOtp = async () => {
    if (!forgotEmail) {
      openInfoModal("Error", "Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://cftoolbackend.duckdns.org/api/users/forgot-password",
        { email: forgotEmail },
        { withCredentials: true }
      );
      setOtpSent(true);
      openInfoModal("Success", "OTP sent to your email.");
    } catch (err) {
      openInfoModal(
        "Error",
        err.response?.data?.error || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      openInfoModal("Error", "Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://cftoolbackend.duckdns.org/api/users/verify-otp",
        { email: forgotEmail, otp },
        { withCredentials: true }
      );
      openInfoModal("Success", "OTP verified. Redirecting...");
      setTimeout(() => {
        history.push(
          "/change-password?email=" + encodeURIComponent(forgotEmail)
        );
      }, 1500);
    } catch (err) {
      openInfoModal(
        "Error",
        err.response?.data?.error || "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* PERFECT HEADER - EXACT DemoPage style */}
      <header className="login-header">
        <div className="login-logo">SafeSphere</div>
        <nav className="login-nav">
          <button onClick={() => history.push("/")} className="login-nav-link">
            Home
          </button>
          <button onClick={() => history.push("/demo")} className="login-nav-link-demo">
            Schedule Demo
          </button>
        </nav>
      </header>

      <main className="login-main">
        {/* LEFT - LOGIN FORM WITH ORBIT */}
        <section className="login-left">
          <div className="login-left-inner">
            <div className="login-pulse-icon" />
            
            <div className="login-content">
              <h1 className="login-title">Welcome back!</h1>
              <p className="login-subtitle">
                Sign in with your work email to access SafeSphere risk, compliance,
                and documentation tools.
              </p>

              {error && <div className="login-error">{error}</div>}

              <form className="login-form" onSubmit={handleLogin}>
                <div className="login-field-group">
                  <label className="login-label">
                    Work email <span>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="username"
                    className="login-input"
                  />
                </div>

                <div className="login-field-group">
                  <label className="login-label">
                    Region <span>*</span>
                  </label>
                  <input
                    type="text"
                    list="region-list"
                    placeholder="Select or type your region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                    disabled={loading}
                    className="login-input"
                  />
                </div>

                <datalist id="region-list">
                  <option value="Asia" />
                  <option value="Africa" />
                  <option value="Europe" />
                  <option value="North America" />
                  <option value="South America" />
                  <option value="Australia" />
                  <option value="Antarctica" />
                  <option value="Middle East" />
                  <option value="Central America" />
                  <option value="Caribbean" />
                </datalist>

                <div className="login-field-group">
                  <label className="login-label">
                    Password <span>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className="login-input"
                  />
                </div>

                <div className="login-remember-row">
                  <label className="login-remember">
                    <input type="checkbox" disabled={loading} />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="login-forgot-btn"
                    onClick={handleForgotPasswordClick}
                    disabled={loading}
                  >
                    {showForgotPassword ? "Hide reset options" : "Forgot password?"}
                  </button>
                </div>

                <button type="submit" className="login-submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {showForgotPassword && (
                <div className="login-forgot-block">
                  {!otpSent ? (
                    <>
                      <input
                        type="email"
                        placeholder="Enter your work email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        disabled={loading}
                        className="login-input"
                      />
                      <button onClick={sendOtp} disabled={loading} className="login-otp-btn">
                        Send OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                        className="login-input"
                      />
                      <button onClick={verifyOtp} disabled={loading} className="login-otp-btn">
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* ✅ YOUR ORIGINAL SIGNUP PROMPT */}
              <div className="login-signup-row">
                <span>New to SafeSphere?</span>
                <button 
                  type="button" 
                  className="login-signup-btn"
                  onClick={() =>   openInfoModal(
      "Account Creation Disabled",
      "Account creation is managed by your organization. Please contact your system administrator or IT team to get access to SafeSphere."
    )
  }
>
                  Create account
                </button>
              </div>

              {/* ✅ YOUR ORIGINAL FOOTER LINKS */}
              <div className="login-footer-links">
                <button className="login-footer-link">Terms of Service</button>
                <span className="login-footer-separator">|</span>
                <button className="login-footer-link">Privacy Policy</button>
                <span className="login-footer-separator">|</span>
                <button className="login-footer-link">Contact</button>
              </div>

              {/* ✅ YOUR ORIGINAL COPYRIGHT */}
              <div className="login-footer-copy">
                © SafeSphere 2025. All Rights Reserved.
              </div>
            </div>
          </div>

          {/* LEFT ORBIT EFFECT */}
          <div className="login-orbit-left">
            <div className="login-orbit-sphere" />
            <div className="login-orbit-ring" />
          </div>
        </section>

        {/* RIGHT - MARKETING WITH ORBIT */}
        <section className="login-right">
          <div className="login-right-inner">
            <div className="login-badge">#1 Compliance Automation Tool</div>
            <h2 className="login-right-title">Stay one step ahead of risk.</h2>
            <p className="login-right-text">
              SafeSphere helps security and compliance teams monitor risk in
              real-time, automate checks, and keep every audit-ready report in
              one secure place.
            </p>

            <div className="login-features">
              <div className="login-feature">
                <span className="login-feature-label">Continuous</span>
                <span className="login-feature-title">Risk monitoring</span>
                <p>Track vulnerabilities across your organization.</p>
              </div>
              <div className="login-feature">
                <span className="login-feature-label">Automated</span>
                <span className="login-feature-title">Compliance checks</span>
                <p>Generate audit evidence in just a few clicks.</p>
              </div>
              <div className="login-feature">
                <span className="login-feature-label">Real-time</span>
                <span className="login-feature-title">Threat detection</span>
                <p>Get notified before incidents impact business.</p>
              </div>
              <div className="login-feature">
                <span className="login-feature-label">Team</span>
                <span className="login-feature-title">Collaboration</span>
                <p>Assign owners and close gaps faster.</p>
              </div>
            </div>

            <div className="login-trust">Trusted by security teams worldwide.</div>
          </div>

          {/* RIGHT ORBIT EFFECT */}
          <div className="login-orbit-right">
            <div className="login-orbit-sphere-right" />
            <div className="login-orbit-ring-right" />
          </div>
        </section>
      </main>

      {/* INFO MODAL */}
      {infoModal.isOpen && (
        <div className="login-modal-backdrop">
          <div className="login-modal">
            <h3 className="login-modal-title">{infoModal.title}</h3>
            <p className="login-modal-message">{infoModal.message}</p>
            <button className="login-modal-btn" onClick={closeInfoModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

