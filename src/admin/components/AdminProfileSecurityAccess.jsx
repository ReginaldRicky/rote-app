import { FiShield } from "react-icons/fi";

import AdminSectionHeader from "./AdminSectionHeader";
import AdminProfileField from "./AdminProfileField";
import { adminProfileInputClass } from "./AdminProfileFormStyles";

export default function AdminProfileSecurityAccess({
  formData,
  updateField,
}) {
  return (
    <article className="rounded-[22px] border border-[#e7edf4] bg-white p-5 shadow-sm">
      <AdminSectionHeader
        icon={FiShield}
        title="Security & Access"
        description="Manage account status, access level, and password settings."
      />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <AdminProfileField label="Access Level">
          <select
            value={formData.accessLevel}
            onChange={(event) => updateField("accessLevel", event.target.value)}
            className={adminProfileInputClass}
          >
            <option value="Full Access">Full Access</option>
            <option value="Manager Access">Manager Access</option>
            <option value="Staff Access">Staff Access</option>
            <option value="Read Only">Read Only</option>
          </select>
        </AdminProfileField>

        <AdminProfileField label="Account Status">
          <select
            value={formData.accountStatus}
            onChange={(event) =>
              updateField("accountStatus", event.target.value)
            }
            className={adminProfileInputClass}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </AdminProfileField>

        <AdminProfileField label="Current Password">
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(event) =>
              updateField("currentPassword", event.target.value)
            }
            className={adminProfileInputClass}
            placeholder="Enter current password"
          />
        </AdminProfileField>

        <AdminProfileField label="New Password">
          <input
            type="password"
            value={formData.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
            className={adminProfileInputClass}
            placeholder="Enter new password"
          />
        </AdminProfileField>

        <div className="md:col-span-2">
          <AdminProfileField label="Confirm New Password">
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(event) =>
                updateField("confirmPassword", event.target.value)
              }
              className={adminProfileInputClass}
              placeholder="Confirm new password"
            />
          </AdminProfileField>
        </div>
      </div>
    </article>
  );
}