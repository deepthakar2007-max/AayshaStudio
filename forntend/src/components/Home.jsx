import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiHeart,
  FiImage,
  FiInstagram,
  FiMapPin,
  FiStar,
  FiUser,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { motion } from "framer-motion";
import "./Home.css";

const services = [
  {
    icon: FiHeart,
    number: "01",
    title: "Wedding Photography",
    text: "Beautifully capture every emotional and memorable moment of your wedding.",
  },
  {
    icon: FiHeart,
    number: "02",
    title: "Pre-Wedding",
    text: "Romantic and creative pre-wedding photography designed specially for couples.",
  },
  {
    icon: FiStar,
    number: "03",
    title: "Birthday Photography",
    text: "Capture smiles, celebrations and unforgettable birthday memories.",
  },
  {
    icon: FiUser,
    number: "04",
    title: "Portrait Photography",
    text: "Professional portraits for personal, professional and creative needs.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    alt: "Wedding couple portrait",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding ceremony details",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    alt: "Wedding celebration",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
    alt: "Couple outdoor portrait",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85",
    alt: "Portrait photography",
    size: "",
  },
];

const testimonials = [
  {
    quote:
      "The photographs captured the little moments we did not even notice on the day. Everything feels natural and timeless.",
    name: "Wedding Client",
    role: "Wedding Session",
  },
  {
    quote:
      "The entire session felt comfortable and well planned. The final photos looked elegant without feeling over-edited.",
    name: "Couple Client",
    role: "Pre-Wedding Session",
  },
  {
    quote:
      "The portraits came out clean, confident and exactly how we imagined them. The whole experience was simple and professional.",
    name: "Portrait Client",
    role: "Portrait Session",
  },
];

