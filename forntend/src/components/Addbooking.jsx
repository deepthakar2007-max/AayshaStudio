import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBooking() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    customerName: "",
    phone: "",
    eventType: "",
    bookingDate: "",
    status: "Pending",
  });

  function handleChange(e) {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

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

      if (result.success) {
        alert("Booking Created Successfully");
        navigate("/Booking");
      } else {
        alert(result.message || "Booking failed");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-250 via-slate-900 to-indigo-250 px-4 py-10">

      {/* Background Glow */}
      <div className="fixed top-20 left-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"></div>

      <div className="fixed bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-3xl">

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 sm:px-8 py-7 border-b border-white/10">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-400/20">

                <svg
                  className="h-7 w-7 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Add Photoshoot Booking
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                  Create a new customer booking
                </p>
              </div>

            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 space-y-6"
          >

            {/* Customer Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Customer Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  value={booking.customerName}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={booking.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

            </div>

            {/* Event + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Event Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Event Type
                </label>

                <select
                  name="eventType"
                  value={booking.eventType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option
                    value=""
                    className="bg-slate-900"
                  >
                    Select Event Type
                  </option>

                  <option value="Wedding" className="bg-slate-900">
                    Wedding
                  </option>

                  <option value="Pre Wedding" className="bg-slate-900">
                    Pre Wedding
                  </option>

                  <option value="Birthday" className="bg-slate-900">
                    Birthday
                  </option>

                  <option value="Engagement" className="bg-slate-900">
                    Engagement
                  </option>

                  <option value="Baby Shoot" className="bg-slate-900">
                    Baby Shoot
                  </option>

                  <option value="Other" className="bg-slate-900">
                    Other
                  </option>
                </select>
              </div>

              {/* Booking Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Booking Date
                </label>

                <input
                  type="date"
                  name="bookingDate"
                  value={booking.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Booking Status
              </label>

              <select
                name="status"
                value={booking.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="Pending" className="bg-slate-900">
                  Pending
                </option>

                <option value="Confirmed" className="bg-slate-900">
                  Confirmed
                </option>

                <option value="Completed" className="bg-slate-900">
                  Completed
                </option>

                <option value="Cancelled" className="bg-slate-900">
                  Cancelled
                </option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">

              {/* Add Booking */}
              <button
                type="submit"
                className="group relative flex-1 overflow-hidden rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/50 active:scale-95"
              >
                <span className="relative z-10">
                  Add Booking
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 font-semibold text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95"
              >
                ← Back to Booking
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddBooking;