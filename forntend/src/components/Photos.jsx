
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = "https://aayshastudio.onrender.com/api";
const SERVER_URL = "https://aayshastudio.onrender.com";

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // VIDEO REFERENCES
  // =========================
  const videoRefs = useRef([]);

  // =========================
  // GET PHOTOS
  // =========================
  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/photos`);

      console.log("PHOTOS API:", response.data);

      setPhotos(response.data.photos || []);
    } catch (error) {
      console.log("GET PHOTOS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load photos"
      );
    }
  };

  // =========================
  // GET VIDEOS
  // =========================
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/videos`);

      console.log("VIDEOS API:", response.data);

      setVideos(response.data.videos || []);
    } catch (error) {
      console.log("GET VIDEOS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load videos"
      );
    }
  };

  // =========================
  // GET ALL DATA
  // =========================
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      await Promise.all([
        fetchPhotos(),
        fetchVideos(),
      ]);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Photos & Videos
          </h1>

          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Manage your uploaded media
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium transition duration-200 disabled:opacity-50"
        >
          <span>↻</span>
          {loading ? "Loading..." : "Refresh"}
        </button>

      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}
      {loading ? (

        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm p-16">

          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>

          <p className="mt-4 text-slate-500 text-sm">
            Loading photos and videos...
          </p>

        </div>

      ) : (

        <div className="space-y-10">

          {/* =========================
              PHOTOS SECTION
          ========================= */}
          <section>

            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  📷
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Photos
                  </h2>

                  <p className="text-xs text-slate-500">
                    Uploaded photo collection
                  </p>
                </div>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                {photos.length} Photos
              </span>

            </div>

            {photos.length === 0 ? (

              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

                <div className="text-4xl mb-3">
                  📷
                </div>

                <h3 className="font-semibold text-slate-700">
                  No Photos Found
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  There are no uploaded photos yet.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                {photos.map((photo) => (

                  <div
                    key={photo._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="relative overflow-hidden bg-slate-200">

                      {photo.image ? (
                        <img
                          src={getFileUrl(photo.image)}
                          alt={
                            photo.title || "Photo"
                          }
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-56 flex items-center justify-center text-slate-400">
                          No Image
                        </div>
                      )}

                      {/* CATEGORY BADGE */}
                      <div className="absolute top-3 left-3">

                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs">
                          {photo.category ||
                            "No Category"}
                        </span>

                      </div>

                    </div>

                    {/* DETAILS */}
                    <div className="p-4">

                      <h3 className="font-semibold text-slate-800 truncate">
                        {photo.title ||
                          "Untitled"}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        Category:{" "}
                        {photo.category ||
                          "No Category"}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* =========================
              VIDEOS SECTION
          ========================= */}
          <section>

            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  🎬
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Videos
                  </h2>

                  <p className="text-xs text-slate-500">
                    Uploaded video collection
                  </p>
                </div>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                {videos.length} Videos
              </span>

            </div>

            {videos.length === 0 ? (

              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

                <div className="text-4xl mb-3">
                  🎬
                </div>

                <h3 className="font-semibold text-slate-700">
                  No Videos Found
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  There are no uploaded videos yet.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {videos.map((video, index) => (

                  <div
                    key={video._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >

                    {/* VIDEO */}
                    <div className="relative bg-black">

                      {video.video ? (
                        <video
                          ref={(element) => {
                            videoRefs.current[index] =
                              element;
                          }}
                          src={getFileUrl(
                            video.video
                          )}
                          controls
                          preload="metadata"
                          onPlay={() =>
                            handleVideoPlay(index)
                          }
                          className="w-full h-60 object-cover"
                        />
                      ) : (
                        <div className="w-full h-60 flex items-center justify-center text-white">
                          No Video
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="p-4">

                      <h3 className="font-semibold text-slate-800 truncate">
                        {video.title ||
                          "Untitled"}
                      </h3>

                      <div className="flex items-center justify-between mt-2">

                        <p className="text-xs text-slate-500">
                          Category:{" "}
                          {video.category ||
                            "No Category"}
                        </p>

                        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                          Video
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        </div>

      )}

    </div>
  );
}

export default Photos;
