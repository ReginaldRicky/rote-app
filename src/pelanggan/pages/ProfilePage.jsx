import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfilePersonalForm from "../components/ProfilePersonalForm";
import ProfileSecurityForm from "../components/ProfileSecurityForm";

const dummyUser = {
  name: "Fikri Muhaffizh",
  dateOfBirth: "1999-08-15",
  phone: "+62 812 3456 7890",
  location: "Jakarta, Indonesia",
  email: "fikri.muhaffizh@gmail.com",
  avatar: "https://avatar.iran.liara.run/public/28",
};

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || dummyUser.avatar
  );

  const [personalData, setPersonalData] = useState({
    name: localStorage.getItem("username") || dummyUser.name,
    dateOfBirth: dummyUser.dateOfBirth,
    phone: dummyUser.phone,
    location: dummyUser.location,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <PageHeader
        title="My Profile"
        breadcrumbs={[
          { label: "Home", to: "/dashboard" },
          { label: "My Profile" },
        ]}
      />

      <section className="profile-page-wrapper">
        <div className="profile-card-layout">
          <ProfileSidebar
            avatar={avatar}
            name={personalData.name}
            location={personalData.location}
            dateOfBirth={personalData.dateOfBirth}
            onAvatarChange={setAvatar}
          />

          <main className="profile-content-area">
            <ProfilePersonalForm
              initialData={personalData}
              onSave={setPersonalData}
            />

            <ProfileSecurityForm
              initialEmail={localStorage.getItem("email") || dummyUser.email}
            />
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}