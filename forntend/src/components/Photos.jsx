
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiFilm,
  FiImage,
  FiMaximize2,
  FiPlay,
  FiRefreshCw,
  FiSearch,
  FiX,
} from "react-icons/fi";

const API_URL = "https://aayshastudio.onrender.com/api";
const SERVER_URL = "https://aayshastudio.onrender.com";

/* =====================================
   ANIMATION VARIANTS
===================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =====================================
   REUSABLE EMPTY STATE
===================================== */

function EmptyState({ isVideo, search }) {
  const Icon = isVideo ? FiFilm : FiImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-[#171715] px-6 py-16 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8b477]/25 bg-[#d8b477]/[0.07]">
        <Icon className="text-2xl text-[#d8b477]" />
      </div>

      <h3 className="mt-5 text-lg font-medium text-white">
        {search
          ? "No matching media"
          : `No ${isVideo ? "videos" : "photos"} available`}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-white/45">
        {search
          ? "Try another title or category to find what you are looking for."
          : `Your ${isVideo ? "video" : "photo"} collection will appear here when media is available.`}
      </p>
    </motion.div>
  );
}

/* =====================================
   LOADING SKELETON
===================================== */

function MediaSkeleton({ count = 4, isVideo = false }) {
  return (
    <div
      className={`grid gap-5 ${
        isVideo
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#171715]"
        >
          <div
            className={`animate-pulse bg-white/[0.06] ${
              isVideo ? "h-56" : "h-64"
            }`}
          />

          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.07]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =====================================
   MAIN PHOTOS COMPONENT
===================================== */

export default function Photos() {
  const reduceMotion = useReducedMotion();

  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("photos");
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const videoRefs = useRef([]);
  const requestRef = useRef(null);

  /* =====================================
     FILE URL
  ===================================== */

  const getFileUrl = useCallback((file) => {
    if (!file || typeof file !== "string") return "";

    if (/^https?:\/\//i.test(file)) {
      return file;
    }

    if (file.startsWith("/")) {
      return `${SERVER_URL}${file}`;
    }

    return `${SERVER_URL}/uploads/${file}`;
  }, []);

  /* =====================================
     FETCH PHOTOS AND VIDEOS
  ===================================== */

  const fetchData = useCallback(async (isRefresh = false) => {
    if (requestRef.current) {
      requestRef.current.abort();
    }

    const controller = new AbortController();
    requestRef.current = controller;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const results = await Promise.allSettled([
        axios.get(`${API_URL}/photos`, {
          signal: controller.signal,
        }),
        axios.get(`${API_URL}/videos`, {
          signal: controller.signal,
        }),
      ]);

      if (controller.signal.aborted) return;

      const photoResult = results[0];
      const videoResult = results[1];

      const errors = [];

      if (photoResult.status === "fulfilled") {
        const data = photoResult.value.data;
        const photoList = Array.isArray(data)
          ? data
          : data?.photos;

        setPhotos(Array.isArray(photoList) ? photoList : []);
      } else {
        setPhotos([]);
        errors.push(
          photoResult.reason?.response?.data?.message ||
            "Unable to load photos."
        );
      }

      if (videoResult.status === "fulfilled") {
        const data = videoResult.value.data;
        const videoList = Array.isArray(data)
          ? data
          : data?.videos;

        setVideos(Array.isArray(videoList) ? videoList : []);
      } else {
        setVideos([]);
        errors.push(
          videoResult.reason?.response?.data?.message ||
            "Unable to load videos."
        );
      }

      if (errors.length) {
        setError(errors.join(" "));
      }
    } catch (err) {
      if (err.code !== "ERR_CANCELED") {
        setError(
          err.response?.data?.message ||
            "Unable to connect to the studio server. Please try again."
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();

    return () => {
      requestRef.current?.abort();
    };
  }, [fetchData]);

  /* =====================================
     PAUSE OTHER VIDEOS
  ===================================== */

  const handleVideoPlay = (currentElement) => {
    videoRefs.current.forEach((element) => {
      if (element && element !== currentElement) {
        element.pause();
      }
    });
  };

  /* =====================================
     SEARCH FILTER
  ===================================== */

  const filteredPhotos = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return photos;

    return photos.filter((photo) =>
      `${photo.title || ""} ${photo.category || ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [photos, search]);

  const filteredVideos = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return videos;

    return videos.filter((video) =>
      `${video.title || ""} ${video.category || ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [videos, search]);

  const visibleMedia =
    activeTab === "photos" ? filteredPhotos : filteredVideos;

  const activeCount =
    activeTab === "photos" ? photos.length : videos.length;

  /* =====================================
     PHOTO LIGHTBOX
  ===================================== */

  const openPhoto = (photo) => {
    if (!photo.image) return;
    setSelectedPhoto(photo);
  };

  const currentPhotoIndex = filteredPhotos.findIndex(
    (photo) => photo._id === selectedPhoto?._id
  );

  const changePhoto = (direction) => {
    if (!filteredPhotos.length || currentPhotoIndex < 0) return;

    const nextIndex =
      (currentPhotoIndex + direction + filteredPhotos.length) %
      filteredPhotos.length;

    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowRight") changePhoto(1);
      if (event.key === "ArrowLeft") changePhoto(-1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto, currentPhotoIndex, filteredPhotos]);

  /* =====================================
     RENDER
  ===================================== */

  return (
    <main className="min-h-screen overflow-hidden bg-[#10100f] text-[#f7f3ec]">
      {/* SCROLL PROGRESS */}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: "linear" }}
        className="fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-[#d8b477]"
      />

      {/* =====================================
          HERO HEADER
      ===================================== */}

      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(216,180,119,0.12),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-10 sm:pb-16 sm:pt-24 lg:px-20 lg:pb-20">
          <motion.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-3"
            >
              <FiCamera className="text-lg text-[#d8b477]" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#d8b477] sm:text-xs">
                Aaysha Studio Collection
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
            >
              <div>
                <h1 className="text-5xl font-light leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
                  Moments.
                  <br />
                  <span className="font-serif italic text-[#d8b477]">
                    Made timeless.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
                  Every frame holds a feeling. Explore a collection of
                  photographs and films created to preserve the moments
                  that matter.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="min-w-[115px] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="font-serif text-3xl text-[#d8b477]">
                    {photos.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                    Photographs
                  </p>
                </div>

                <div className="min-w-[115px] border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="font-serif text-3xl text-[#d8b477]">
                    {videos.length.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
                    Films
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          COLLECTION TOOLBAR
      ===================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}

          <div className="inline-flex w-fit gap-1 rounded-xl border border-white/10 bg-[#171715] p-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-medium transition-all duration-300 ${
                activeTab === "photos"
                  ? "bg-[#d8b477] text-[#171511]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <FiImage />
              Photographs
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === "photos"
                    ? "bg-black/10"
                    : "bg-white/[0.07]"
                }`}
              >
                {photos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-medium transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-[#d8b477] text-[#171511]"
                  : "text-white/55 hover:text-white"
              }`}
            >
              <FiFilm />
              Films
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeTab === "videos"
                    ? "bg-black/10"
                    : "bg-white/[0.07]"
                }`}
              >
                {videos.length}
              </span>
            </button>
          </div>

          {/* Search and refresh */}

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex min-w-0 items-center gap-3 border border-white/10 bg-[#171715] px-4 py-3 sm:min-w-[260px]">
              <FiSearch className="shrink-0 text-white/40" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title or category..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-white/50 hover:text-white"
                >
                  <FiX />
                </button>
              )}
            </label>

            <button
              type="button"
              onClick={() => fetchData(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-3 border border-[#d8b477]/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#e9c58b] transition-all duration-300 hover:bg-[#d8b477] hover:text-[#171511] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiRefreshCw
                className={
                  refreshing || loading ? "animate-spin" : ""
                }
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
          <p className="text-xs text-white/45">
            Showing{" "}
            <span className="text-white/80">
              {loading ? "..." : visibleMedia.length}
            </span>{" "}
            {activeTab === "photos" ? "photographs" : "films"}
          </p>

          <p className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/35 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8b477]" />
            The Aaysha Collection
          </p>
        </div>
      </section>

      {/* =====================================
          ERROR MESSAGE
      ===================================== */}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto mb-8 flex max-w-7xl items-start gap-3 border border-red-400/20 bg-red-500/[0.07] px-5 py-4 text-sm text-red-200 sm:mx-10 lg:mx-auto lg:px-6"
            role="alert"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-300/40 text-xs">
              !
            </span>

            <div className="flex-1 leading-6">{error}</div>

            <button
              type="button"
              onClick={() => fetchData(true)}
              className="shrink-0 text-xs underline underline-offset-4"
            >
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          MEDIA COLLECTION
      ===================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-20">
        {loading ? (
          <MediaSkeleton isVideo={activeTab === "videos"} />
        ) : visibleMedia.length === 0 ? (
          <EmptyState
            isVideo={activeTab === "videos"}
            search={search}
          />
        ) : activeTab === "photos" ? (
          <motion.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.article
                key={photo._id || photo.image || index}
                variants={fadeUp}
                layout
                className="group relative overflow-hidden border border-white/[0.08] bg-[#171715]"
              >
                {/* Photo */}

                <button
                  type="button"
                  onClick={() => openPhoto(photo)}
                  disabled={!photo.image}
                  aria-label={`View ${photo.title || "photograph"}`}
                  className="relative block w-full overflow-hidden bg-[#222220] text-left disabled:cursor-default"
                >
                  {photo.image ? (
                    <motion.img
                      whileHover={reduceMotion ? {} : { scale: 1.055 }}
                      transition={{ duration: 0.7 }}
                      src={getFileUrl(photo.image)}
                      alt={photo.title || "Aaysha Studio photograph"}
                      loading="lazy"
                      className="h-64 w-full object-cover sm:h-72"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-sm text-white/35 sm:h-72">
                      No image available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    {photo.category || "Photography"}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center border border-white/35 bg-black/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <FiMaximize2 />
                  </span>

                  <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.2em] text-white/65">
                    Frame {String(index + 1).padStart(2, "0")}
                  </span>
                </button>

                {/* Details */}

                <div className="p-5">
                  <h3 className="truncate text-base font-medium text-white transition-colors group-hover:text-[#e9c58b]">
                    {photo.title || "Untitled Photograph"}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
                    <p className="truncate text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {photo.category || "Uncategorized"}
                    </p>

                    <FiArrowRight className="shrink-0 text-sm text-[#d8b477] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredVideos.map((video, index) => (
              <motion.article
                key={video._id || video.video || index}
                variants={fadeUp}
                layout
                className="group overflow-hidden border border-white/[0.08] bg-[#171715]"
              >
                {/* Video */}

                <div className="relative overflow-hidden bg-black">
                  {video.video ? (
                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element;
                      }}
                      src={getFileUrl(video.video)}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={(event) =>
                        handleVideoPlay(event.currentTarget)
                      }
                      className="h-60 w-full object-contain sm:h-72"
                    />
                  ) : (
                    <div className="flex h-60 items-center justify-center text-sm text-white/35">
                      No video available
                    </div>
                  )}

                  <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    <FiPlay className="text-[#e9c58b]" />
                    Studio Film
                  </span>
                </div>

                {/* Details */}

                <div className="p-5">
                  <h3 className="truncate text-base font-medium text-white transition-colors group-hover:text-[#e9c58b]">
                    {video.title || "Untitled Film"}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
                    <p className="truncate text-[10px] uppercase tracking-[0.15em] text-white/40">
                      {video.category || "Uncategorized"}
                    </p>

                    <span className="shrink-0 text-[9px] uppercase tracking-[0.15em] text-[#d8b477]">
                      Film {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </section>

      {/* =====================================
          PHOTO LIGHTBOX
      ===================================== */}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photograph preview"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close image preview"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/[0.05] text-white transition-colors hover:bg-white/15"
            >
              <FiX className="text-xl" />
            </button>

            {filteredPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    changePhoto(-1);
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/15 sm:left-6"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    changePhoto(1);
                  }}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/15 sm:right-6"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </>
            )}

            <motion.div
              key={selectedPhoto._id || selectedPhoto.image}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-full w-full max-w-6xl flex-col items-center"
            >
              <img
                src={getFileUrl(selectedPhoto.image)}
                alt={selectedPhoto.title || "Selected photograph"}
                className="max-h-[75vh] max-w-full object-contain"
              />

              <div className="mt-5 flex w-full max-w-4xl flex-col justify-between gap-3 border-t border-white/15 pt-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-medium text-white sm:text-lg">
                    {selectedPhoto.title || "Untitled Photograph"}
                  </h2>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#d8b477]">
                    {selectedPhoto.category || "Photography"}
                  </p>
                </div>

                <p className="text-xs text-white/45">
                  {currentPhotoIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          BOTTOM SIGNATURE
      ===================================== */}

      <footer className="border-t border-white/[0.08] bg-[#0b0b0a] px-6 py-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-light tracking-[0.25em]">
              AAYSHA
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.45em] text-[#d8b477]">
              Studio
            </p>
          </div>

          <p className="text-[10px] leading-6 text-white/35 sm:text-xs">
            Every frame holds a feeling. Every memory tells a story.
          </p>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#d8b477] transition-colors hover:text-white"
          >
            Back to top
            <FiArrowDown className="rotate-180" />
          </a>
        </div>
      </footer>
    </main>
  );
}

