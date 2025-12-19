// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import "./DemoPage.css";

// const DemoPage = () => {
//   const history = useHistory();
//   const [form, setForm] = useState({
//     email: "",
//     organization: "",
//     employees: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.organization || !form.employees) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     // optional: simple email check
//     if (!form.email.includes("@")) {
//       setError("Please enter a valid work email.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       // TODO: call your backend demo-request API
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       // after submit you can redirect or show a message
//       alert("Thanks! Our team will contact you shortly.");
//       history.push("/login");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="demo-page">
//       <header className="demo-header">
//         <div className="demo-logo">SafeSphere</div>
//         <nav className="demo-nav">
//           <button onClick={() => history.push("/")} className="demo-nav-link">
//             Home
//           </button>
//           <button onClick={() => history.push("/login")} className="demo-nav-link">
//             Login
//           </button>
//         </nav>
//       </header>

//       <main className="demo-main">
//         <section className="demo-left">
//           <div className="demo-left-inner">
//             <div className="demo-pulse-icon" />
//             <h1 className="demo-title">
//               Schedule
//               <br />
//               a Live Demo
//             </h1>
//             <p className="demo-subtitle">
//               See how SafeSphere unifies risk, documentation, and compliance
//               into a single 3D command center for your security team.
//             </p>

//             <div className="demo-highlights">
//               <span>• Guided walkthrough of your use case</span>
//               <span>• Real-time dashboards & risk scoring</span>
//               <span>• ISO 27001, SOC 2, and NIST mapping</span>
//             </div>

//             <div className="demo-orbit">
//               <div className="demo-orbit-sphere" />
//               <div className="demo-orbit-ring" />
//             </div>
//           </div>
//         </section>

//         <section className="demo-right">
//           <div className="demo-form-card">
//             <h2 className="demo-form-title">Tell us about your team</h2>
//             <p className="demo-form-subtitle">
//               Share a few details and we will match you with a product expert.
//             </p>

//             {error && <div className="demo-error">{error}</div>}

//             <form onSubmit={handleSubmit} className="demo-form">
//               <div className="demo-field-group">
//                 <label className="demo-label">
//                   Work email <span>*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="demo-input"
//                   placeholder="you@company.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="demo-field-group">
//                 <label className="demo-label">
//                   Organization <span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="organization"
//                   className="demo-input"
//                   placeholder="Company or institution"
//                   value={form.organization}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="demo-field-group">
//                 <label className="demo-label">
//                   Number of employees <span>*</span>
//                 </label>
//                 <select
//                   name="employees"
//                   className="demo-input demo-select"
//                   value={form.employees}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a range</option>
//                   <option value="1-50">1 – 50</option>
//                   <option value="51-200">51 – 200</option>
//                   <option value="201-500">201 – 500</option>
//                   <option value="501-1000">501 – 1,000</option>
//                   <option value="1000+">1,000+</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="demo-submit"
//                 disabled={submitting}
//               >
//                 {submitting ? "Submitting..." : "Request Demo"}
//               </button>

//               <p className="demo-legal">
//                 SafeSphere is built for security, risk and compliance teams.
//                 By submitting this form you agree to be contacted about our
//                 product and services.
//               </p>
//             </form>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default DemoPage;





import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./DemoPage.css";

const DemoPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    organization: "",
    employees: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.organization || !form.employees) {
      setError("Please fill all required fields.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid work email.");
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert("Thanks! Our team will contact you shortly.");
      history.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div className="demo-logo">SafeSphere</div>
        <nav className="demo-nav">
          <button onClick={() => history.push("/")} className="demo-nav-link">
            Home
          </button>
          <button onClick={() => history.push("/login")} className="demo-nav-link-demo">
            Login
          </button>
        </nav>
      </header>

      <main className="demo-main">
        <section className="demo-left">
          <div className="demo-left-inner">
            <div className="demo-badge">#1 Risk Management Platform</div>
            <div className="demo-pulse-icon" />
            
            <h1 className="demo-title">
              Schedule
              <br />
              a Live Demo
            </h1>
            <p className="demo-subtitle">
              See how SafeSphere unifies risk, documentation, and compliance into a single 3D command center for your security team.
            </p>

            <div className="demo-highlights">
              <span>• <strong>Guided walkthrough</strong> of your use case</span>
              <span>• <strong>Real-time dashboards</strong> & risk scoring</span>
              <span>• <strong>ISO 27001, SOC 2,</strong> NIST mapping</span>
              
              <span>• <strong>Custom demo</strong> tailored to your needs</span>
            </div>

            <div className="demo-orbit demo-orbit-main">
              <div className="demo-orbit-sphere" />
              <div className="demo-orbit-ring" />
            </div>

            <div className="demo-trust">
              <div className="demo-trust-item">
                <div className="demo-trust-number">10K+</div>
                <div>Teams Protected</div>
              </div>
              <div className="demo-trust-item">
                <div className="demo-trust-number">99.9%</div>
                <div>Uptime SLA</div>
              </div>
              <div className="demo-trust-item">
                <div className="demo-trust-number">5+</div>
                <div>Countries</div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-right">
          <div className="demo-form-card">
            <div className="demo-form-header">
              <h2 className="demo-form-title">Tell us about your team</h2>
              <p className="demo-form-subtitle">
                Share a few details and we will match you with a product expert. Takes 30 seconds.
              </p>
            </div>

            {error && <div className="demo-error">{error}</div>}

            <form onSubmit={handleSubmit} className="demo-form">
              <div className="demo-field-group">
                <label className="demo-label">
                  Work email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="demo-input"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="demo-field-group">
                <label className="demo-label">
                  Organization <span>*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  className="demo-input"
                  placeholder="Company or institution"
                  value={form.organization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="demo-field-group">
                <label className="demo-label">
                  Number of employees <span>*</span>
                </label>
                <select
                  name="employees"
                  className="demo-input demo-select"
                  value={form.employees}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a range</option>
                  <option value="1-50">1 – 50</option>
                  <option value="51-200">51 – 200</option>
                  <option value="201-500">201 – 500</option>
                  <option value="501-1000">501 – 1,000</option>
                  <option value="1000+">1,000+</option>
                </select>
              </div>

              <button
                type="submit"
                className="demo-submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Request Demo"}
              </button>

              <p className="demo-legal">
                SafeSphere is built for security, risk and compliance teams.
                By submitting this form you agree to be contacted about our product and services.
              </p>

              {/* ✅ ATTRACTIVE FOOTER ENHANCEMENT */}
              <div className="demo-footer-enhance">
                <div className="demo-security-badges">
                  <div className="demo-badge-item">
                    <div className="demo-badge-icon demo-iso"></div>
                    <span>ISO 27001</span>
                  </div>
                  <div className="demo-badge-item">
                    <div className="demo-badge-icon demo-soc2"></div>
                    <span>SOC 2</span>
                  </div>
                  <div className="demo-badge-item">
                    <div className="demo-badge-icon demo-nist"></div>
                    <span>NIST</span>
                  </div>
                  <div className="demo-badge-item">
                    <div className="demo-badge-icon demo-gdpr"></div>
                    <span>GDPR</span>
                  </div>
                </div>
                
                <div className="demo-stats-row">
                  <div className="demo-stat">
                    <div className="demo-stat-number">24/7</div>
                    <div>Support</div>
                  </div>
                  <div className="demo-stat">
                    <div className="demo-stat-number">2 min</div>
                    <div>Response</div>
                  </div>
                  <div className="demo-stat">
                    <div className="demo-stat-number">Free</div>
                    <div>Trial</div>
                  </div>
                </div>
              </div>
            </form>

            <div className="demo-orbit demo-orbit-right">
              <div className="demo-orbit-sphere-right" />
              <div className="demo-orbit-ring-right" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DemoPage;
