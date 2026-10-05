import { useState } from "react";

const AddPhoto = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", image);

      const response = await fetch(
        "http://localhost:4000/api/photos",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage = "Photo upload failed";

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

      alert("Photo uploaded successfully!");

      // Clear form
      setTitle("");
      setCategory("");
      setImage(null);

      // Clear file input
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error("Upload error:", error);

      alert(error.message || "Photo upload failed");
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
            Add Photo
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Upload a new photo to your photography gallery.
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
                Photo Title
              </label>

              <input
                type="text"
                placeholder="Enter photo title"
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

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Select Image
              </label>

              <label
                htmlFor="imageInput"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 px-6 py-10 text-center transition hover:border-zinc-500 hover:bg-zinc-900 ${
                  loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >

                <div className="mb-3 text-4xl">
                  🖼️
                </div>

                <p className="text-sm font-medium text-zinc-300">
                  Click to select an image
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  JPG, JPEG, PNG, WEBP and other image formats
                </p>

                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];

                    if (selectedFile) {
                      setImage(selectedFile);
                    }
                  }}
                  disabled={loading}
                />

              </label>
            </div>

            {/* Preview */}
            {image && (
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

                <div className="border-b border-zinc-800 px-4 py-3">
                  <p className="text-sm font-medium text-zinc-300">
                    Image Preview
                  </p>
                </div>

                <div className="p-4">

                  <div className="overflow-hidden rounded-lg bg-black">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="max-h-[400px] w-full object-contain"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">

                    <p className="truncate text-sm text-zinc-400">
                      {image.name}
                    </p>

                    <span className="shrink-0 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                      {(image.size / (1024 * 1024)).toFixed(2)} MB
                    </span>

                  </div>

                </div>
              </div>
            )}

            {/* Submit Button */}
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
                "Upload Photo"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;