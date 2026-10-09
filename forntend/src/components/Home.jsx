import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiHeart,
  FiImage,
  FiInstagram,
  FiStar,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import "./Home.css";

/* =========================
   HOME PAGE DATA
========================= */

const services = [
  {
    number: "01",
    title: "Wedding Photography",
    description:
      "Every emotion, every ritual, every beautiful moment — captured forever.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    tag: "YOUR BIG DAY",
  },
  {
    number: "02",
    title: "Pre-Wedding",
    description:
      "Beautiful stories of love, captured in locations that feel like a dream.",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85",
    tag: "LOVE STORIES",
  },
  {
    number: "03",
    title: "Birthday Photography",
    description:
      "From the first smile to the happiest celebrations, keep every memory.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=85",
    tag: "HAPPY MOMENTS",
  },
  {
    number: "04",
    title: "Portrait Photography",
    description:
      "Natural expressions, personal stories and portraits that feel like you.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    tag: "BE YOURSELF",
  },
];

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    title: "Forever Begins",
    category: "Wedding",
    size: "md:row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
    title: "A Beautiful Bond",
    category: "Couple",
    size: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    title: "The Celebration",
    category: "Wedding",
    size: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=85",
    title: "A Moment Together",
    category: "Couple",
    size: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
    title: "The Special Day",
    category: "Celebration",
    size: "md:col-span-2",
  },
];

const testimonials = [
  {
    name: "Happy Couple",
    role: "Wedding Photography",
    review:
      "The team captured our special day beautifully. Every photograph brings back the emotions and happiness of that moment.",
  },
  {
    name: "A Happy Family",
    role: "Family Photography",
    review:
      "The experience was comfortable and professional. The photographs are memories we will cherish for years.",
  },
  {
    name: "Our Happy Clients",
    role: "Pre-Wedding Photography",
    review:
      "From planning to the final photographs, everything felt special. The pictures tell our story exactly as we imagined.",
  },
];

const process = [
  {
    number: "01",
    title: "Let's Connect",
    description:
      "Tell us about your event, your ideas and the moments you want to remember.",
  },
  {
    number: "02",
    title: "Plan Your Shoot",
    description:
      "We plan the details, locations and creative direction around your vision.",
  },
  {
    number: "03",
    title: "Capture Moments",
    description:
      "Enjoy your special day while we capture genuine emotions and beautiful details.",
  },
  {
    number: "04",
    title: "Relive Forever",
    description:
      "Receive your photographs and revisit those beautiful memories anytime.",
  },
];

/* =========================
   SLOW ANIMATION VARIANTS
========================= */

