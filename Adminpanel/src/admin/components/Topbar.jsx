import { useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdPerson,
} from "react-icons/md";

function Topbar() {
  const navigate = useNavigate();

  // =========================
  // GET LOGGED-IN ADMIN
  // =========================
  let admin = {};

  try {
    const savedAdmin = localStorage.getItem("adminData");

    if (savedAdmin) {
      admin = JSON.parse(savedAdmin);
    }
  } catch (error) {
    console.error("Admin data error:", error);
  }

  // =========================
  // ADMIN INFORMATION
  // =========================
  const adminName =
    admin?.name ||
    admin?.username ||
    admin?.fullName ||
    "Admin";

  const adminId =
    admin?._id ||
    admin?.id ||
    "Admin";

  // =========================
  // ADMIN INITIAL
  // =========================
  const adminInitial = adminName
    ?.trim()
    ?.charAt(0)
    ?.toUpperCase() || "A";

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* =========================
          LEFT SIDE
      ========================= */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back,{" "}
          <span className="font-medium text-gray-700 capitalize">
            {adminName}
          </span>
        </p>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}
      <div className="flex items-center gap-5">

        {/* =========================
            ADMIN PROFILE
        ========================= */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {adminInitial ? (
              adminInitial
            ) : (
              <MdPerson size={22} />
            )}
          </div>

          {/* Admin Details */}
          <div className="hidden sm:block capitalize">
            <p className="text-sm font-semibold text-gray-800">
              {adminName}
            </p>

            <p className="text-xs text-gray-500">
              ID: {adminId}
            </p>
          </div>

        </div>

        {/* =========================
            LOGOUT
        ========================= */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
        >
          <MdLogout size={19} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
}

export default Topbar;