import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MdDashboard,
  MdPhotoLibrary,
  MdVideoLibrary,
  MdCollections,
  MdCalendarMonth,
  MdArticle,
  MdPerson,
  MdKeyboardArrowRight,
  MdLogout,
  MdCameraAlt,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  // =========================
  // ADMIN DATA
  // =========================
  const [admin, setAdmin] = useState({});

  // =========================
  // GET ADMIN DATA
  // =========================
  const getAdminData = () => {
    try {
      const savedAdmin = localStorage.getItem("adminData");

      if (!savedAdmin) {
        return {};
      }

      const parsedAdmin = JSON.parse(savedAdmin);

      return parsedAdmin || {};
    } catch (error) {
      console.error("Admin data error:", error);
      return {};
    }
  };

  // =========================
  // LOAD ADMIN
  // =========================
  useEffect(() => {
    setAdmin(getAdminData());
  }, []);

  // =========================
  // UPDATE ADMIN DATA
  // =========================
  useEffect(() => {
    const handleAdminUpdate = () => {
      setAdmin(getAdminData());
    };

    window.addEventListener(
      "adminDataUpdated",
      handleAdminUpdate
    );

    return () => {
      window.removeEventListener(
        "adminDataUpdated",
        handleAdminUpdate
      );
    };
  }, []);

  // =========================
  // ADMIN NAME
  // =========================
  const adminName =
    admin?.name ||
    admin?.username ||
    admin?.fullName ||
    "Admin";

  // =========================
  // ADMIN EMAIL
  // =========================
  const adminEmail =
    admin?.email || "Admin Account";

  // =========================
  // ADMIN INITIAL
  // =========================
  const adminInitial =
    adminName?.trim()?.charAt(0)?.toUpperCase() || "A";

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  // =========================
  // MENU GROUPS
  // =========================
  const menuGroups = [
    {
      title: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          path: "/admin",
          icon: MdDashboard,
        },
      ],
    },
    {
      title: "CONTENT",
      items: [
        {
          name: "Photos",
          path: "/admin/photos",
          icon: MdPhotoLibrary,
        },
        {
          name: "Videos",
          path: "/admin/videos",
          icon: MdVideoLibrary,
        },
        {
          name: "User",
          path: "/users",
          icon: MdPerson,
        },
        {
          name: "Gallery",
          path: "/admin/gallery",
          icon: MdCollections,
        },
        {
          name: "Blogs",
          path: "/admin/blogs",
          icon: MdArticle,
        },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          name: "Bookings",
          path: "/admin/bookings",
          icon: MdCalendarMonth,
        },
        {
          name: "Profile",
          path: "/admin/profile",
          icon: MdPerson,
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        w-72 min-h-screen sticky top-0 flex flex-col
        border-r shadow-2xl
        transition-all duration-300
        ${
          darkMode
            ? "bg-[#0b0f19] text-white border-white/5"
            : "bg-white text-gray-900 border-gray-200"
        }
      `}
    >
      {/* =========================
          LOGO
      ========================= */}
      <div
        className={`
          px-6 py-6 border-b
          ${darkMode ? "border-white/5" : "border-gray-200"}
        `}
      >
        <div className="flex items-center gap-3">

          {/* Logo Icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MdCameraAlt className="text-2xl text-white" />
          </div>

          {/* Logo Text */}
          <div>
            <h1
              className={`text-lg font-bold tracking-wide ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              AAYSHA STUDIO
            </h1>

            <p
              className={`text-[10px] tracking-[0.25em] uppercase ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Admin Panel
            </p>
          </div>

        </div>
      </div>

      {/* =========================
          ADMIN PROFILE
      ========================= */}
      <div className="px-4 pt-5">
        <div
          className={`
            p-3 rounded-xl border transition-all duration-300
            ${
              darkMode
                ? "bg-white/[0.03] border-white/5 hover:bg-white/[0.05]"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
            }
          `}
        >
          <div className="flex items-center gap-3">

            {/* =========================
                AVATAR
            ========================= */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white uppercase">
              {adminInitial}
            </div>

            {/* =========================
                ADMIN INFO
            ========================= */}
            <div className="flex-1 min-w-0">

              <p
                className={`text-sm font-semibold truncate ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {adminName}
              </p>

              <p
                className={`text-[11px] truncate mt-0.5 ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {adminEmail}
              </p>

              <div className="flex items-center gap-1.5 mt-1">

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>

                <span
                  className={`text-xs ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  Online
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">

        <div className="space-y-7">

          {menuGroups.map((group) => (
            <div key={group.title}>

              {/* Section Title */}
              <p
                className={`
                  px-3 mb-3 text-[10px] font-semibold tracking-[0.2em]
                  ${darkMode ? "text-gray-600" : "text-gray-400"}
                `}
              >
                {group.title}
              </p>

              {/* Menu */}
              <ul className="space-y-1">

                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.path}>

                      <NavLink
                        to={item.path}
                        end={item.path === "/admin"}
                        className={({ isActive }) => `
                          group relative flex items-center gap-3 px-3 py-3 rounded-xl
                          transition-all duration-200

                          ${
                            isActive
                              ? darkMode
                                ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white"
                                : "bg-blue-50 text-blue-600"
                              : darkMode
                              ? "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }
                        `}
                      >
                        {({ isActive }) => (
                          <>
                            {/* Active Line */}
                            {isActive && (
                              <span
                                className={`
                                  absolute left-0 top-2 bottom-2 w-0.5 rounded-full
                                  ${
                                    darkMode
                                      ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                                      : "bg-blue-600"
                                  }
                                `}
                              ></span>
                            )}

                            {/* Icon */}
                            <div
                              className={`
                                w-9 h-9 rounded-lg flex items-center justify-center
                                transition-all duration-200

                                ${
                                  isActive
                                    ? darkMode
                                      ? "bg-blue-500/15 text-blue-400"
                                      : "bg-blue-100 text-blue-600"
                                    : darkMode
                                    ? "bg-transparent text-gray-500 group-hover:bg-white/5 group-hover:text-gray-300"
                                    : "bg-transparent text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                                }
                              `}
                            >
                              <Icon className="text-[20px]" />
                            </div>

                            {/* Name */}
                            <span className="flex-1 text-sm font-medium">
                              {item.name}
                            </span>

                            {/* Arrow */}
                            <MdKeyboardArrowRight
                              className={`
                                text-lg transition-all duration-200

                                ${
                                  isActive
                                    ? "text-blue-400 translate-x-0"
                                    : darkMode
                                    ? "text-gray-700 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    : "text-gray-400 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                }
                              `}
                            />

                          </>
                        )}
                      </NavLink>

                    </li>
                  );
                })}

              </ul>
            </div>
          ))}

        </div>

      </nav>

      {/* =========================
          BOTTOM
      ========================= */}
      <div
        className={`
          p-4 border-t
          ${darkMode ? "border-white/5" : "border-gray-200"}
        `}
      >

        {/* =========================
            SYSTEM STATUS
        ========================= */}
        <div
          className={`
            mb-3 p-3 rounded-xl border transition-all duration-300
            ${
              darkMode
                ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/5"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200"
            }
          `}
        >
          <div className="flex items-center gap-2">

            <span className="relative flex h-2 w-2">

              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>

            </span>

            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              System is running
            </span>

          </div>
        </div>

        {/* =========================
            LIGHT / DARK BUTTON
        ========================= */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl
            mb-2 transition-all duration-200
            ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }
          `}
        >

          {/* Icon */}
          <div
            className={`
              w-9 h-9 rounded-lg flex items-center justify-center
              ${darkMode ? "bg-white/[0.03]" : "bg-gray-100"}
            `}
          >
            {darkMode ? (
              <MdLightMode className="text-xl text-yellow-400" />
            ) : (
              <MdDarkMode className="text-xl text-indigo-600" />
            )}
          </div>

          {/* Text */}
          <span className="text-sm font-medium flex-1 text-left">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>

        </button>

        {/* =========================
            LOGOUT
        ========================= */}
        <button
          type="button"
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl
            transition-all duration-200

            ${
              darkMode
                ? "text-gray-400 hover:text-red-400 hover:bg-red-500/5"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
            }
          `}
        >

          <div
            className={`
              w-9 h-9 rounded-lg flex items-center justify-center
              ${darkMode ? "bg-white/[0.03]" : "bg-gray-100"}
            `}
          >
            <MdLogout className="text-xl" />
          </div>

          <span className="text-sm font-medium">
            Logout
          </span>

        </button>

        {/* =========================
            COPYRIGHT
        ========================= */}
        <div className="mt-4 px-3">

          <p
            className={`text-[10px] ${
              darkMode ? "text-gray-600" : "text-gray-400"
            }`}
          >
            STUDIO ADMIN
          </p>

          <p
            className={`text-[10px] mt-1 ${
              darkMode ? "text-gray-700" : "text-gray-400"
            }`}
          >
            © 2026 All rights reserved
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;