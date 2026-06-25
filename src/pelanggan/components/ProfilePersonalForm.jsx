import { useState } from "react";

export default function ProfilePersonalForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    phone: initialData?.phone || "",
    location: initialData?.location || "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("username", formData.name);
    window.dispatchEvent(new Event("auth-change"));

    onSave?.(formData);

    setSuccess("Personal information updated successfully!");

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form className="profile-section-enhanced" onSubmit={handleSubmit}>
      <div className="profile-section-header-enhanced">
        <div>
          <h3>Personal Information</h3>
          <p>Update your personal details and contact information.</p>
        </div>
      </div>

      {success && (
        <div className="profile-success-msg-enhanced">
          {success}
        </div>
      )}

      <div className="profile-form-grid-enhanced">
        <div className="profile-form-group-enhanced">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="profile-form-group-enhanced">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="profile-form-group-enhanced">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="profile-form-group-enhanced">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
          />
        </div>
      </div>

      <button type="submit" className="profile-save-btn-enhanced">
        Save Changes
      </button>
    </form>
  );
}