import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://aayshastudio.onrender.com/api/photos";
const SERVER_URL = "https://aayshastudio.onrender.com";

function Photos() {
  const [photos, setPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // GET PHOTOS
  // =========================
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(API_URL);

      setPhotos(response.data.photos || []);
    } catch (error) {
      console.log("GET PHOTOS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // IMAGE CHANGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert("Please enter title and category");
      return;
    }

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("image", formData.image);

      const response = await axios.post(API_URL, data);

      alert(response.data.message);

      // Reset form
      setFormData({
        title: "",
        category: "",
        image: null,
      });

      // Reset file input
      document.getElementById("imageInput").value = "";

      // Refresh photos
      fetchPhotos();
    } catch (error) {
      console.log("UPLOAD ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while uploading"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_URL}/${id}`);

      alert(response.data.message);

      fetchPhotos();
    } catch (error) {
      console.log("DELETE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete photo"
      );
    }
  };

  // =========================
  // FILE URL
  // =========================
  const getFileUrl = (file) => {
    if (!file) return "";

    if (
      file.startsWith("http://") ||
      file.startsWith("https://")
    ) {
      return file;
    }

    return `${SERVER_URL}/uploads/${file}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Photos
        </h1>

        <p className="mt-1 text-gray-500">
          Upload and manage photos
        </p>
      </div>

      {/* =========================
          UPLOAD FORM
      ========================= */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Upload Photo
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter photo title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Wedding / Pre Wedding / Birthday"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image
              </label>

              <input
                id="imageInput"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-gray-300 p-2"
              />

              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>

        </form>
      </div>

      {/* =========================
          PHOTO LIST
      ========================= */}
      <div>

        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Uploaded Photos
        </h2>

        {photos.length === 0 ? (

          <div className="rounded-xl bg-white p-8 text-center text-gray-500">
            No photos uploaded yet.
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {photos.map((photo) => (

              <div
                key={photo._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                {/* IMAGE */}
                {photo.image && (
                  <img
                    src={getFileUrl(photo.image)}
                    alt={photo.title}
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-5">

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {photo.title}
                  </h3>

                  {/* CATEGORY */}
                  <p className="mt-1 text-sm text-gray-500">
                    Category: {photo.category}
                  </p>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(photo._id)}
                    className="mt-4 w-full rounded-lg bg-red-500 py-2.5 text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Photos;