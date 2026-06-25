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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    localStorage.setItem("email", formData.email);
    window.dispatchEvent(new Event("auth-change"));

    setSuccess("Security settings updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form className="profile-section-enhanced" onSubmit={handleSubmit}>
      <div className="profile-section-header-enhanced">
        <div>
          <h3>Security</h3>
          <p>Manage your email address and account password.</p>
        </div>
      </div>

      {error && (
        <div className="profile-error-msg-enhanced">
          {error}
        </div>
      )}

      {success && (
        <div className="profile-success-msg-enhanced">
          {success}
        </div>
      )}

      <div className="profile-form-group-enhanced profile-full-width">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="profile-form-group-enhanced profile-full-width">
        <label>Password</label>

        <div className="profile-password-wrapper-enhanced">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <div className="profile-form-group-enhanced profile-full-width">
        <label>Confirm Password</label>

        <div className="profile-password-wrapper-enhanced">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>
      </div>

      <button type="submit" className="profile-save-btn-enhanced">
        Update Security
      </button>
    </form>
  );
}