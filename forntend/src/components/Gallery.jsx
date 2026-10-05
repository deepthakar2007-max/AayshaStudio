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
  {
    image: img6,
    title: "Couples",
    category: "Couples",
  },
  {
    image: img7,
    title: "Wedding",
    category: "Wedding",
  },
  {
    image: img8,
    title: "Wedding",
    category: "Wedding",
  },
  {
    image: img9,
    title: "Pre-Wedding",
    category: "Pre-Wedding",
  },
  {
    image: img5,
    title: "Pre-Wedding",
    category: "Pre-Wedding",
  },
  {
    image: img4,
    title: "Event",
    category: "Event",
  },
  {
    image: img10,
    title: "Fashion",
    category: "Fashion",
  },
  {
    image: img3,
    title: "Fashion",
    category: "Fashion",
  },
  {
    video: video1,
    title: "Wedding Video",
    category: "Wedding",
    type: "video",
  },
  {
    video: video2,
    title: "Wedding Video",
    category: "Wedding",
    type: "video",
  },
];

function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full bg-white py-20 px-5 sm:px-8 lg:px-12"
    >

      {/* =========================
          SECTION TITLE
      ========================= */}
      <div className="max-w-7xl mx-auto text-center mb-12">

        <p className="text-sm sm:text-base tracking-[0.3em] text-gray-400 uppercase mb-3">
          Our Work
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
          Featured Moments
        </h2>

        <div className="w-16 h-[2px] bg-white mx-auto mt-5" />

      </div>


      {/* =========================
          GALLERY GRID
      ========================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {photos.map((photo, index) => (

          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gray-900 aspect-[4/3] cursor-pointer"
          >

            {/* =========================
                VIDEO
            ========================= */}
            {photo.type === "video" ? (

              <video
                src={photo.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

            ) : (

              /* =========================
                  IMAGE
              ========================= */
              <img
                src={photo.image}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

            )}


            {/* =========================
                DARK OVERLAY
            ========================= */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />


            {/* =========================
                HOVER OVERLAY
            ========================= */}
            <div className="absolute inset-0 flex items-end p-5">

              <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">

                <p className="text-xs uppercase tracking-[0.2em] text-gray-300 mb-1">
                  {photo.category}
                </p>

                <h3 className="text-xl font-semibold text-white">
                  {photo.title}
                </h3>

              </div>

            </div>


            {/* =========================
                VIDEO BADGE
            ========================= */}
            {photo.type === "video" && (
              <div className="absolute top-4 right-4">

                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs">
                  <span className="text-sm">
                    ▶
                  </span>
                  Video
                </span>

              </div>
            )}

          </div>

        ))}

      </div>

    </section>
  );
}

export default Gallery;