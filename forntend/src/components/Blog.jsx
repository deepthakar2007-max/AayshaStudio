
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Get all blogs — existing API logic unchanged
    const getBlogs = async () => {
        try {
            const response = await axios.get(
                "https://aayshastudio.onrender.com/api/blog"
            );

            console.log(response.data);
            setBlogs(response.data.data);
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    // Animation settings
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Loading UI
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8f6f2]">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                        }}
                        className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-amber-200 border-t-amber-600"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-medium tracking-wide text-gray-600"
                    >
                        Loading stories...
                    </motion.p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-hidden bg-[#f8f6f2] text-gray-900">

            {/* Hero Header */}
            <section className="relative overflow-hidden bg-[#171a21] px-4 py-20 sm:px-8 sm:py-28">

                {/* Decorative background elements */}
                <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 mx-auto max-w-4xl text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "2px" }}
                        animate={{ opacity: 1, letterSpacing: "5px" }}
                        transition={{ duration: 1 }}
                        className="mb-5 inline-block text-xs font-semibold uppercase text-amber-400 sm:text-sm"
                    >
                        Aaysha Studio Journal
                    </motion.span>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Stories Worth
                        <br />
                        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-300 bg-clip-text text-transparent">
                            Remembering.
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base"
                    >
                        Discover inspiring stories, creative ideas, and
                        memorable moments from the world of photography.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto mt-8 h-1 w-20 origin-center rounded-full bg-amber-400"
                    />
                </motion.div>
            </section>

            {/* Blog Section */}
            <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">

                <div className="mx-auto max-w-7xl">

                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
                    >
                        <div>
                            <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-amber-700">
                                Explore Our Journal
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Latest Stories
                                <span className="text-amber-600">.</span>
                            </h2>
                        </div>

                     
                    </motion.div>

                    {/* Empty State */}
                    {blogs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm"
                        >
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-8 w-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">
                                No stories yet
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Your next great story starts here.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => navigate("/Addblog")}
                                className="mt-6 rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                            >
                                Add Your First Blog
                            </motion.button>
                        </motion.div>
                    ) : (

                        /* Animated Blog Cards */
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.08,
                            }}
                            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {blogs.map((blog) => (

                                <motion.article
                                    key={blog._id}
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.25 },
                                    }}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                                >

                                    {/* Blog Image */}
                                    <div className="relative h-60 overflow-hidden bg-gray-200">

                                        {blog.image ? (
                                            <motion.img
                                                src={`https://aayshastudio.onrender.com${blog.image}`}
                                                alt={blog.title || "Blog image"}
                                                loading="lazy"
                                                whileHover={{ scale: 1.08 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                }}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-sm font-medium text-gray-500">
                                                No Image Available
                                            </div>
                                        )}

                                        {/* Image Overlay */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                                Aaysha Studio
                                            </span>
                                        </div>
                                    </div>

                                    {/* Blog Content */}
                                    <div className="flex flex-1 flex-col p-6">

                                        <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-amber-700">
                                            {blog.title}
                                        </h3>

                                        <p className="mb-6 line-clamp-3 text-sm leading-7 text-gray-500">
                                            {blog.description}
                                        </p>

                                        {/* Blog Details */}
                                        <div className="mt-auto space-y-3 border-t border-gray-100 pt-5 text-sm">

                                            {blog.Addresh && (
                                                <div className="flex items-start gap-3">
                                                    <span className="mt-0.5 text-amber-700">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.7"
                                                            className="h-4 w-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                                            />
                                                            <circle cx="12" cy="10" r="2.5" />
                                                        </svg>
                                                    </span>

                                                    <p className="min-w-0 break-words text-gray-500">
                                                        <span className="font-semibold text-gray-800">
                                                            Address:
                                                        </span>{" "}
                                                        {blog.Addresh}
                                                    </p>
                                                </div>
                                            )}

                                            {blog.PhoneNumber && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-amber-700">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.7"
                                                            className="h-4 w-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"
                                                            />
                                                        </svg>
                                                    </span>

                                                    <p className="text-gray-500">
                                                        <span className="font-semibold text-gray-800">
                                                            Phone:
                                                        </span>{" "}
                                                        {blog.PhoneNumber}
                                                    </p>
                                                </div>
                                            )}

                                            {blog.author && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-amber-700">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.7"
                                                            className="h-4 w-4"
                                                        >
                                                            <circle cx="12" cy="8" r="4" />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4 21a8 8 0 0 1 16 0"
                                                            />
                                                        </svg>
                                                    </span>

                                                    <p className="text-gray-500">
                                                        <span className="font-semibold text-gray-800">
                                                            Author:
                                                        </span>{" "}
                                                        {blog.author}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Read More */}
                                        <motion.button
                                            whileHover="hover"
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate("/about")}
                                            className="mt-6 flex w-full items-center justify-between rounded-xl bg-[#171a21] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-amber-600"
                                        >
                                            <span>Read More</span>

                                            <motion.span
                                                variants={{
                                                    hover: { x: 5 },
                                                }}
                                                transition={{ duration: 0.2 }}
                                                className="text-lg"
                                            >
                                                →
                                            </motion.span>
                                        </motion.button>

                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}

                </div>
            </section>

            {/* Bottom CTA */}
            {blogs.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="px-4 pb-16 sm:px-8 sm:pb-20"
                >
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#171a21] px-6 py-12 text-center sm:px-12 sm:py-16">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-amber-400">
                            Your Story Matters
                        </p>

                        <h2 className="text-2xl font-bold text-white sm:text-4xl">
                            Every Moment Deserves a Story.
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
                            Explore our collection and find inspiration
                            in the moments that make life unforgettable.
                        </p>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 8px 25px rgba(217, 119, 6, 0.25)",
                            }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => navigate("/about")}
                            className="mt-7 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-amber-400"
                        >
                            Discover Our Studio
                        </motion.button>
                    </div>
                </motion.section>
            )}
        </div>
    );
};

export default Blog;