const reveal = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.12,
    },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    clipPath: "inset(8% 0 8% 0)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0 0% 0)",
    transition: {
      duration: 1.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const smoothHover = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

/* =========================
   REUSABLE SECTION HEADING
========================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reveal}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -40px 0px",
      }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className={`mb-4 text-xs font-semibold uppercase tracking-[0.32em] ${
          light ? "text-amber-300" : "text-amber-700"
        }`}
      >
        {eyebrow}
      </motion.p>

      <h2
        className={`text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-zinc-900"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base ${
            light ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================
   MAIN HOME COMPONENT
========================= */

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/919999999999",
    },
    {
      icon: <FiInstagram />,
      label: "Instagram",
      href: "https://www.instagram.com/",
    },
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: "https://www.facebook.com/",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: "https://www.youtube.com/",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#fafaf8] text-zinc-900">

      {/* =========================
          SLOW CINEMATIC INTRO
      ========================= */}

      <AnimatePresence>
        {!shouldReduceMotion && !introComplete && (
          <motion.div
            key="curtain-overlay"
            className="pointer-events-none fixed inset-0 z-[9999] flex"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Left curtain */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 2.8,
                delay: 0.55,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => setIntroComplete(true)}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#111111]"
            />

            {/* Right curtain */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 2.8,
                delay: 0.55,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ transformOrigin: "right center" }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#111111]"
            />

            {/* Brand mark */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 12,
              }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                scale: [0.92, 1, 1, 1, 0.98],
                y: [12, 0, 0, 0, -5],
              }}
              transition={{
                duration: 2.8,
                delay: 0.1,
                times: [0, 0.18, 0.48, 0.72, 1],
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { rotate: [0, -5, 5, 0] }
                  }
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <FiCamera className="mx-auto mb-5 text-3xl text-amber-300 sm:text-4xl" />
                </motion.div>

                <p className="text-2xl font-light tracking-[0.28em] sm:text-5xl">
                  AAYSHA
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-zinc-400 sm:text-xs sm:tracking-[0.55em]">
                  Studio · Stories · Memories
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4,
                    ease: "easeInOut",
                  }}
                  className="mx-auto mt-6 h-px w-24 origin-center bg-amber-300"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          TOP ACCENT
      ========================= */}

      <div className="fixed left-0 top-0 z-[100] h-[2px] w-full bg-amber-600/20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
          className="h-full w-full bg-amber-600"
        />
      </div>

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-zinc-950 md:min-h-screen">

        {/* Background image */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  scale: 1.1,
                  opacity: 0,
                }
          }
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 3,
            delay: shouldReduceMotion ? 0 : 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Wedding photography"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Hero content */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: shouldReduceMotion ? 0 : 1.3,
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.45,
                delayChildren: 0.2,
              },
            },
          }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
        >
          <motion.p
            variants={reveal}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300 sm:text-sm"
          >
            Every Picture Tells A Story
          </motion.p>

          <motion.h1
            variants={reveal}
            className="max-w-4xl text-5xl font-light leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            We Capture
            <br />
            <span className="font-serif italic text-amber-300">
              Your Emotions.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-7 max-w-xl text-sm leading-7 text-zinc-200 sm:text-base md:text-lg"
          >
            Life moves forward, but beautiful photographs let you relive the
            moments that matter most. Let us tell your story.
          </motion.p>

          <motion.div
            variants={reveal}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/AddBooking"
              className="group inline-flex items-center gap-3 bg-amber-600 px-7 py-4 text-sm font-medium text-white transition-colors duration-700 hover:bg-amber-700"
            >
              Book Your Session
              <motion.span
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                transition={smoothHover}
              >
                <FiArrowRight />
              </motion.span>
            </Link>

            <Link
              to="/photos"
              className="inline-flex items-center gap-3 border border-white/50 px-7 py-4 text-sm font-medium text-white transition-all duration-700 hover:border-white hover:bg-white hover:text-zinc-900"
            >
              Explore Our Work
              <FiImage />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-8 hidden items-center gap-4 text-white/60 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll to explore
          </span>

          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : { scaleY: [0, 1, 0] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.4,
            }}
            className="h-14 w-px origin-top bg-amber-300"
          />
        </div>
      </section>

      {/* =========================
          INTRO SECTION
      ========================= */}

      <section className="px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 md:gap-20">

          <motion.div
            variants={imageReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-zinc-200">
              <motion.img
                whileHover={shouldReduceMotion ? {} : { scale: 1.035 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85"
                alt="A couple sharing a special moment"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.1 }}
              className="absolute -bottom-6 -right-3 max-w-[230px] bg-white p-6 shadow-xl sm:-right-6"
            >
              <FiHeart className="mb-3 text-2xl text-amber-700" />
              <p className="font-serif text-xl italic text-zinc-900">
                Memories that last forever.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              variants={reveal}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700"
            >
              A Little About Us
            </motion.p>

            <motion.h2
              variants={reveal}
              className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl"
            >
              More Than
              <br />
              <span className="font-serif italic text-amber-700">
                Just Pictures.
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-7 text-sm leading-8 text-zinc-600 sm:text-base"
            >
              At Aaysha Studio, we believe photography is not just about
              clicking a button. It is about understanding emotions, noticing
              little details and preserving the moments that make your story
              unique.
            </motion.p>

            <motion.p
              variants={reveal}
              className="mt-4 text-sm leading-8 text-zinc-600 sm:text-base"
            >
              From weddings and pre-wedding sessions to birthdays and portraits,
              our goal is to create photographs that feel just as beautiful
              years later as they did on the day they were captured.
            </motion.p>

            <motion.div variants={reveal} className="mt-8">
              <Link
                to="/photos"
                className="group inline-flex items-center gap-3 border-b border-amber-700 pb-2 text-sm font-medium text-zinc-900"
              >
                Discover Our Story
                <motion.span
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  transition={smoothHover}
                >
                  <FiArrowRight />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          SERVICES SECTION
      ========================= */}

      <section className="bg-[#f1efea] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What We Do"
            title="Photography for Every Chapter"
            description="Every occasion has its own story. We are here to capture yours with care, creativity and attention to detail."
          />

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <motion.article
                key={service.number}
                variants={reveal}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group overflow-hidden bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-200">
                  <motion.img
                    whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-80 transition-opacity duration-1000 group-hover:opacity-100" />

                  <span className="absolute left-5 top-5 text-xs tracking-[0.2em] text-white">
                    {service.number}
                  </span>

                  <span className="absolute bottom-5 left-5 text-[10px] font-semibold tracking-[0.25em] text-amber-300">
                    {service.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-medium text-zinc-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {service.description}
                  </p>

                  <Link
                    to="/AddBooking"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-800"
                  >
                    Book a Session
                    <FiArrowRight className="transition-transform duration-700 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
          PROCESS SECTION
      ========================= */}

      <section className="px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How It Works"
            title="From Your Vision to Forever"
            description="A simple, thoughtful process designed to make your photography experience memorable from beginning to end."
          />

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                variants={reveal}
                className="relative border-t border-zinc-300 pt-7"
              >
                <span className="font-serif text-4xl text-amber-700/70">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {step.description}
                </p>

                {index < process.length - 1 && (
                  <FiArrowRight className="absolute right-0 top-8 hidden text-xl text-amber-700 lg:block" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
          GALLERY SECTION
      ========================= */}

      <section className="bg-zinc-950 px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Selected Moments"
            title="Stories Through Our Lens"
            description="A collection of real emotions, beautiful details and moments worth remembering."
            light
          />

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.06 }}
            className="grid auto-rows-[230px] gap-4 sm:grid-cols-2 md:auto-rows-[280px] lg:grid-cols-3"
          >
            {gallery.map((item) => (
              <motion.div
                key={item.title}
                variants={imageReveal}
                className={`group relative overflow-hidden bg-zinc-800 ${item.size}`}
              >
                <motion.img
                  whileHover={shouldReduceMotion ? {} : { scale: 1.055 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-80 transition-opacity duration-1000 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-5 opacity-90 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:p-7">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-amber-300">
                      {item.category}
                    </p>

                    <h3 className="text-xl font-light text-white sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-700 group-hover:border-amber-300 group-hover:bg-amber-300 group-hover:text-zinc-900">
                    <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={reveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/photos"
              className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm text-white transition-all duration-700 hover:border-amber-300 hover:bg-amber-300 hover:text-zinc-950"
            >
              View Full Gallery
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================
          TESTIMONIALS SECTION
      ========================= */}

      <section className="px-6 py-20 sm:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Kind Words"
            title="Memories Our Clients Cherish"
            description="The most meaningful part of our work is knowing that these photographs become part of someone's story."
          />

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                variants={reveal}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.7 }}
                className="border border-zinc-200 bg-white p-7 transition-shadow duration-700 hover:shadow-xl sm:p-9"
              >
                <div className="mb-6 flex gap-1 text-amber-600">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="fill-current" />
                  ))}
                </div>

                <FiHeart className="mb-4 text-2xl text-amber-700" />

                <p className="text-sm leading-8 text-zinc-600">
                  "{testimonial.review}"
                </p>

                <div className="mt-7 border-t border-zinc-200 pt-5">
                  <h3 className="font-medium text-zinc-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    {testimonial.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================
          STUDIO VALUES
      ========================= */}

      <section className="bg-[#f1efea] px-6 py-20 sm:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">

          <motion.div
            variants={stagger}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.p
              variants={reveal}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700"
            >
              Why Aaysha Studio
            </motion.p>

            <motion.h2
              variants={reveal}
              className="text-4xl font-light leading-tight sm:text-5xl"
            >
              Your Memories
              <br />
              <span className="font-serif italic text-amber-700">
                Deserve the Best.
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-6 text-sm leading-8 text-zinc-600 sm:text-base"
            >
              We combine creative vision with thoughtful planning to make your
              photography experience comfortable, personal and meaningful.
            </motion.p>

            <motion.div
              variants={stagger}
              className="mt-8 space-y-4"
            >
              {[
                "Personalized photography experience",
                "Attention to emotions and little details",
                "Creative storytelling and composition",
                "Memories made to revisit for years",
              ].map((value) => (
                <motion.div
                  key={value}
                  variants={reveal}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-700 text-white">
                    <FiCheck className="text-sm" />
                  </span>

                  <p className="text-sm leading-6 text-zinc-700">
                    {value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageReveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <div className="aspect-[5/4] overflow-hidden bg-zinc-200">
              <motion.img
                whileHover={shouldReduceMotion ? {} : { scale: 1.035 }}
                transition={{ duration: 1.1 }}
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85"
                alt="Photographer capturing a moment"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 bg-zinc-950 px-6 py-5 text-white shadow-xl sm:-left-6 sm:px-8">
              <FiCamera className="mb-3 text-2xl text-amber-300" />

              <p className="font-serif text-xl italic">
                Made with passion.
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                Captured with care
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 sm:px-10 md:py-32 lg:px-16">
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30"
          />
        </motion.div>

        <div className="absolute inset-0 bg-zinc-950/65" />

        <motion.div
          variants={stagger}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={reveal}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300"
          >
            Your Story Starts Here
          </motion.p>

          <motion.h2
            variants={reveal}
            className="text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Let's Create Something
            <br />
            <span className="font-serif italic text-amber-300">
              Beautiful Together.
            </span>
          </motion.h2>

          <motion.p
            variants={reveal}
            className="mx-auto mt-6 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base"
          >
            The moments you love deserve to be remembered. Tell us about your
            upcoming celebration, and let's turn it into a timeless story.
          </motion.p>

          <motion.div variants={reveal} className="mt-9">
            <Link
              to="/AddBooking"
              className="group inline-flex items-center gap-3 bg-amber-600 px-8 py-4 text-sm font-medium text-white transition-all duration-700 hover:bg-amber-700"
            >
              Let's Plan Your Shoot

              <motion.span
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                transition={smoothHover}
              >
                <FiArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="bg-[#111111] px-6 pb-8 pt-14 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link to="/" className="inline-block">
              <p className="text-2xl font-light tracking-[0.2em]">
                AAYSHA
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.45em] text-amber-300">
                Studio
              </p>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-400">
              Turning beautiful moments into timeless memories, one photograph
              at a time.
            </p>

            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-300 transition-all duration-700 hover:border-amber-400 hover:bg-amber-500 hover:text-zinc-950"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-medium tracking-wide">
              Quick Links
            </h3>

            <div className="space-y-3 text-sm text-zinc-400">
              <Link
                to="/"
                className="block transition duration-500 hover:text-amber-300"
              >
                Home
              </Link>

              <Link
                to="/photos"
                className="block transition duration-500 hover:text-amber-300"
              >
                Gallery
              </Link>

              <Link
                to="/AddBooking"
                className="block transition duration-500 hover:text-amber-300"
              >
                Book a Session
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-medium tracking-wide">
              Our Services
            </h3>

            <div className="space-y-3 text-sm text-zinc-400">
              <p>Wedding Photography</p>
              <p>Pre-Wedding Shoots</p>
              <p>Birthday Photography</p>
              <p>Portrait Photography</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-medium tracking-wide">
              Let's Connect
            </h3>

            <p className="text-sm leading-7 text-zinc-400">
              Have a special occasion coming up? We would love to hear your
              ideas and help you plan your photography session.
            </p>

            <Link
              to="/AddBooking"
              className="mt-5 inline-flex items-center gap-2 text-sm text-amber-300 transition duration-500 hover:text-white"
            >
              Contact Our Studio
              <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-7 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Aaysha Studio. All rights reserved.
          </p>

          <p>Every frame holds a feeling.</p>
        </div>
      </footer>

      {/* =========================
          FLOATING SOCIAL BAR
      ========================= */}

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.2,
          delay: 3.5,
          ease: "easeOut",
        }}
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            className="flex h-10 w-10 items-center justify-center bg-zinc-950 text-sm text-white shadow-lg transition-all duration-700 hover:bg-amber-600 hover:text-white"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
}