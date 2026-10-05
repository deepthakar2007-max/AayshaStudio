
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "https://aayshastudio.onrender.com/api/videos";
const SERVER_URL = "https://aayshastudio.onrender.com";

function Videos() {
  const [videos, setVideos] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    video: null,
  });

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // STORE ALL VIDEO ELEMENTS
  // =========================
  const videoRefs = useRef([]);

  // =========================
  // GET ALL VIDEOS
  // =========================
  const fetchVideos = async () => {
    try {
      const response = await axios.get(API_URL);

      console.log("VIDEOS:", response.data);

      setVideos(response.data.videos || []);
    } catch (error) {
      console.log("GET VIDEOS ERROR:", error);

      setVideos([]);
    }
  };

  // =========================
  // LOAD VIDEOS
  // =========================
  useEffect(() => {
    fetchVideos();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE VIDEO FILE
  // =========================
  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      video: file,
    }));
  };

  // =========================
  // PLAY ONLY ONE VIDEO
  // =========================
  const handleVideoPlay = (currentIndex) => {
    videoRefs.current.forEach((videoElement, index) => {
      if (videoElement && index !== currentIndex) {
        videoElement.pause();
      }
    });
  };

  // =========================
  // ADD VIDEO
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter video title");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter category");
      return;
    }

    if (!formData.video) {
      alert("Please select a video");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("video", formData.video);

      const response = await axios.post(API_URL, data);

      console.log("UPLOAD RESPONSE:", response.data);

      alert(
        response.data.message ||
          "Video uploaded successfully"
      );

      // Reset form
      setFormData({
        title: "",
        category: "",
        video: null,
      });

      // Reset file input
      const videoInput =
        document.getElementById("videoInput");

      if (videoInput) {
        videoInput.value = "";
      }

      // Close form
      setShowForm(false);

      // Refresh videos
      fetchVideos();
    } catch (error) {
      console.log("UPLOAD VIDEO ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to upload video"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE VIDEO
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/${id}`
      );

      alert(
        response.data.message ||
          "Video deleted successfully"
      );

      fetchVideos();
    } catch (error) {
      console.log("DELETE VIDEO ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete video"
      );
    }
  };

  // =========================
  // VIDEO URL
  // =========================
  const getVideoUrl = (video) => {
    if (!video) {
      return "";
    }

    if (
      video.startsWith("http://") ||
      video.startsWith("https://")
    ) {
      return video;
    }

    return `${SERVER_URL}/uploads/${video}`;
  };

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Videos
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all uploaded videos
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {showForm ? "Close" : "+ Add Video"}
        </button>

      </div>

      {/* =========================
          ADD VIDEO FORM
      ========================= */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Upload New Video
          </h2>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter video title"
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

            </div>

            {/* CATEGORY */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Wedding / Pre Wedding / Birthday"
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

            </div>

            {/* VIDEO */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Video
              </label>

              <input
                id="videoInput"
                type="file"
                name="video"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg p-2 disabled:bg-gray-100"
              />

              {formData.video && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {formData.video.name}
                </p>
              )}

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Uploading..."
                : "Upload Video"}
            </button>

          </form>

        </div>
      )}

      {/* =========================
          TOTAL VIDEOS
      ========================= */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <p className="text-sm text-gray-500">
          Total Videos
        </p>

        <p className="text-3xl font-bold text-gray-800 mt-1">
          {videos.length}
        </p>

      </div>

      {/* =========================
          VIDEO GRID
      ========================= */}
      {videos.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {videos.map((video, index) => (

            <div
              key={video._id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
            >

              {/* VIDEO */}
              <div className="relative bg-black">

                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={getVideoUrl(video.video)}
                  controls
                  preload="metadata"
                  onPlay={() => handleVideoPlay(index)}
                  className="w-full h-52 object-cover"
                />

              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h3 className="font-semibold text-gray-800 text-lg">
                  {video.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Category: {video.category}
                </p>

                <p className="text-xs text-gray-400 mt-1 break-all">
                  ID: {video._id}
                </p>

                {/* DELETE */}
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(video._id)
                  }
                  className="w-full mt-4 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">

          <div className="text-5xl mb-4">
            🎥
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No Videos Found
          </h3>

          <p className="text-gray-500 mt-1">
            Add your first video to get started.
          </p>

        </div>

      )}

    </div>
  );
}

export default Videos;



