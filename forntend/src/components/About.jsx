import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-white-950 text-black overflow-hidden">

      {/* ================= ABOUT HERO ================= */}

      <section className="relative min-h-[90vh] flex items-center px-6 sm:px-10 lg:px-20 py-20">

        {/* Background Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Hero Content */}
          <div className="animate-[fadeIn_0.8s_ease-out]">

            <p className="text-sm font-semibold tracking-[0.3em] text-indigo-400 mb-5">
              ABOUT OUR STUDIO
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              We Capture
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beautiful Stories.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-gray-400 text-base sm:text-lg leading-8">
              We believe every photograph has a story.
              Our goal is to capture your emotions,
              happiness and special moments that you can
              remember forever.
            </p>

            <div className="mt-8">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-indigo-500/50"
              >
                Book Your Session
                <span>→</span>
              </Link>
            </div>

          </div>


          {/* Camera Image */}
          <div className="relative flex justify-center">

            <div className="absolute w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-1">

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi6qVjy62xZaE-mbq2XaC0SpTUCxYFnrePNB_qpepTwg&s=10"
                alt="Camera"
                className="w-full max-w-md h-[420px] object-cover rounded-2xl"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= OUR STORY ================= */}

      <section className="relative px-6 sm:px-10 lg:px-20 py-24 bg-slate-900/50">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Story Image */}
          <div className="relative order-2 lg:order-1">

            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSmKxUkVSwLqUn8aQt7rSiypvUfka_DLJJ0lC35q-vQ&s=10"
                alt="Our Story"
                className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>

          </div>


          {/* Story Content */}
          <div className="order-1 lg:order-2">

            <p className="text-sm font-semibold tracking-[0.3em]  mb-5">
              OUR STORY
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              More Than Just
              <br />
              <span>
                Photography
              </span>
            </h2>

            <p className="mt-7 text-gray-400 leading-8">
              Our Photo Studio is dedicated to creating
              high-quality photography experiences for
              individuals, families and businesses.
            </p>

            <p className="mt-5 text-gray-400 leading-8">
              From wedding celebrations to professional
              portraits, we focus on natural expressions,
              creative compositions and beautiful lighting.
            </p>

            <Link
              to="/booking"
              className="inline-flex mt-8 items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-6 py-3 font-semibold text-indigo-300 transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:-translate-y-1"
            >
              Book Your Session
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* ================= WHY US ================= */}

      <section className="px-6 sm:px-10 lg:px-20 py-24">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-sm font-semibold tracking-[0.3em] text-indigo-400">
            WHY CHOOSE US
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            What Makes Us Different?
          </h2>

          <p className="mt-5 text-gray-400">
            We combine professional equipment, creativity
            and passion to create memorable photographs.
          </p>

        </div>


        {/* Cards */}
        <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-indigo-500/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              📷
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Professional Quality
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              High-quality photography with professional
              equipment and creative techniques.
            </p>

          </div>


          {/* Card 2 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-pink-500/40 hover:bg-pink-500/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              ❤️
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Passion
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              We love photography and put creativity
              and passion into every photograph.
            </p>

          </div>


          {/* Card 3 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-purple-500/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              ✨
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Creative Ideas
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Unique concepts and creative ideas to make
              your photos special.
            </p>

          </div>


          {/* Card 4 */}
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:bg-emerald-500/10">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
              😊
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Happy Customers
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Customer satisfaction is always our
              first priority.
            </p>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="relative px-6 sm:px-10 lg:px-20 py-20 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950">

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          {/* Stat 1 */}
          <div className="group">
            <h2 className="text-4xl sm:text-5xl font-bold text-indigo-400 transition-transform duration-300 group-hover:scale-110">
              500+
            </h2>

            <p className="mt-3 text-gray-400">
              Happy Customers
            </p>
          </div>


          {/* Stat 2 */}
          <div className="group">
            <h2 className="text-4xl sm:text-5xl font-bold text-purple-400 transition-transform duration-300 group-hover:scale-110">
              1000+
            </h2>

            <p className="mt-3 text-gray-400">
              Photoshoots
            </p>
          </div>


          {/* Stat 3 */}
          <div className="group">
            <h2 className="text-4xl sm:text-5xl font-bold text-pink-400 transition-transform duration-300 group-hover:scale-110">
              10+
            </h2>

            <p className="mt-3 text-gray-400">
              Years Experience
            </p>
          </div>


          {/* Stat 4 */}
          <div className="group">
            <h2 className="text-4xl sm:text-5xl font-bold text-emerald-400 transition-transform duration-300 group-hover:scale-110">
              100%
            </h2>

            <p className="mt-3 text-gray-400">
              Passion
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;