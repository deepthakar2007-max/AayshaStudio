
import { useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLock,
  MdBadge,
  MdSave,
} from "react-icons/md";

function Profile() {
  // =========================
  // GET ADMIN DATA
  // =========================
  const getAdminData = () => {
    try {
      const savedAdmin = localStorage.getItem("adminData");

      if (savedAdmin) {
        return JSON.parse(savedAdmin);
      }
    } catch (error) {
      console.error("Admin data error:", error);
    }

    return {};
  };

  const initialAdmin = getAdminData();

  // =========================
  // ADMIN DATA STATE
  // =========================
  const [admin, setAdmin] = useState(initialAdmin);

  // =========================
  // PROFILE STATE
  // =========================
  const [profile, setProfile] = useState({
    id: initialAdmin?._id || initialAdmin?.id || "",
    name:
      initialAdmin?.name ||
      initialAdmin?.username ||
      initialAdmin?.fullName ||
      "",
    email: initialAdmin?.email || "",
    phone:
      initialAdmin?.phone ||
      initialAdmin?.phoneNumber ||
      "",
  });

  // =========================
  // PASSWORD STATE
  // =========================
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // MESSAGE STATE
  // =========================
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // =========================
  // SHOW MESSAGE
  // =========================
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // =========================
  // PROFILE INPUT CHANGE
  // =========================
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PASSWORD INPUT CHANGE
  // =========================
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PROFILE SUBMIT
  // =========================
  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Name validation
    if (!profile.name.trim()) {
      showMessage("Please enter your name.", "error");
      return;
    }

    // Email validation
    if (!profile.email.trim()) {
      showMessage("Please enter your email.", "error");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(profile.email.trim())) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Phone validation
    if (profile.phone.trim()) {
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(profile.phone.trim())) {
        showMessage(
          "Phone number must contain exactly 10 digits.",
          "error"
        );
        return;
      }
    }

    // =========================
    // UPDATED ADMIN
    // =========================
    const updatedAdmin = {
      ...admin,

      _id:
        admin?._id ||
        admin?.id ||
        profile.id,

      name: profile.name.trim(),

      email: profile.email.trim(),

      phone: profile.phone.trim(),
    };

    // =========================
    // SAVE LOCAL STORAGE
    // =========================
    localStorage.setItem(
      "adminData",
      JSON.stringify(updatedAdmin)
    );

    // =========================
    // UPDATE STATE
    // =========================
    setAdmin(updatedAdmin);

    setProfile((prev) => ({
      ...prev,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      phone: updatedAdmin.phone,
    }));

    showMessage(
      "Profile updated successfully.",
      "success"
    );
  };

  // =========================
  // PASSWORD SUBMIT
  // =========================
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    // Empty validation
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      showMessage(
        "Please fill all password fields.",
        "error"
      );
      return;
    }

    // Minimum password length
    if (newPassword.length < 6) {
      showMessage(
        "New password must be at least 6 characters.",
        "error"
      );
      return;
    }

    // Confirm password
    if (newPassword !== confirmPassword) {
      showMessage(
        "New passwords do not match.",
        "error"
      );
      return;
    }

    /*
      IMPORTANT

      Actual password change should be handled
      by your backend API.

      Example:

      await axios.put(
        "https://aayshastudio.onrender.com/api/admin/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
        }
      );
    */

    showMessage(
      "Password validated. Connect your password API to update it.",
      "success"
    );

    // Clear password fields
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // =========================
  // ADMIN DISPLAY DATA
  // =========================
  const adminName =
    profile.name.trim() || "Admin";

  const adminInitial =
    adminName.charAt(0).toUpperCase() || "A";

  const adminRole =
    admin?.role ||
    admin?.userType ||
    "Admin";

  return (
    <div className="min-h-full space-y-6 bg-gray-50 p-1">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your admin account and security settings
        </p>
      </div>

      {/* =========================
          MESSAGE
      ========================= */}
      {message && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm font-medium ${
            messageType === "error"
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-green-200 bg-green-50 text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* =========================
          PROFILE AREA
      ========================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center text-center">

            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white shadow-md">
              {adminInitial}
            </div>

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {adminName}
            </h2>

            {/* Email */}
            <p className="mt-1 break-all text-sm text-gray-500">
              {profile.email || "No email available"}
            </p>

            {/* Admin ID */}
            <div className="mt-6 w-full rounded-lg bg-gray-50 p-4 text-left">

              <div className="flex items-center gap-2">
                <MdBadge
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Admin ID
                </p>
              </div>

              <p className="mt-2 break-all text-sm font-medium text-gray-800">
                {profile.id || "Not available"}
              </p>

            </div>

            {/* Role */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
                <MdPerson size={16} />
                {adminRole}
              </span>
            </div>

          </div>

        </div>

        {/* =========================
            PERSONAL INFORMATION
        ========================= */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your admin account information
            </p>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className="space-y-5"
          >

            {/* Admin ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Admin ID
              </label>

              <input
                type="text"
                value={profile.id}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdPerson size={18} />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdEmail size={18} />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdPhone size={18} />
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="Enter 10 digit phone number"
                maxLength={10}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
            >
              <MdSave size={20} />
              Save Changes
            </button>

          </form>
        </div>
      </div>

      {/* =========================
          CHANGE PASSWORD
      ========================= */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MdLock size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Change Password
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your admin account password
              </p>
            </div>

          </div>

        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="New password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Change Password Button */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95"
            >
              <MdLock size={19} />
              Change Password
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default Profile;

