import { useRef } from "react";

export default function ProfileSidebar({ avatar, name, location, dateOfBirth, onAvatarChange }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onAvatarChange(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="profile-sidebar">
      {/* AVATAR */}
      <div className="profile-avatar-wrapper">
        <img
          src={avatar}
          alt={name}
          className="profile-avatar-img"
        />
        <button
          className="profile-avatar-edit-btn"
          onClick={() => fileInputRef.current.click()}
          title="Change photo"
        >
          ✏️
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* NAME */}
      <h2 className="profile-sidebar-name">{name}</h2>

      {/* META */}
      <div className="profile-sidebar-meta">
        <span>📍 {location}</span>
        <span>🎂 {dateOfBirth}</span>
      </div>

     
    </aside>
  );
}