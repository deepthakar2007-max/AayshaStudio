import { useState } from "react";

import img4 from "./../../../../forntend/src/assets/Fashion Photography1.jfif";
import img3 from "./../../../../forntend/src/assets/Portrait.webp";
import img5 from "./../../../../forntend/src/assets/photo-1631621583126-ed10a80f62b1.avif";
import img6 from "./../../../../forntend/src/assets/cuples.jfif";
import img7 from "./../../../../forntend/src/assets/wedding1.jpg";
import img8 from "./../../../../forntend/src/assets/wedding.webp";
import img9 from "./../../../../forntend/src/assets/pre1.jfif";
import img10 from "./../../../../forntend/src/assets/Fashion Photography.jfif";

import video1 from "./../../../../forntend/src/assets/1789539025578-546751.mp4";
import video2 from "./../../../../forntend/src/assets/1789537449645-975814.mp4";

const galleryData = [
  {
    id: 1,
    image: img6,
    title: "Couples",
    category: "Couples",
    type: "photo",
  },
  {
    id: 2,
    image: img7,
    title: "Wedding",
    category: "Wedding",
    type: "photo",
  },
  {
    id: 3,
    image: img8,
    title: "Wedding",
    category: "Wedding",
    type: "photo",
  },
  {
    id: 4,
    image: img9,
    title: "Pre-Wedding",
    category: "Pre-Wedding",
    type: "photo",
  },
  {
    id: 5,
    image: img5,
    title: "Pre-Wedding",
    category: "Pre-Wedding",
    type: "photo",
  },
  {
    id: 6,
    image: img4,
    title: "Event",
    category: "Event",
    type: "photo",
  },
  {
    id: 7,
    image: img10,
    title: "Fashion",
    category: "Fashion",
    type: "photo",
  },
  {
    id: 8,
    image: img3,
    title: "Fashion",
    category: "Fashion",
    type: "photo",
  },
  {
    id: 9,
    video: video1,
    title: "Wedding Video",
    category: "Wedding",
    type: "video",
  },
  {
    id: 10,
    video: video2,
    title: "Wedding Video",
    category: "Wedding",
    type: "video",
  },
];

function Gallery() {
  const [gallery, setGallery] = useState(galleryData);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addType, setAddType] = useState("photo");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // =========================
  // DELETE ITEM
  // =========================
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    setGallery((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =========================
  // OPEN ADD FORM
  // =========================
  const openAddForm = (type) => {
    setAddType(type);
    setTitle("");
    setCategory("");
    setFile(null);
    setShowAddForm(true);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeAddForm = () => {
    setShowAddForm(false);
    setTitle("");
    setCategory("");
    setFile(null);
  };

  // =========================
  // ADD ITEM
  // =========================
  const handleAdd = (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim() || !file) {
      alert("Please fill all fields");
      return;
    }

    const fileURL = URL.createObjectURL(file);

    const newItem = {
      id: Date.now(),
      title: title,
      category: category,
      type: addType,
    };

    if (addType === "photo") {
      newItem.image = fileURL;
    } else {
      newItem.video = fileURL;
    }

    setGallery((prev) => [
      newItem,
      ...prev,
    ]);

    alert(
      `${addType === "photo" ? "Photo" : "Video"} added successfully!`
    );

    closeAddForm();
  };

  return (
    <div className="min-h-screen bg-zinc-150 px-4 py-8 text-black  sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
              Admin Panel
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Gallery Management
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Manage your photos and videos
            </p>
          </div>

          {/* =========================
              ADD BUTTONS
          ========================= */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => openAddForm("photo")}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              + Add Photo
            </button>

            <button
              onClick={() => openAddForm("video")}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              + Add Video
            </button>

          </div>

        </div>

        {/* =========================
            ADD FORM
        ========================= */}
        {showAddForm && (

          <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-100 p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Add New
                </p>

                <h2 className="mt-1 text-2xl font-semibold">
                  Add {addType === "photo" ? "Photo" : "Video"}
                </h2>
              </div>

              <button
                onClick={closeAddForm}
                className="rounded-lg bg-zinc-800 px-3 py-2 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleAdd}
              className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            >

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder={
                    addType === "photo"
                      ? "Enter photo title"
                      : "Enter video title"
                  }
                  className="w-full rounded-xl border border-zinc-700  px-4 py-3 text-sm text-black outline-none placeholder:text-zinc-600 focus:border-zinc-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  placeholder="Wedding, Fashion, Event..."
                  className="w-full rounded-xl border border-zinc-700  px-4 py-3 text-sm text-black outline-none placeholder:text-zinc-600 focus:border-zinc-400"
                />
              </div>

              {/* File */}
              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm text-zinc-400">
                  Select{" "}
                  {addType === "photo"
                    ? "Image"
                    : "Video"}
                </label>

                <input
                  type="file"
                  accept={
                    addType === "photo"
                      ? "image/*"
                      : "video/*"
                  }
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                  className="w-full rounded-xl border border-zinc-700  p-4 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:border-zinc-500"
                />

              </div>

              {/* Preview */}
              {file && (

                <div className="lg:col-span-2">

                  <p className="mb-2 text-sm text-zinc-400">
                    Preview
                  </p>

                  <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">

                    {addType === "photo" ? (

                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="max-h-[350px] w-full object-contain"
                      />

                    ) : (

                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="max-h-[350px] w-full object-contain"
                      />

                    )}

                  </div>

                  <p className="mt-2 truncate text-xs text-zinc-500">
                    {file.name}
                  </p>

                </div>

              )}

              {/* Buttons */}
              <div className="flex gap-3 lg:col-span-2">

                <button
                  type="button"
                  onClick={closeAddForm}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Add{" "}
                  {addType === "photo"
                    ? "Photo"
                    : "Video"}
                </button>

              </div>

            </form>

          </div>

        )}

        {/* =========================
            COUNTERS
        ========================= */}
        <div className="mb-8 flex flex-wrap gap-3">

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <p className="text-xs text-zinc-500">
              Total
            </p>

            <p className="mt-1 text-xl font-bold text-white">
              {gallery.length}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <p className="text-xs text-zinc-500">
              Photos
            </p>

            <p className="mt-1 text-xl font-bold text-white ">
              {
                gallery.filter(
                  (item) => item.type === "photo"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <p className="text-xs text-zinc-500">
              Videos
            </p>

            <p className="mt-1 text-xl font-bold text-white">
              {
                gallery.filter(
                  (item) => item.type === "video"
                ).length
              }
            </p>
          </div>

        </div>

        {/* =========================
            GALLERY
        ========================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {gallery.map((item) => (

            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl text-black border border-zinc-800 bg-zinc-100 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
            >

              {/* MEDIA */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">

                {item.type === "video" ? (

                  <video
                    src={item.video}
                    controls
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                ) : (

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                )}

                {/* TYPE BADGE */}
                <div className="absolute left-3 top-3">

                  <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {item.type === "video"
                      ? "▶ Video"
                      : "Photo"}
                  </span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="p-5">

                <div className="mb-4">

                  <p className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
                    {item.category}
                  </p>

                  <h3 className="text-lg font-semibold text-black">
                    {item.title}
                  </h3>

                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="flex-1 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* EMPTY STATE */}
        {gallery.length === 0 && (

          <div className="mt-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 py-20 text-center">

            <div className="mb-4 text-5xl">
              🖼️
            </div>

            <h2 className="text-xl font-semibold">
              Gallery Empty
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              No photos or videos available.
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

export default Gallery;