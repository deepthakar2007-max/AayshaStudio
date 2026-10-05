
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://aayshastudio.onrender.com/api/bookings";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET BOOKINGS
  // =========================
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      console.log("BOOKINGS API:", response.data);

      const result = response.data;

      let bookingData = [];

      if (Array.isArray(result)) {
        bookingData = result;
      } else if (Array.isArray(result.data)) {
        bookingData = result.data;
      } else if (Array.isArray(result.bookings)) {
        bookingData = result.bookings;
      }

      setBookings(bookingData);
    } catch (err) {
      console.error("GET BOOKINGS ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load bookings. Please check your API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // LOAD BOOKINGS
  // =========================
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // =========================
  // DELETE BOOKING
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setBookings((prev) =>
        prev.filter(
          (booking) => booking._id !== id && booking.id !== id
        )
      );

      alert("Booking deleted successfully");
    } catch (err) {
      console.error("DELETE BOOKING ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete booking"
      );
    }
  };

  // =========================
  // VIEW BOOKING
  // =========================
  const handleView = (booking) => {
    alert(
      `Booking Details\n\n` +
        `Name: ${booking.name || booking.fullName || "N/A"}\n` +
        `Email: ${booking.email || "N/A"}\n` +
        `Phone: ${booking.phone || "N/A"}\n` +
        `Service: ${
          booking.service ||
          booking.serviceType ||
          booking.category ||
          "N/A"
        }\n` +
        `Date: ${
          booking.date ||
          booking.bookingDate ||
          "N/A"
        }\n` +
        `Time: ${booking.time || "N/A"}\n` +
        `Status: ${booking.status || "Pending"}`
    );
  };

  // =========================
  // CALL CUSTOMER
  // =========================
  const handleCall = (booking) => {
    if (!booking.phone) {
      alert("Customer phone number not available");
      return;
    }

    const phone = booking.phone.replace(/\D/g, "");

    window.location.href = `tel:${phone}`;
  };

  // =========================
  // WHATSAPP
  // =========================
  const handleWhatsApp = (booking) => {
    if (!booking.phone) {
      alert("Customer phone number not available");
      return;
    }

    const customerName =
      booking.name ||
      booking.fullName ||
      "Customer";

    const service =
      booking.service ||
      booking.serviceType ||
      booking.category ||
      "service";

    const date =
      booking.date ||
      booking.bookingDate ||
      "N/A";

    const time = booking.time || "N/A";

    const message = encodeURIComponent(
      `Hello ${customerName},

Thank you for contacting us regarding your ${service} booking.

Your booking details:

Date: ${date}
Time: ${time}

Please let us know if you have any questions.

Regards,
Admin Team`
    );

    const phone = booking.phone.replace(/\D/g, "");

    const whatsappNumber =
      phone.length === 10
        ? `91${phone}`
        : phone;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  // =========================
  // EMAIL
  // =========================
  const handleReply = (booking) => {
    if (!booking.email) {
      alert("Customer email not available");
      return;
    }

    const customerName =
      booking.name ||
      booking.fullName ||
      "Customer";

    const service =
      booking.service ||
      booking.serviceType ||
      booking.category ||
      "Service";

    const subject = encodeURIComponent(
      `Regarding Your ${service} Booking`
    );

    const body = encodeURIComponent(
      `Hello ${customerName},

Thank you for contacting us regarding your ${service} booking.

Please let us know if you have any questions.

Regards,
Admin Team`
    );

    window.location.href =
      `mailto:${booking.email}?subject=${subject}&body=${body}`;
  };

  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredBookings = bookings.filter((booking) => {
    const name =
      booking.name ||
      booking.fullName ||
      booking.customerName ||
      "";

    const email = booking.email || "";

    const phone = booking.phone || "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      phone.includes(search);

    const bookingStatus =
      booking.status || "Pending";

    const matchesStatus =
      statusFilter === "All" ||
      bookingStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // STATUS COUNTS
  // =========================
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) =>
      (booking.status || "").toLowerCase() ===
      "confirmed"
  ).length;

  const pendingBookings = bookings.filter(
    (booking) =>
      (booking.status || "").toLowerCase() ===
      "pending"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) =>
      (booking.status || "").toLowerCase() ===
      "cancelled"
  ).length;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <p className="text-gray-500 animate-pulse">
          Loading bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bookings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer bookings
          </p>
        </div>

        <button
          onClick={fetchBookings}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600
          text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh
        </button>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200
        text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Bookings
          </p>

          <p className="text-3xl font-bold text-gray-800 mt-2">
            {totalBookings}
          </p>
        </div>

        {/* Confirmed */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Confirmed
          </p>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {confirmedBookings}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingBookings}
          </p>
        </div>

        {/* Cancelled */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Cancelled
          </p>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {cancelledBookings}
          </p>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1">

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300
              rounded-lg outline-none focus:ring-2
              focus:ring-blue-500"
            />

          </div>

          <div className="w-full md:w-48">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full px-4 py-3 border
              border-gray-300 rounded-lg outline-none
              focus:ring-2 focus:ring-blue-500"
            >

              <option value="All">
                All Status
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-gray-200
      rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Service
                </th>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Date & Time
                </th>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm
                font-semibold text-gray-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (

                filteredBookings.map((booking, index) => {

                  const customerName =
                    booking.name ||
                    booking.fullName ||
                    booking.customerName ||
                    "Unknown Customer";

                 
                  const phone =
                    booking.phone ||
                    "No phone";

                  const service =
                    booking.service ||
                    booking.serviceType ||
                    booking.category ||
                    "N/A";

                  const date =
                    booking.date ||
                    booking.bookingDate ||
                    booking.createdAt ||
                    "N/A";

                  const time =
                    booking.time ||
                    "N/A";

                  const status =
                    booking.status ||
                    "Pending";

                  const bookingId =
                    booking._id ||
                    booking.id ||
                    index;

                  return (
                    <tr
                      key={bookingId}
                      className="border-t hover:bg-gray-50"
                    >

                      {/* Customer */}
                      <td className="px-5 py-4">

                        <p className="font-medium text-gray-800">
                          {customerName}
                        </p>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">

                        <p className="text-sm text-gray-600">
                          {phone}
                        </p>

                      </td>

                      {/* Service */}
                      <td className="px-5 py-4">

                        <p className="text-sm text-gray-600">
                          {service}
                        </p>

                      </td>

                      {/* Date & Time */}
                      <td className="px-5 py-4">

                        <p className="text-sm text-gray-700">
                          {date}
                        </p>

                        <p className="text-xs text-gray-500">
                          {time}
                        </p>

                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">

                        <span
                          className={`px-3 py-1 rounded-full
                          text-xs font-medium ${
                            status.toLowerCase() ===
                            "confirmed"
                              ? "bg-green-100 text-green-700"
                              : status.toLowerCase() ===
                                "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : status.toLowerCase() ===
                                "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex flex-wrap gap-2">

                          {/* View */}
                          <button
                            onClick={() =>
                              handleView(booking)
                            }
                            className="px-3 py-2 bg-blue-50
                            text-blue-600 rounded-lg text-sm
                            hover:bg-blue-100"
                          >
                            View
                          </button>

                          {/* Call */}
                          <button
                            onClick={() =>
                              handleCall(booking)
                            }
                            className="px-3 py-2 bg-purple-50
                            text-purple-600 rounded-lg text-sm
                            hover:bg-purple-100"
                          >
                            Call
                          </button>

                          {/* WhatsApp */}
                          <button
                            onClick={() =>
                              handleWhatsApp(booking)
                            }
                            className="px-3 py-2 bg-green-50
                            text-green-600 rounded-lg text-sm
                            hover:bg-green-100"
                          >
                            WhatsApp
                          </button>

                          
                          {/* Delete */}
                          <button
                            onClick={() =>
                              handleDelete(
                                booking._id ||
                                  booking.id
                              )
                            }
                            className="px-3 py-2 bg-red-50
                            text-red-600 rounded-lg text-sm
                            hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center
                    text-gray-500"
                  >
                    No bookings found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Bookings;
