import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    // Frontend Validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Register API
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      const data = response.data;

      console.log("Register Response:", data);

      setSuccess(
        data.message ||
          "Admin account created successfully."
      );

      // Clear Form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to Login
      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);

    } catch (error) {
      console.error("Register Error:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
            "Registration failed."
        );
      } else {
        setError(
          "Unable to connect with server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
            A
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Create Admin Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register a new administrator
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Name */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <div className="text-center mt-6">

            <p className="text-sm text-gray-500">
              Already have an admin account?
            </p>

            <Link
              to="/admin/login"
              className="inline-block mt-2 text-blue-600 font-medium hover:underline"
            >
              Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminRegister;