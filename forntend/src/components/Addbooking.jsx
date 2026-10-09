
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddBooking() {
    const navigate = useNavigate();

    const [booking, setBooking] = useState({
        customerName: "",
        phone: "",
        eventType: "",
        bookingDate: "",
        status: "Pending",
    });

    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (submitting) return;
        setSubmitting(true);

        try {
            const response = await fetch(
                "https://aayshastudio.onrender.com/api/bookings/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(booking),
                }
            );

            const result = await response.json();

            console.log(result);

            if (response.ok && result.success) {
                alert("Booking Created Successfully");

                setBooking({
                    customerName: "",
                    phone: "",
                    eventType: "",
                    bookingDate: "",
                    status: "Pending",
                });

                navigate("/");
            } else {
                alert(result.message || "Booking failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-[#111827]/80 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-violet-400/40 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10";

    const labelClass =
        "mb-2.5 block text-sm font-medium text-slate-300";

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#080b14] px-4 py-10 sm:px-6 sm:py-14">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-[120px]" />

            {/* Decorative Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "45px 45px",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative mx-auto w-full max-w-3xl"
            >
                {/* Main Card */}
                <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#111522]/90 shadow-[0_25px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

                    {/* Top Accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-400 to-purple-500" />

                    {/* Header */}
                    <div className="border-b border-white/[0.07] px-6 py-7 sm:px-9 sm:py-8">
                        <div className="flex items-center gap-4">

                            <motion.div
                                initial={{ scale: 0.7, rotate: -12 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.5,
                                }}
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 shadow-lg shadow-violet-950/30"
                            >
                                <svg
                                    className="h-7 w-7 text-violet-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </motion.div>

                            <div>
                                <p className="mb-1 text-[10px] font-bold uppercase tracking-[3px] text-violet-300 sm:text-xs">
                                    Aaysha Studio
                                </p>

                                <h1 className="text-xl font-bold tracking-tight text-white sm:text-3xl">
                                    Add Photoshoot Booking
                                </h1>

                                <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
                                    Create and manage your customer booking
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6 sm:p-9"
                    >
                        {/* Customer Details */}
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-xs font-bold text-violet-300">
                                    01
                                </span>

                                <h2 className="text-sm font-semibold text-white">
                                    Customer Details
                                </h2>

                                <div className="h-px flex-1 bg-white/[0.07]" />
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="customerName"
                                        className={labelClass}
                                    >
                                        Customer Name
                                    </label>

                                    <input
                                        id="customerName"
                                        type="text"
                                        name="customerName"
                                        value={booking.customerName}
                                        onChange={handleChange}
                                        placeholder="Enter customer name"
                                        autoComplete="name"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className={labelClass}
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={booking.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        autoComplete="tel"
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Booking Details */}
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15 text-xs font-bold text-indigo-300">
                                    02
                                </span>

                                <h2 className="text-sm font-semibold text-white">
                                    Booking Details
                                </h2>

                                <div className="h-px flex-1 bg-white/[0.07]" />
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="eventType"
                                        className={labelClass}
                                    >
                                        Event Type
                                    </label>

                                    <select
                                        id="eventType"
                                        name="eventType"
                                        value={booking.eventType}
                                        onChange={handleChange}
                                        required
                                        className={`${inputClass} cursor-pointer`}
                                    >
                                        <option
                                            value=""
                                            className="bg-[#111522]"
                                        >
                                            Select event type
                                        </option>

                                        <option className="bg-[#111522]" value="Wedding">
                                            Wedding
                                        </option>

                                        <option className="bg-[#111522]" value="Pre Wedding">
                                            Pre Wedding
                                        </option>

                                        <option className="bg-[#111522]" value="Birthday">
                                            Birthday
                                        </option>

                                        <option className="bg-[#111522]" value="Engagement">
                                            Engagement
                                        </option>

                                        <option className="bg-[#111522]" value="Baby Shoot">
                                            Baby Shoot
                                        </option>

                                        <option className="bg-[#111522]" value="Other">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="bookingDate"
                                        className={labelClass}
                                    >
                                        Booking Date
                                    </label>

                                    <input
                                        id="bookingDate"
                                        type="date"
                                        name="bookingDate"
                                        value={booking.bookingDate}
                                        onChange={handleChange}
                                        required
                                        className={`${inputClass} [color-scheme:dark]`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="status"
                                className={labelClass}
                            >
                                Booking Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={booking.status}
                                onChange={handleChange}
                                className={`${inputClass} cursor-pointer`}
                            >
                                <option className="bg-[#111522]" value="Pending">
                                    Pending
                                </option>

                                <option className="bg-[#111522]" value="Confirmed">
                                    Confirmed
                                </option>

                                <option className="bg-[#111522]" value="Completed">
                                    Completed
                                </option>

                                <option className="bg-[#111522]" value="Cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-white/[0.07] pt-6 sm:flex-row">

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                onClick={() => navigate("/")}
                                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:flex-1"
                            >
                                Back to Booking
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                disabled={submitting}
                                className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition duration-300 hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-[1.4]"
                            >
                                <span className="relative z-10">
                                    {submitting
                                        ? "Creating Booking..."
                                        : "Create Booking"}
                                </span>

                                {!submitting && (
                                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 hover:translate-x-full" />
                                )}
                            </motion.button>
                        </div>

                        <p className="text-center text-xs text-slate-500">
                            Please verify the booking details before submitting.
                        </p>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs tracking-wide text-slate-500">
                    AAYSHA STUDIO · BOOKING MANAGEMENT
                </p>
            </motion.div>
        </div>
    );
}

export default AddBooking;

