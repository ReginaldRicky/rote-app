import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfilePersonalForm from "../components/ProfilePersonalForm";
import ProfileSecurityForm from "../components/ProfileSecurityForm";

// ── Dummy user data ────────────────────────────────────────
const dummyUser = {
  name: "Fikri Muhaffizh",
  dateOfBirth: "1999-08-15",
  phone: "+62 812 3456 7890",
  location: "Jakarta, Indonesia",
  email: "fikri.muhaffizh@gmail.com",
  avatar: "https://avatar.iran.liara.run/public/28",
};

export default function ProfilePage() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || dummyUser.avatar
  );

  const [personalData, setPersonalData] = useState({
    name: dummyUser.name,
    dateOfBirth: dummyUser.dateOfBirth,
    phone: dummyUser.phone,
    location: dummyUser.location,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="navbar-spacer" />

      {/* PAGE HEADER */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">My Profile</h1>

        <p className="profile-page-breadcrumb">
          <span
            onClick={() => navigate("/dashboard")}
            className="profile-page-breadcrumb-link"
          >
            Home
          </span>
          <span> / </span>
          <span>My Profile</span>
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="profile-container">
        <ProfileSidebar
          avatar={avatar}
          name={personalData.name}
          location={personalData.location}
          dateOfBirth={personalData.dateOfBirth}
          onAvatarChange={setAvatar}
        />

        <main className="profile-main">
          <ProfilePersonalForm
            initialData={personalData}
            onSave={setPersonalData}
          />

          <ProfileSecurityForm initialEmail={dummyUser.email} />
        </main>
      </div>

      <Footer />
    </div>
  );
}