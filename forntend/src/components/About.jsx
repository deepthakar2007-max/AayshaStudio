
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiHeart,
  FiAperture,
  FiAward,
  FiUsers,
  FiImage,
  FiMove,
  FiPlay,
  FiStar,
} from "react-icons/fi";

/* =========================================
   ABOUT PAGE DATA
========================================= */

const values = [
  {
    number: "01",
    icon: FiCamera,
    title: "Crafted with Precision",
    description:
      "Every frame is thoughtfully composed with attention to light, detail and the emotion behind the moment.",
    color: "from-amber-200/20 to-transparent",
  },
  {
    number: "02",
    icon: FiHeart,
    title: "Emotion Before Poses",
    description:
      "We look for genuine smiles, quiet glances and spontaneous moments that make your story personal.",
    color: "from-rose-200/20 to-transparent",
  },
  {
    number: "03",
    icon: FiAperture,
    title: "A Creative Perspective",
    description:
      "Distinctive compositions and a considered visual style make every photography session feel unique.",
    color: "from-violet-200/20 to-transparent",
  },
  {
    number: "04",
    icon: FiAward,
    title: "Memories That Endure",
    description:
      "Our goal is to create photographs that feel meaningful today and become even more precious over time.",
    color: "from-emerald-200/20 to-transparent",
  },
];

const milestones = [
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Photoshoots" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Passion in Every Frame" },
];

const timeline = [
  {
    number: "01",
    title: "The First Conversation",
    description:
      "We learn about your occasion, your ideas and the moments that matter most to you.",
  },
  {
    number: "02",
    title: "The Creative Vision",
    description:
      "We plan the photography experience around your personality, preferences and story.",
  },
  {
    number: "03",
    title: "The Real Moments",
    description:
      "We capture genuine emotions, meaningful details and the unexpected moments in between.",
  },
  {
    number: "04",
    title: "Your Story, Preserved",
    description:
      "Your photographs become a collection of memories you can return to for years to come.",
  },
];

/* =========================================
   ANIMATION VARIANTS
========================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 38,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    clipPath: "inset(8% 5% 8% 5%)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

/* =========================================
   REUSABLE REVEAL COMPONENT
========================================= */

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   ANIMATED COUNTER
========================================= */

function Counter({ value, suffix, label }) {
  const reduceMotion = useReducedMotion();
  const [started, setStarted] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-4xl font-light tracking-tight text-[#e9c58b] sm:text-5xl md:text-6xl"
      >
        {started ? value.toLocaleString("en-IN") : "0"}
        {suffix}
      </motion.p>

      <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs">
        {label}
      </p>
    </motion.div>
  );
}

/* =========================================
   MAIN ABOUT PAGE
========================================= */

