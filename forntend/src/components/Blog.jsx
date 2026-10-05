
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Get all blogs
    const getBlogs = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/blog"
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

    // Loading
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

                    <p className="text-lg font-medium text-gray-600">
                        Loading blogs...
                    </p>
                </div>
            </div>
        );
    }   

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-10">

            {/* Header */}
            <div className="mx-auto mb-10 max-w-7xl text-center">

                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    All Blogs
                </h1>

                <p className="mt-2 text-gray-500">
                    Explore our latest blogs
                </p>

            </div>

            {/* Blog List */}
            <div className="mx-auto max-w-7xl">

                {blogs.length === 0 ? (

                    <div className="rounded-xl bg-white p-10 text-center shadow-md">

                        <p className="text-lg text-gray-500">
                            No blogs found.
                        </p>

                        <button
                            onClick={() => navigate("/Addblog")}
                            className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Add Your First Blog
                        </button>

                    </div>

                ) : (

                    <>
                        {/* Cards */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {blogs.map((blog) => (

                                <div
                                    key={blog._id}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    {/* Image */}
                                    <div className="overflow-hidden">

                                        {blog.image ? (
                                            <img
                                                src={`http://localhost:4000${blog.image}`}
                                                alt={blog.title}
                                                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-56 items-center justify-center bg-gray-200 text-gray-500">
                                                No Image
                                            </div>
                                        )}

                                    </div>

                                    {/* Content */}
                                    <div className="p-5">

                                        {/* Title */}
                                        <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-800">
                                            {blog.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {blog.description}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">

                                            <p>
                                                <span className="font-semibold text-gray-800">
                                                    Address:
                                                </span>{" "}
                                                {blog.Addresh}
                                            </p>

                                            <p>
                                                <span className="font-semibold text-gray-800">
                                                    Phone:
                                                </span>{" "}
                                                {blog.PhoneNumber}
                                            </p>

                                            {blog.author && (
                                                <p>
                                                    <span className="font-semibold text-gray-800">
                                                        Author:
                                                    </span>{" "}
                                                    {blog.author}
                                                </p>
                                            )}

                                        </div>

                                        {/* Read More */}
                                        <button
                                            onClick={() =>
                                                navigate("/about")
                                            }
                                            className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            Read More →
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                       
                        

                    </>

                )}

            </div>

        </div>
    );
};

export default Blog;
