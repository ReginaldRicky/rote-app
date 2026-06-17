import { useState } from "react";

export default function ProfilePersonalForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
  });
  const [success, setSuccess] = useState("");

  // ── Handle Change ──────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess("");
  };

  // ── Handle Submit ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", formData.name);
    onSave?.(formData);
    setSuccess("Personal information updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form className="profile-section" onSubmit={handleSubmit}>
      {/* TITLE */}
      <h3 className="profile-section-title">Personal Information</h3>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="profile-success-msg">{success}</div>
      )}

      {/* FORM GRID */}
      <div className="profile-form-grid">
        {/* NAME */}
        <div className="profile-form-group">
          <label className="profile-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="profile-input"
            placeholder="Enter your name"
          />
        </div>

        {/* DATE OF BIRTH */}
        <div className="profile-form-group">
          <label className="profile-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        {/* PHONE */}
        <div className="profile-form-group">
          <label className="profile-label">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="profile-input"
            placeholder="Enter your phone number"
          />
        </div>

        {/* LOCATION */}
        <div className="profile-form-group">
          <label className="profile-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="profile-input"
            placeholder="Enter your location"
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button type="submit" className="profile-save-btn">
        Save
      </button>
    </form>
  );
}