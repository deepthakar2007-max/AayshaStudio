import { useEffect, useState } from "react";
import axios from "axios";

function Blogs() {
  const API_URL = "http://localhost:4000/api/blog";
  const SERVER_URL = "http://localhost:4000";

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    PhoneNumber: "",
    Addresh: "",
    author: "",

  });

  // =====================================
  // IMAGE URL
  // =====================================
  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${SERVER_URL}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  // =====================================
  // GET ALL BLOGS
  // =====================================
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      console.log("GET BLOG RESPONSE:", response.data);

      const blogData =
        response.data.data ||
        response.data.blogs ||
        response.data;

      setBlogs(Array.isArray(blogData) ? blogData : []);
    } catch (error) {
      console.error("FETCH BLOG ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD BLOGS
  // =====================================
  useEffect(() => {
    fetchBlogs();
  }, []);

  // =====================================
  // INPUT CHANGE
  // =====================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // IMAGE CHANGE
  // =====================================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  // =====================================
  // ADD / UPDATE BLOG
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Please enter blog title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter blog description.");
      return;
    }

    // Image required only for new blog
    if (!editingBlog && !formData.image) {
      setError("Please select blog image.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("author", formData.author.trim());
      data.append("PhoneNumber", formData.PhoneNumber.trim());
      data.append("Addresh", formData.Addresh.trim());

      if (formData.image) {
        data.append("image", formData.image);
      }

      // Debug FormData
      console.log("========== BLOG FORM DATA ==========");

      for (const [key, value] of data.entries()) {
        console.log(
          key,
          value instanceof File ? value.name : value
        );
      }

      console.log("====================================");

      let response;

      // =================================
      // UPDATE
      // =================================
      if (editingBlog) {
        response = await axios.put(
          `${API_URL}/${editingBlog._id}`,
          data
        );
      }

      // =================================
      // CREATE
      // =================================
      else {
        response = await axios.post(
          API_URL,
          data
        );
      }

      console.log(
        "BLOG SAVE RESPONSE:",
        response.data
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        author: "Admin",
        status: "Draft",
        image: null,
      });

      setEditingBlog(null);
      setShowForm(false);

      // Reload blogs
      await fetchBlogs();

    } catch (error) {
      console.error("========== SAVE BLOG ERROR ==========");
      console.error(error);
      console.error("MESSAGE:", error.message);
      console.error("STATUS:", error.response?.status);
      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );
      console.error("=====================================");

      setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unable to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // DELETE BLOG
  // =====================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await axios.delete(`${API_URL}/${id}`);

      setBlogs((prev) =>
        prev.filter((blog) => blog._id !== id)
      );

    } catch (error) {
      console.error("DELETE BLOG ERROR:", error);
      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to delete blog."
      );
    }
  };

  // =====================================
  // EDIT BLOG
  // =====================================
  const handleEdit = (blog) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",
      description: blog.description || "",
      author: blog.author || "",
          PhoneNumber: blog.PhoneNumber || "",
    Addresh: blog.Addresh || "",
      image: null,
    });

    setError("");
    setShowForm(true);
  };

  // =====================================
  // VIEW BLOG
  // =====================================
  const handleView = (blog) => {
    alert(
      `Blog Details

Title: ${blog.title}

Description: ${blog.description}

Author: ${blog.author}

    PhoneNumber: ${blog.PhoneNumber}
    Addresh: ${blog.Addresh}`
    );
  };

  // =====================================
  // ADD BLOG
  // =====================================
  const handleAddBlog = () => {
    setEditingBlog(null);

    setFormData({
      title: "",
      description: "",
      author: "",
      PhoneNumber: "",
      Addresh: "",
      image: null,
    });

    setError("");
    setShowForm(true);
  };

  // =====================================
  // CANCEL
  // =====================================
  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);

    setFormData({
      title: "",
      description: "",
      author: "",
      PhoneNumber: "",
      Addresh: "",
      image: null,
    });

    setError("");
  };

  // =====================================
  // SEARCH
  // =====================================
  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(searchText) ||
      blog.description
        ?.toLowerCase()
        .includes(searchText) ||
      blog.author?.toLowerCase().includes(searchText)
    );
  });

  // =====================================
  // LOADING
  // =====================================
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-500 mt-4">
            Loading blogs...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Blogs
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage your blog posts
          </p>
        </div>

        <button
          onClick={handleAddBlog}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Blog
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">

          <p className="font-medium">
            {error}
          </p>

        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Blogs
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {blogs.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Published
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {
              blogs.filter(
                (blog) => blog.status === "Published"
              ).length
            }
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Drafts
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {
              blogs.filter(
                (blog) => blog.status === "Draft"
              ).length
            }
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {editingBlog
                  ? "Edit Blog"
                  : "Add New Blog"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Enter blog information
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* TITLE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter blog description"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="Addresh"
                  value={formData.Addresh}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            {/* AUTHOR + STATUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>
            </div>

            {/* IMAGE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />

              {formData.image && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {formData.image.name}
                </p>
              )}

              {/* CURRENT IMAGE */}
              {editingBlog && editingBlog.image && (
                <div className="mt-4">

                  <p className="text-sm text-gray-500 mb-2">
                    Current Image
                  </p>

                  <img
                    src={getImageUrl(
                      editingBlog.image
                    )}
                    alt="Current blog"
                    className="w-32 h-20 object-cover rounded-lg"
                  />

                </div>
              )}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingBlog
                    ? "Update Blog"
                    : "Create Blog"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* BLOG LIST */}
      {filteredBlogs.length > 0 ? (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {filteredBlogs.map((blog) => (

            <div
              key={blog._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >

              <div className="grid grid-cols-1 sm:grid-cols-3">

                {/* IMAGE */}
                <div className="h-48 sm:h-full bg-gray-100">

                  {blog.image ? (

                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📝
                    </div>

                  )}

                </div>

                {/* CONTENT */}
                <div className="sm:col-span-2 p-5">

                  <div className="flex items-start justify-between gap-3">

                    <h2 className="text-lg font-semibold text-gray-800">
                      {blog.title}
                    </h2>

                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${blog.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {blog.status}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="mt-4 text-xs text-gray-500">

                    <p>
                      Author:{" "}
                      <span className="text-gray-700">
                        {blog.author}
                      </span>
                    </p>

                    <p className="mt-1">
                      Date:{" "}
                      <span className="text-gray-700">
                        {blog.createdAt
                          ? new Date(
                            blog.createdAt
                          ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    <button
                      onClick={() =>
                        handleView(blog)
                      }
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(blog)
                      }
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(blog._id)
                      }
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">

          <div className="text-5xl mb-4">
            📝
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No Blogs Found
          </h3>

          <p className="text-gray-500 mt-1">
            Try another search or create a new blog.
          </p>

        </div>

      )}

    </div>
  );
}

export default Blogs;