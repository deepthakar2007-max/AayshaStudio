import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:4000/api/auth/login",
                formData
            );

            console.log(response.data);

            // Save JWT token
            localStorage.setItem("token", response.data.token);

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            await Swal.fire({
                title: "Message",
                text: response.data.message,
                icon: "success",
            });

              navigate("/");
            window.location.href = "/";
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-250 via-slate-900 to-indigo-250 px-4">

            {/* Background Glow */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30">

                        <svg
                            className="w-8 h-8 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M15 12H3m0 0l4-4m-4 4l4 4M21 4v16"
                            />
                        </svg>

                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Login to continue to your account
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:bg-black/30"
                        />

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/50 active:scale-95"
                    >

                        <span className="relative z-10">
                            Login
                        </span>

                        {/* Shine Effect */}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>

                    </button>

                </form>

                {/* Register */}
                <p className="mt-7 text-center text-sm text-gray-400">

                    Don't have an account?{" "}
                    <br/>
                    <Link
                        to="/register"
                        className="font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
                    >
                        Create Account
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;