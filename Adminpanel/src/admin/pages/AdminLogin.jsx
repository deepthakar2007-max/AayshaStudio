import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    if (error) {
      setError("");
    }
  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =========================
    // VALIDATION
    // =========================
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // LOGIN API
      // =========================
      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const data = response.data;

      console.log("Login Response:", data);

      // =========================
      // CHECK TOKEN
      // =========================
      if (!data?.token) {
        setError("Login successful, but token was not received.");
        return;
      }

      // =========================
      // SAVE TOKEN
      // =========================
      localStorage.setItem("adminToken", data.token);

      // =========================
      // SAVE ADMIN DATA
      // =========================
      if (data.user) {
        localStorage.setItem(
          "adminData",
          JSON.stringify(data.user)
        );
      }

      // =========================
      // REMOVE OLD USER DATA
      // =========================
      localStorage.removeItem("user");

      // =========================
      // REDIRECT ADMIN
      // =========================
      navigate("/admin", { replace: true });

    } catch (error) {
      console.error("Login Error:", error);

      // =========================
      // BACKEND ERROR
      // =========================
      if (error.response) {
        setError(
          error.response.data?.message ||
            "Invalid email or password."
        );
      }

      // =========================
      // SERVER NOT CONNECTED
      // =========================
      else if (error.request) {
        setError(
          "Unable to connect with server. Please check your backend."
        );
      }

      // =========================
      // OTHER ERROR
      // =========================
      else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* =========================
            LOGO / TITLE
        ========================= */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md">
            A
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to access your admin panel
          </p>

        </div>

        {/* =========================
            LOGIN CARD
        ========================= */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* =========================
                EMAIL
            ========================= */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                autoComplete="email"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

            </div>

            {/* =========================
                PASSWORD
            ========================= */}
            <div>

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

            </div>

            {/* =========================
                LOGIN BUTTON
            ========================= */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* =========================
              REGISTER
          ========================= */}
          <div className="text-center mt-6">

            <p className="text-sm text-gray-500">
              Don't have an admin account?
            </p>

            <Link
              to="/admin/register"
              className="inline-block mt-2 text-blue-600 font-medium hover:underline"
            >
              Create Admin Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;