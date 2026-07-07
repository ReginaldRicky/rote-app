import { FiUser } from "react-icons/fi";

import AdminSectionHeader from "./AdminSectionHeader";
import AdminProfileField from "./AdminProfileField";
import {
  adminProfileInputClass,
  adminProfileTextareaClass,
} from "./AdminProfileFormStyles";

export default function AdminProfilePersonalInfo({ formData, updateField }) {
  return (
    <section className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <AdminSectionHeader
        icon={FiUser}
        title="Personal Information"
        description="Update the information used across the admin dashboard."
      />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AdminProfileField label="Full Name">
          <input
            type="text"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={adminProfileInputClass}
            required
          />
        </AdminProfileField>

        <AdminProfileField label="Email Address">
          <input
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={adminProfileInputClass}
            required
          />
        </AdminProfileField>

        <AdminProfileField label="Phone Number">
          <input
            type="text"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={adminProfileInputClass}
          />
        </AdminProfileField>

        <AdminProfileField label="Location">
          <input
            type="text"
            value={formData.location}
            onChange={(event) => updateField("location", event.target.value)}
            className={adminProfileInputClass}
          />
        </AdminProfileField>
      </div>

      <div className="mt-4">
        <AdminProfileField label="Bio">
          <textarea
            value={formData.bio}
            onChange={(event) => updateField("bio", event.target.value)}
            className={adminProfileTextareaClass}
          />
        </AdminProfileField>
      </div>
    </section>
  );
}