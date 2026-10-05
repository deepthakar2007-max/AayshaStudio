import { useState } from "react";

const Addvideo = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !video) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("video", video);

      const response = await fetch(
        "https://aayshastudio.onrender.com/api/videos",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = "Video upload failed";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Response JSON nahi hai
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      console.log("Upload response:", data);

      alert("Video uploaded successfully!");

      // Clear form
      setTitle("");
      setCategory("");
      setVideo(null);

      // Clear file input
      document.getElementById("videoInput").value = "";
    } catch (error) {
      console.error("Upload error:", error);

      alert(error.message || "Video upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-10">

      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Admin Panel
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Add Video
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Upload a new video to your photography gallery.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Video Title
              </label>

              <input
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Category
              </label>

              <input
                type="text"
                placeholder="e.g. Wedding, Pre-Wedding, Fashion"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Select Video
              </label>

              <label
                htmlFor="videoInput"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 px-6 py-10 text-center transition hover:border-zinc-500 hover:bg-zinc-900 ${
                  loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >

                <div className="mb-3 text-4xl">
                  🎬
                </div>

                <p className="text-sm font-medium text-zinc-300">
                  Click to select a video
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  MP4, WebM, MOV and other video formats
                </p>

                <input
                  id="videoInput"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    if (selectedFile) {
                      setVideo(selectedFile);
                    }
                  }}
                  disabled={loading}
                />

              </label>
            </div>

            {/* Preview */}
            {video && (
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

                <div className="border-b border-zinc-800 px-4 py-3">
                  <p className="text-sm font-medium text-zinc-300">
                    Video Preview
                  </p>
                </div>

                <div className="p-4">

                  <video
                    src={URL.createObjectURL(video)}
                    className="max-h-[400px] w-full rounded-lg object-contain"
                    controls
                    muted
                  />

                  <div className="mt-3 flex items-center justify-between gap-3">

                    <p className="truncate text-sm text-zinc-400">
                      {video.name}
                    </p>

                    <span className="shrink-0 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      {(video.size / (1024 * 1024)).toFixed(2)} MB
                    </span>

                  </div>

                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {loading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-black"></span>
                  Uploading...
                </>
              ) : (
                "Upload Video"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Addvideo;