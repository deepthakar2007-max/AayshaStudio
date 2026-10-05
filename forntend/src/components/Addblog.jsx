import { useState } from "react";
import axios from "axios";

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Addresh: "",
    PhoneNumber: "",
    author: "",
  });

  const [image, setImage] = useState(null);

  // Text input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    console.log("Selected file:", file);

    if (file) {
      setImage(file);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FormData for Multer
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("Addresh", formData.Addresh);
      data.append("PhoneNumber", formData.PhoneNumber);
      data.append("author", formData.author);

      // Add image
      if (image) {
        data.append("image", image);
      }

      // Check FormData
      console.log("========== FORM DATA ==========");

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      console.log("================================");

      // Send data to backend
      const response = await axios.post(
        "http://localhost:4000/api/blog",
        data
      );

      console.log("Response:", response.data);

      alert("Blog created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        Addresh: "",
        PhoneNumber: "",
        author: "",
      });

      setImage(null);

      // Reset file input
      document.getElementById("image").value = "";

    } catch (error) {
      console.error("Error:", error);

      console.error(
        "Backend Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to create blog"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Create Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Select Image
            </label>

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter short description"
              rows="3"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="Addresh"
              value={formData.Addresh}
              onChange={handleChange}
              placeholder="Enter address"
              rows="3"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Author
            </label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Create Blog
          </button>

        </form>
      </div>
    </div>
  );
};

export default Blog;