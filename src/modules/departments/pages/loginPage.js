import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./loginPage.css";
import HamburgerMenu from "../../../components/navigations/HamburgerMenu";

const LoginPage = () => {
  const [email, setEmail] = useState("");
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
    setLoading(true);

    try {
      const res = await axios.post(
        "https://safesphere.duckdns.org/user-service/api/users/login",
        { email, password }
      );

      if (res.data.token) sessionStorage.setItem("token", res.data.token);
      const { token, ...user } = res.data;
      if (user && Object.keys(user).length > 0) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      history.push("/");
    } catch (err) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
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
      openInfoModal("Success", "OTP sent to your email. Check your inbox.");
    } catch (err) {
      openInfoModal(
        "Error",
        err.response?.data?.error || "Failed to send OTP. Please try again."
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
      openInfoModal(
        "Success",
        "OTP verified successfully! Redirecting to change password..."
      );
      setTimeout(() => {
        history.push(
          "/change-password?email=" + encodeURIComponent(forgotEmail)
        );
      }, 1500);
    } catch (err) {
      openInfoModal(
        "Error",
        err.response?.data?.error || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openSignupInfo = () => {
    setSignupModalOpen(true);
  };

  const closeSignupInfo = () => {
    setSignupModalOpen(false);
  };

  const handleStaticLink = (path) => {
    history.push(path);
  };

  return (
    <div className="auth-page-wrapper">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      <div className="auth-page">
        {/* LEFT COLUMN – LOGIN FORM */}
        <div className="auth-left">
          <div className="auth-left-inner">
            {/* Brand / Logo */}
            <div className="auth-brand">
              <div className="auth-logo-circle">S</div>
              <div className="auth-brand-text">
                <span className="auth-brand-name">SafeSphere</span>
                <span className="auth-brand-tagline">
                  Secure your business with confidence
                </span>
              </div>
            </div>

            <h1 className="auth-heading">Welcome back!</h1>
            <p className="auth-subheading">
              Sign in with your work email to access SafeSphere risk, compliance,
              and documentation tools.
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form className="auth-form" onSubmit={handleLogin}>
              <label className="auth-label" htmlFor="email">
                Work email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="username"
                className="auth-input"
              />

              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
                className="auth-input"
              />

              <div className="auth-remember-row">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    disabled={loading}
                    className="auth-remember-checkbox"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="auth-link-button"
                  onClick={handleForgotPasswordClick}
                  disabled={loading}
                >
                  {showForgotPassword ? "Hide reset options" : "Forgot password?"}
                </button>
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Forgot password / OTP block */}
            {showForgotPassword && (
              <div className="forgot-block">
                <h3 className="forgot-title">Reset your password</h3>
                {!otpSent ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your work email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      disabled={loading}
                      className="auth-input"
                    />
                    <button
                      onClick={sendOtp}
                      disabled={loading}
                      className="auth-secondary-btn"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter OTP from your email"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                      className="auth-input"
                    />
                    <button
                      onClick={verifyOtp}
                      disabled={loading}
                      className="auth-secondary-btn"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Sign up prompt */}
            <div className="auth-signup-row">
              <span>New to SafeSphere?</span>
              <button
                type="button"
                className="auth-link-button"
                onClick={openSignupInfo}
              >
                Create account
              </button>
            </div>

            {/* Footer links under form */}
            <div className="auth-footer-links">
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => handleStaticLink("/terms-of-service")}
              >
                Terms of service
              </button>
              <span className="auth-footer-separator">|</span>
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => handleStaticLink("/privacy-policy")}
              >
                Privacy policy
              </button>
              <span className="auth-footer-separator">|</span>
              <button
                type="button"
                className="auth-footer-link"
                onClick={() => handleStaticLink("/contact")}
              >
                Contact
              </button>
            </div>

            <div className="auth-footer-copy">
              © SafeSphere 2025. All Rights Reserved.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – MARKETING PANEL */}
        <div className="auth-right">
          <div className="auth-right-overlay" />
          <div className="auth-right-content">
            <div className="auth-right-badge">#1 Compliance Automation Tool</div>
            <h2 className="auth-right-title">Stay one step ahead of risk.</h2>
            <p className="auth-right-text">
              SafeSphere helps security and compliance teams monitor risk in
              real-time, automate checks, and keep every audit-ready report in
              one secure place.
            </p>

            <div className="auth-features-grid">
              <div className="auth-feature-card">
                <span className="auth-feature-label">Continuous</span>
                <span className="auth-feature-title">Risk monitoring</span>
                <p className="auth-feature-desc">
                  Track vulnerabilities, controls, and incidents across your
                  organization from a single dashboard.
                </p>
              </div>

              <div className="auth-feature-card">
                <span className="auth-feature-label">Automated</span>
                <span className="auth-feature-title">Compliance checks</span>
                <p className="auth-feature-desc">
                  Map your controls to frameworks and generate evidence for
                  audits in just a few clicks.
                </p>
              </div>

              <div className="auth-feature-card">
                <span className="auth-feature-label">Real-time</span>
                <span className="auth-feature-title">Threat detection</span>
                <p className="auth-feature-desc">
                  Get notified about critical events before they turn into
                  business-impacting incidents.
                </p>
              </div>

              <div className="auth-feature-card">
                <span className="auth-feature-label">Team</span>
                <span className="auth-feature-title">Collaboration</span>
                <p className="auth-feature-desc">
                  Assign owners, share context, and close gaps faster with your
                  risk and compliance teams.
                </p>
              </div>
            </div>

            <div className="auth-trust-text">
              Trusted by security teams, risk managers, and compliance leaders.
            </div>
          </div>
        </div>

        {/* INFO MODAL (errors, OTP info) */}
        {infoModal.isOpen && (
          <div className="auth-modal-backdrop">
            <div className="auth-modal">
              <h3 className="auth-modal-title">{infoModal.title}</h3>
              <p className="auth-modal-message">{infoModal.message}</p>
              <button className="auth-modal-btn" onClick={closeInfoModal}>
                OK
              </button>
            </div>
          </div>
        )}

        {/* SIGNUP INFO MODAL */}
        {signupModalOpen && (
          <div className="auth-modal-backdrop">
            <div className="auth-modal">
              <h3 className="auth-modal-title">Create your SafeSphere account</h3>
              <p className="auth-modal-message">
                To create a new SafeSphere account, please contact your system
                administrator or SafeSphere support. Your organization controls
                who can access this workspace.
              </p>
              <button className="auth-modal-btn" onClick={closeSignupInfo}>
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
