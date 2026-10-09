
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiX,
} from "react-icons/fi";

import img4 from "../assets/Fashion Photography1.jfif";
import img3 from "../assets/Portrait.webp";
import img5 from "../assets/photo-1631621583126-ed10a80f62b1.avif";
import img6 from "../assets/cuples.jfif";
import img7 from "../assets/wedding1.jpg";
import img8 from "../assets/wedding.webp";
import img9 from "../assets/pre1.jfif";
import img10 from "../assets/Fashion Photography.jfif";

import video1 from "../assets/1789539025578-546751.mp4";
import video2 from "../assets/1789537449645-975814.mp4";

const photos = [
  { image: img6, title: "Together, Forever", category: "Couples" },
  { image: img7, title: "The Wedding Story", category: "Wedding" },
  { image: img8, title: "A Day to Remember", category: "Wedding" },
  { image: img9, title: "Before the Forever", category: "Pre-Wedding" },
  { image: img5, title: "Golden Hour", category: "Pre-Wedding" },
  { image: img4, title: "The Celebration", category: "Event" },
  { image: img10, title: "Elegance in Motion", category: "Fashion" },
  { image: img3, title: "Beyond the Frame", category: "Portrait" },
  {
    video: video1,
    title: "Wedding Highlights",
    category: "Wedding",
    type: "video",
  },
  {
    video: video2,
    title: "Love in Every Frame",
    category: "Wedding",
    type: "video",
  },
];

const filters = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Couples",
  "Fashion",
  "Portrait",
  "Event",
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "All") return photos;

    return photos.filter(
      (photo) => photo.category === activeFilter
    );
  }, [activeFilter]);

  const openItem = (photo) => {
    setSelectedItem(photo);
  };

  const navigateItem = (direction) => {
    if (!selectedItem) return;

    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo === selectedItem
    );

    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + direction + filteredPhotos.length) %
      filteredPhotos.length;

    setSelectedItem(filteredPhotos[nextIndex]);
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#10100f] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#c7a779]/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-[40%] h-96 w-96 rounded-full bg-[#c7a779]/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c7a779]" />

            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#c7a779] sm:text-sm">
              The Art of Memories
            </span>

            <span className="h-px w-10 bg-[#c7a779]" />
          </div>

          <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Moments That
            <span className="block italic text-[#c7a779]">
              Last Forever.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Every photograph tells a story. Explore our collection
            of beautiful moments, genuine emotions, and timeless art.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40">
            <FiCamera className="text-[#c7a779]" size={17} />
            <span>Captured with emotion</span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-10 flex justify-start gap-2 overflow-x-auto pb-3 sm:mb-12 sm:justify-center sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300 sm:text-sm ${
                activeFilter === filter
                  ? "border-[#c7a779] bg-[#c7a779] text-[#10100f]"
                  : "border-white/10 bg-white/[0.03] text-white/65 hover:border-[#c7a779]/60 hover:text-[#c7a779]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.article
                key={photo.title}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.035,
                  layout: { duration: 0.3 },
                }}
                className={`group relative isolate cursor-pointer overflow-hidden rounded-sm border border-white/[0.08] bg-[#1b1b19] ${
                  index % 5 === 0
                    ? "lg:row-span-1"
                    : ""
                }`}
                onClick={() => openItem(photo)}
              >
                {/* Media */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {photo.type === "video" ? (
                    <video
                      src={photo.video}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={photo.image}
                      alt={photo.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top Category */}
                  <div className="absolute left-4 top-4">
                    <span className="border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                      {photo.category}
                    </span>
                  </div>

                  {/* Video Indicator */}
                  {photo.type === "video" && (
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md">
                      <FiPlay size={16} />
                    </div>
                  )}

                  {/* Bottom Details */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                    <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#d5b78c]">
                        Aaysha Studio
                      </p>

                      <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
                        {photo.title}
                      </h3>
                    </div>

                    <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-[#c7a779] group-hover:bg-[#c7a779] group-hover:text-black">
                      <FiArrowUpRight size={19} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row"
        >
          <p className="text-xs tracking-wide text-white/40 sm:text-sm">
            Every frame holds a memory worth keeping.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#c7a779] transition-colors hover:text-white"
          >
            Create Your Story
            <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setSelectedItem(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <FiX size={22} />
            </button>

            {/* Previous */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                aria-label="Previous item"
                onClick={(event) => {
                  event.stopPropagation();
                  navigateItem(-1);
                }}
                className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-[#c7a779] hover:text-black sm:left-7 sm:h-12 sm:w-12"
              >
                <FiChevronLeft size={24} />
              </button>
            )}

            {/* Preview Content */}
            <motion.div
              key={selectedItem.title}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[88vh] w-full max-w-6xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.video}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] max-w-full rounded-sm object-contain"
                />
              ) : (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[75vh] max-w-full rounded-sm object-contain"
                />
              )}

              <div className="mt-5 text-center">
                <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#c7a779]">
                  {selectedItem.category}
                </p>

                <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>

            {/* Next */}
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                aria-label="Next item"
                onClick={(event) => {
                  event.stopPropagation();
                  navigateItem(1);
                }}
                className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-[#c7a779] hover:text-black sm:right-7 sm:h-12 sm:w-12"
              >
                <FiChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;

