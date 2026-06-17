import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ProfileSecurityForm({ initialEmail }) {
  const [formData, setFormData] = useState({
    email: initialEmail || "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Handle Change ──────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // ── Handle Submit ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Email is required.");
      return;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    setSuccess("Security settings updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form className="profile-section" onSubmit={handleSubmit}>
      {/* TITLE */}
      <h3 className="profile-section-title">Security</h3>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="profile-error-msg">{error}</div>
      )}

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="profile-success-msg">{success}</div>
      )}

      {/* EMAIL */}
      <div className="profile-form-group mb-4">
        <label className="profile-label">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="profile-input"
          placeholder="Enter your email"
        />
      </div>

      {/* PASSWORD */}
      <div className="profile-form-group mb-4">
        <label className="profile-label">Password</label>
        <div className="profile-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="profile-input profile-input-icon"
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="profile-input-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="profile-form-group mb-6">
        <label className="profile-label">Confirm Password</label>
        <div className="profile-input-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="profile-input profile-input-icon"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="profile-input-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button type="submit" className="profile-save-btn">
        Save
      </button>
    </form>
  );
}