export default function About() {
  const reduceMotion = useReducedMotion();
  const [curtainDone, setCurtainDone] = useState(false);

  const { scrollYProgress } = useScroll();

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0%", "16%"]
  );

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["0%", "12%"]
  );

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      alt: "Wedding celebration",
    },
    {
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85",
      alt: "Couple photography",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      alt: "Wedding memories",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#10100f] text-[#f7f3ec] selection:bg-[#d8b477] selection:text-black">
      {/* =====================================
          CINEMATIC CURTAIN INTRO
      ===================================== */}

      <AnimatePresence>
        {!reduceMotion && !curtainDone && (
          <motion.div
            key="about-curtain"
            className="pointer-events-none fixed inset-0 z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => setCurtainDone(true)}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#10100f]"
            />

            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.15,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ transformOrigin: "right center" }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#10100f]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.9, 1, 1, 0.96],
              }}
              transition={{
                duration: 1.15,
                times: [0, 0.25, 0.7, 1],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <FiAperture className="mx-auto mb-5 text-3xl text-[#d8b477]" />

                <p className="text-3xl font-light tracking-[0.3em] sm:text-5xl">
                  AAYSHA
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.5em] text-white/50 sm:text-xs">
                  A Story Beyond The Frame
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
          TOP SCROLL PROGRESS
      ===================================== */}

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-[#d8b477]"
      />

      {/* =====================================
          HERO — ABOUT OUR STUDIO
      ===================================== */}

      <section className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-white/[0.07] md:min-h-screen">
        <motion.div
          style={reduceMotion ? {} : { y: heroImageY }}
          className="absolute inset-0"
        >
          <motion.img
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 1.13 }
            }
            animate={{ opacity: 0.56, scale: 1 }}
            transition={{
              duration: 1.8,
              delay: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2000&q=90"
            alt="Professional camera and photography equipment"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#10100f] via-[#10100f]/85 to-[#10100f]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10100f] via-transparent to-[#10100f]/40" />

        <motion.div
          style={reduceMotion ? {} : { y: heroTextY }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-10 lg:px-20"
        >
          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#d8b477]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-[#e9c58b] sm:text-xs">
                The Art of Preserving Life
              </p>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-light leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[92px]"
            >
              We don't just
              <br />
              capture pictures.
              <br />

              <span className="font-serif italic text-[#d8b477]">
                We preserve feelings.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-sm leading-8 text-white/65 sm:text-base"
            >
              Behind every photograph is a moment that will never happen
              the same way again. Our purpose is to make sure you can
              experience its beauty, long after it has passed.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                to="/AddBooking"
                className="group inline-flex items-center gap-4 bg-[#d8b477] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#171511] transition-colors duration-300 hover:bg-[#f0d4a3]"
              >
                Create Your Story

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#our-story"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
              >
                Discover Our Story

                <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-20 flex items-center justify-between border-t border-white/15 pt-6 sm:mt-24"
          >
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/45 sm:text-xs">
              Photography · Emotion · Legacy
            </p>

            <p className="text-[9px] uppercase tracking-[0.28em] text-white/45 sm:text-xs">
              About Aaysha Studio
            </p>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] lg:block">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
            Every frame tells a story
          </span>
        </div>
      </section>

      {/* =====================================
          OUR STORY
      ===================================== */}

      <section
        id="our-story"
        className="relative px-6 py-24 sm:px-10 md:py-32 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            variants={imageReveal}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-28 w-28 border-l border-t border-[#d8b477]/60 sm:-left-6 sm:-top-6" />

            <div className="relative overflow-hidden">
              <motion.img
                whileHover={reduceMotion ? {} : { scale: 1.045 }}
                transition={{ duration: 0.9 }}
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1100&q=85"
                alt="Photographer working with a camera"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

              <div className="absolute bottom-6 left-6 border-l border-[#d8b477] pl-4">
                <p className="font-serif text-xl italic text-white">
                  Behind the lens.
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/65">
                  Where every story begins
                </p>
              </div>
            </div>

            <div className="absolute -bottom-7 -right-3 hidden bg-[#d8b477] p-6 text-[#171511] sm:block md:-right-7 md:p-8">
              <FiAperture className="text-3xl" />
              <p className="mt-3 font-serif text-lg italic">
                Art in every frame
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d8b477]"
            >
              A Little About Us
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl"
            >
              The most beautiful
              <br />
              things in life
              <br />

              <span className="font-serif italic text-[#d8b477]">
                aren't things.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-sm leading-8 text-white/60 sm:text-base"
            >
              They are the people we love, the laughter we share, the
              celebrations we remember and the little moments we wish
              could last a little longer.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-sm leading-8 text-white/60 sm:text-base"
            >
              At Aaysha Studio, photography is our way of holding on to
              those moments. We bring together creative vision, thoughtful
              composition and genuine emotion to tell stories that feel
              personal, natural and timeless.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 grid grid-cols-2 gap-5 border-t border-white/10 pt-7"
            >
              <div>
                <FiHeart className="mb-3 text-2xl text-[#d8b477]" />
                <h3 className="text-sm font-medium">Made with Feeling</h3>
                <p className="mt-2 text-xs leading-6 text-white/45">
                  Real emotions. Meaningful memories.
                </p>
              </div>

              <div>
                <FiAperture className="mb-3 text-2xl text-[#d8b477]" />
                <h3 className="text-sm font-medium">Created with Vision</h3>
                <p className="mt-2 text-xs leading-6 text-white/45">
                  Thoughtful frames. Timeless stories.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9">
              <Link
                to="/AddBooking"
                className="group inline-flex items-center gap-3 border-b border-[#d8b477]/60 pb-3 text-xs uppercase tracking-[0.15em] text-[#e9c58b] transition-colors hover:text-white"
              >
                Let's Create Something Meaningful

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          PHOTO STRIP
      ===================================== */}

      <section className="border-y border-white/[0.08] bg-[#171715] py-5">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 px-5 sm:grid-cols-3 sm:gap-4 sm:px-8"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.alt}
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group relative h-56 overflow-hidden sm:h-64 lg:h-80"
            >
              <motion.img
                whileHover={reduceMotion ? {} : { scale: 1.07 }}
                transition={{ duration: 0.8 }}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

              <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.25em] text-white/85">
                Frame 0{index + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* =====================================
          OUR PHILOSOPHY
      ===================================== */}

      <section className="px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <FiAperture className="mx-auto mb-8 text-3xl text-[#d8b477]" />

          <p className="mb-6 text-[10px] uppercase tracking-[0.38em] text-[#d8b477]">
            Our Philosophy
          </p>

          <h2 className="text-3xl font-light leading-relaxed sm:text-4xl md:text-5xl">
            "A photograph becomes priceless
            <br className="hidden sm:block" />
            when it brings back a feeling
            <br className="hidden sm:block" />
            <span className="font-serif italic text-[#d8b477]">
              you thought time had taken away."
            </span>
          </h2>

          <div className="mx-auto mt-9 h-px w-16 bg-[#d8b477]/70" />

          <p className="mt-5 text-[9px] uppercase tracking-[0.35em] text-white/40">
            The Aaysha Studio Philosophy
          </p>
        </Reveal>
      </section>

      {/* =====================================
          WHY CHOOSE US
      ===================================== */}

      <section className="border-y border-white/[0.07] bg-[#171715] px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 max-w-2xl">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d8b477]">
              What Sets Us Apart
            </p>

            <h2 className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Thoughtful by nature.
              <br />
              <span className="font-serif italic text-[#d8b477]">
                Timeless by design.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              The difference is in the details — the way a moment is
              understood, a frame is composed and a memory is preserved.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  variants={fadeUp}
                  whileHover={reduceMotion ? {} : { y: -5 }}
                  className="group relative overflow-hidden bg-[#171715] p-7 transition-colors duration-500 hover:bg-[#1e1d19] sm:p-8 lg:p-7 xl:p-9"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.2em] text-white/30">
                        {item.number}
                      </span>

                      <Icon className="text-xl text-[#d8b477] transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <h3 className="mt-10 text-xl font-light leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/50">
                      {item.description}
                    </p>

                    <div className="mt-8 h-px w-10 bg-[#d8b477]/70 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================
          STUDIO NUMBERS
      ===================================== */}

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 md:py-28 lg:px-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d8b477]/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mb-14 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#d8b477]">
              The Journey So Far
            </p>

            <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
              Every number holds a story.
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 gap-y-12 md:grid-cols-4"
          >
            {milestones.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="border-white/10 px-3 sm:px-6 md:border-r md:last:border-r-0"
              >
                <Counter
                  value={item.value}
                  suffix={item.suffix}
                  label={item.label}
                />
              </motion.div>
            ))}
          </motion.div>

          <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-6 text-white/35">
            Studio figures shown here are editable sample content. Update
            them to reflect your actual business achievements.
          </p>
        </div>
      </section>

      {/* =====================================
          THE EXPERIENCE / TIMELINE
      ===================================== */}

      <section className="bg-[#e9e0d1] px-6 py-24 text-[#171511] sm:px-10 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#856638]">
                The Experience
              </p>

              <h2 className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
                From the first
                <br />
                hello to
                <br />
                <span className="font-serif italic text-[#856638]">
                  forever.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-8 text-black/60">
                Your photography experience should feel as special as
                the memories themselves. Here's how we turn your ideas
                into something you can keep forever.
              </p>

              <Link
                to="/AddBooking"
                className="group mt-9 inline-flex items-center gap-3 border-b border-[#856638]/50 pb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#634b2a]"
              >
                Start Your Journey
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <motion.div
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <div className="absolute bottom-6 left-[17px] top-6 w-px bg-[#856638]/25 sm:left-[21px]" />

            {timeline.map((item) => (
              <motion.div
                key={item.number}
                variants={fadeUp}
                className="relative grid grid-cols-[36px_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[44px_1fr] sm:gap-7"
              >
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#856638]/50 bg-[#e9e0d1] font-serif text-xs text-[#634b2a] sm:h-11 sm:w-11">
                  {item.number}
                </div>

                <div className="border-b border-black/10 pb-8">
                  <h3 className="text-xl font-medium sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-black/60">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================
          FINAL CALL TO ACTION
      ===================================== */}

      <section className="relative overflow-hidden px-6 py-28 sm:px-10 md:py-36 lg:px-20">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.12, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.34 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85"
            alt="A beautiful wedding moment"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#10100f]/80" />

        <motion.div
          variants={staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[#d8b477]/50 text-[#d8b477]"
          >
            <FiCamera className="text-xl" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#e9c58b]"
          >
            Your Story Deserves to Be Told
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-light leading-tight sm:text-5xl md:text-7xl"
          >
            One day becomes
            <br />
            <span className="font-serif italic text-[#d8b477]">
              a lifetime of memories.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/65 sm:text-base"
          >
            Whether it's a wedding, a celebration or a moment just for
            yourself, let's create photographs that will always mean
            something to you.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/AddBooking"
              className="group inline-flex items-center gap-4 bg-[#d8b477] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#171511] transition-all duration-300 hover:bg-[#f0d4a3]"
            >
              Book Your Session
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/photos"
              className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Explore Gallery
              <FiImage />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================
          MINIMAL FOOTER
      ===================================== */}

      <footer className="border-t border-white/10 bg-[#0b0b0a] px-6 py-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <Link to="/" className="group">
            <p className="text-lg font-light tracking-[0.28em] text-white">
              AAYSHA
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.5em] text-[#d8b477]">
              Studio
            </p>
          </Link>

          <p className="text-[10px] leading-6 text-white/40 sm:text-xs">
            Photographs fade into the past. Memories stay with us.
          </p>

          <Link
            to="/AddBooking"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d8b477] transition-colors hover:text-white"
          >
            Let's Talk
            <FiArrowRight />
          </Link>
        </div>

        <div className="mx-auto mt-7 max-w-7xl border-t border-white/[0.07] pt-5 text-center text-[9px] tracking-[0.1em] text-white/30 sm:text-left">
          © {new Date().getFullYear()} Aaysha Studio. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
