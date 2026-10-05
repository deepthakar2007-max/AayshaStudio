import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

     
     Swal.fire({
            title: "Message",
            text: response.data.message,
            icon: "success",
          });
      navigate("/login");

    } catch (error) {
      console.log(error);

       Swal.fire({
             title: "Login Failed",
             text: error.response?.data?.message || "Something went wrong",
             icon: "error",
           });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-250 via-slate-900 to-indigo-250 px-4 py-10">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 animate-[fadeIn_0.7s_ease-out]">

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-white tracking-wide">
            Create Account
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Create your account and get started
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-95"
          >
            <span className="relative z-10">
              Create Account
            </span>

            {/* Shine Animation */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400 mt-7">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;