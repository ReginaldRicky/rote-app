import { useRef, useState } from "react";

export default function ProfileSidebar({
  avatar,
  name,
  location,
  dateOfBirth,
  onAvatarChange,
}) {
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const initial = name?.charAt(0)?.toUpperCase() || "U";

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      onAvatarChange(reader.result);
      localStorage.setItem("avatar", reader.result);
      window.dispatchEvent(new Event("auth-change"));
      setImageError(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <aside className="profile-sidebar-enhanced">
      <div className="profile-sidebar-cover"></div>

      <div className="profile-sidebar-content">
        <div className="profile-avatar-wrapper-enhanced">
          {avatar && !imageError ? (
            <img
              src={avatar}
              alt={name}
              className="profile-avatar-img-enhanced"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="profile-avatar-fallback-enhanced">
              {initial}
            </div>
          )}

          <button
            type="button"
            className="profile-avatar-edit-btn-enhanced"
            onClick={() => fileInputRef.current.click()}
            title="Change photo"
          >
            ✎
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <h2 className="profile-sidebar-name-enhanced">{name}</h2>

        <p className="profile-sidebar-role">Customer Account</p>

        <div className="profile-sidebar-meta-enhanced">
          <div>
            <span>📍</span>
            <p>{location || "No location"}</p>
          </div>

          <div>
            <span>🎂</span>
            <p>{dateOfBirth || "No date"}</p>
          </div>
        </div>

        <div className="profile-sidebar-stats">
          <div>
            <h3>0</h3>
            <p>Bookings</p>
          </div>

          <div>
            <h3>0</h3>
            <p>Wishlist</p>
          </div>

          <div>
            <h3>4.9</h3>
            <p>Rating</p>
          </div>
        </div>
      </div>
    </aside>
  );
}