const process = [
  "Tell us about your occasion",
  "Choose your photography session",
  "We plan the visual direction",
  "Enjoy the shoot and receive your memories",
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""
        }`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>

      {text ? (
        <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fafaf8] text-zinc-950">
      {/* 1. HERO */}
      <section className="relative border-b border-zinc-200">
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div
              variants={reveal}
              className="mb-7 inline-flex items-center gap-2 border border-zinc-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-600"
            >
              <FiCamera className="text-zinc-900" />
              Capturing your special moments
            </motion.div>

            <motion.h1
              variants={reveal}
              className="text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-zinc-950 sm:text-6xl lg:text-7xl"
            >
              Your moments.
              <span className="mt-2 block text-zinc-500">Our memories.</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-7 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg"
            >
              Professional photography for weddings, pre-weddings, birthdays,
              portraits and every beautiful moment of your life.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                to="/AddBooking"
                className="group inline-flex items-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Book a Session
                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/photos"
                className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
              >
                <FiImage />
                View Photos
              </Link>
            </motion.div>

            <motion.div
              variants={reveal}
              className="mt-10 grid max-w-lg grid-cols-3 border-y border-zinc-200 py-5"
            >
              <div>
                <p className="text-2xl font-semibold tracking-tight">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Personal touch
                </p>
              </div>

              <div className="border-x border-zinc-200 px-5">
                <p className="text-2xl font-semibold tracking-tight">4+</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Session types
                </p>
              </div>

              <div className="pl-5">
                <p className="text-2xl font-semibold tracking-tight">1</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Story at a time
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -left-6 top-8 h-24 w-24 border-l border-t border-zinc-300" />
            <div className="absolute -bottom-6 right-8 h-24 w-24 border-b border-r border-zinc-300" />

            <div className="relative overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi6qVjy62xZaE-mbq2XaC0SpTUCxYFnrePNB_qpepTwg&s=10"
                alt="Camera Image"
                id="hero-img"
                className="h-[560px] w-full object-cover object-center sm:h-[620px]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  Every frame has a story
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO / ABOUT */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              A visual approach
            </p>

            <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
              Simple images.
              <br />
              Real emotions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-8 text-zinc-600 sm:text-base">
              We focus on honest expressions, clean compositions and the
              details that make your story personal. The goal is not just to
              take photographs, but to preserve how the moment felt.
            </p>

            <p className="text-sm leading-8 text-zinc-600 sm:text-base">
              From intimate portraits to full wedding celebrations, every
              session is planned around your comfort, your personality and the
              atmosphere you want to remember.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. SERVICES */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="border-b border-zinc-200"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div variants={reveal}>
            <SectionHeading
              eyebrow="What we do"
              title="Photography that fits the moment."
              text="Choose a session built around the people, atmosphere and memories you want to keep."
            />
          </motion.div>

          <div className="mt-12 grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.article
                  variants={reveal}
                  key={service.number}
                  className="group bg-[#fafaf8] p-7 transition hover:bg-white sm:p-9"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-11 w-11 items-center justify-center border border-zinc-300 bg-white text-zinc-950">
                      <Icon />
                    </div>

                    <span className="text-xs font-medium tracking-[0.18em] text-zinc-400">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-zinc-600">
                    {service.text}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    Explore session
                    <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 4. PROCESS */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="A clear process from booking to final memories."
            text="A simple four-step flow keeps the experience relaxed and focused."
          />

          <div className="mt-12 grid gap-0 md:grid-cols-4">
            {process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l border-zinc-200 px-6 py-2 first:border-l-0 first:pl-0 last:pr-0"
              >
                <span className="text-sm font-semibold text-zinc-400">
                  0{index + 1}
                </span>

                <h3 className="mt-5 max-w-[220px] text-lg font-semibold leading-7">
                  {step}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="A gallery of moments worth keeping."
              text="A clean visual selection across weddings, portraits and celebrations."
            />

            <Link
              to="/photos"
              className="group inline-flex w-fit items-center gap-2 border-b border-zinc-300 pb-1 text-sm font-medium text-zinc-900"
            >
              Open full gallery
              <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.15 }}
                className={`group relative overflow-hidden bg-zinc-100 ${image.size}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.035]"
                  loading={index > 1 ? "lazy" : "eager"}
                  id="image-size"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <FiImage />
                  View moment
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div variants={reveal}>
            <SectionHeading
              eyebrow="Client words"
              title="The experience matters as much as the photographs."
              text="A few words that reflect the kind of calm, personal sessions we aim to create."
              align="center"
            />
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name + testimonial.role}
                variants={reveal}
                className="border border-zinc-200 bg-[#fafaf8] p-7"
              >
                <div className="flex items-center gap-1 text-zinc-900">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="fill-current" size={14} />
                  ))}
                </div>

                <p className="mt-6 text-sm leading-8 text-zinc-700">
                  “{testimonial.quote}”
                </p>

                <div className="mt-7 border-t border-zinc-200 pt-5">
                  <p className="text-sm font-semibold text-zinc-950">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {testimonial.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. STUDIO VALUES */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Why people choose us
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thoughtful photography without the noise.
            </h2>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            {[
              "Natural moments over forced poses",
              "Clean, timeless visual style",
              "Planning that keeps the session relaxed",
              "Attention to people and small details",
            ].map((value) => (
              <div
                key={value}
                className="flex gap-3 border-t border-zinc-200 pt-5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                  <FiCheck size={13} />
                </span>

                <p className="text-sm leading-7 text-zinc-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 text-white lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Your story starts here
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s capture something you&apos;ll want to revisit.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Your special moments deserve to be remembered forever. Tell us
              about your occasion and let&apos;s create photographs that feel
              like you.
            </p>
          </div>

          <Link
            to="/AddBooking"
            className="group inline-flex w-fit items-center gap-3 border border-white/30 px-5 py-3 text-sm font-medium transition hover:border-white hover:bg-white hover:text-zinc-950"
          >
            Book Your Photoshoot
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 9. FOOTER NOTE */}
      <footer className="bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Photography made personal.</p>

          {/* Fixed Social Media Icons */}
          <div className="fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition duration-300 hover:bg-pink-500 hover:text-white"
            >
              <FiInstagram size={18} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition duration-300 hover:bg-green-500 hover:text-white"
            >
              <FaWhatsapp size={18} />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              <FaFacebookF size={17} />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg transition duration-300 hover:bg-red-500 hover:text-white"
            >
              <FaYoutube size={19} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;