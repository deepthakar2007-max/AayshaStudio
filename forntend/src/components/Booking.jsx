import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // GET ALL BOOKINGS
  async function fetchdata() {
    try {
      const response = await fetch(
        "https://aayshastudio.onrender.com/api/bookings/"
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();

      console.log("Booking API Response:", result);

      if (result.success) {
        setBookings(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } else {
        setBookings([]);
        alert(result.message || "Booking not found");
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      setBookings([]);
      alert("Something went wrong");
    }
  }

  // DELETE BOOKING
  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://aayshastudio.onrender.com/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const result = await response.json();

      console.log("Delete Response:", result);

      if (result.success) {
        alert("Booking Deleted Successfully");

        // Refresh list
        fetchdata();
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Something went wrong");
    }
  }

  // GET BOOKINGS
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-10">

      {/* Header */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Admin Panel
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Photoshoot Booking
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Manage all your photoshoot bookings
            </p>
          </div>

          {/* Total Booking */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-4 shadow-lg">
            <p className="text-sm text-zinc-400">
              Total Bookings
            </p>

            <p className="mt-1 text-3xl font-bold text-white">
              {bookings.length}
            </p>
          </div>

        </div>

        {/* Booking List */}
        {bookings.length > 0 ? (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {bookings.map((item) => (

              <div
                key={item._id}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl"
              >

                {/* Customer Name */}
                <div className="mb-5 flex items-start justify-between gap-3">

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
                      Customer
                    </p>

                    <h3 className="text-xl font-semibold text-white">
                      {item.customerName}
                    </h3>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status?.toLowerCase() === "confirmed"
                        ? "bg-green-500/10 text-green-400"
                        : item.status?.toLowerCase() === "cancelled"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                {/* Booking Details */}
                <div className="space-y-4 border-t border-zinc-800 pt-5">

                  {/* Phone */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-zinc-200">
                      {item.phone}
                    </p>
                  </div>

                  {/* Event Type */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Event Type
                    </p>

                    <p className="mt-1 text-sm text-zinc-200">
                      {item.eventType}
                    </p>
                  </div>

                  {/* Booking Date */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                      Booking Date
                    </p>

                    <p className="mt-1 text-sm text-zinc-200">
                      {item.bookingDate
                        ? new Date(
                            item.bookingDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() =>
                      navigate(`/booking/edit/${item._id}`)
                    }
                    className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteBooking(item._id)
                    }
                    className="flex-1 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* No Booking */
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50">

            <div className="text-center">

              <div className="mb-4 text-5xl">
                📅
              </div>

              <h3 className="text-xl font-semibold text-white">
                No Booking Found
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                There are currently no photoshoot bookings.
              </p>

            </div>

          </div>

        )}

       

      </div>
    </div>
  );
}

export default Booking;