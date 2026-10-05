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
    MdClose,
} from "react-icons/md";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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

        setSidebarOpen(false);

        navigate("/admin/login");
    };

    // =========================
    // CLOSE SIDEBAR
    // =========================
    const closeSidebar = () => {
        if (setSidebarOpen) {
            setSidebarOpen(false);
        }
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
                fixed
                top-0
                left-0
                z-50
                h-screen
                w-72
                flex
                flex-col
                border-r
                shadow-2xl
                transition-transform
                duration-300
                ease-in-out

                lg:sticky
                lg:top-0
                lg:z-40
                lg:translate-x-0

                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

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
                    px-5
                    py-5
                    border-b
                    ${
                        darkMode
                            ? "border-white/5"
                            : "border-gray-200"
                    }
                `}
            >
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-gradient-to-br
                                from-blue-500
                                to-indigo-600
                                shadow-lg
                                shadow-blue-500/20
                            "
                        >
                            <MdCameraAlt className="text-2xl text-white" />
                        </div>

                        <div>
                            <h1
                                className={`
                                    text-base
                                    font-bold
                                    tracking-wide
                                    sm:text-lg
                                    ${
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }
                                `}
                            >
                                AAYSHA STUDIO
                            </h1>

                            <p
                                className={`
                                    text-[9px]
                                    uppercase
                                    tracking-[0.25em]
                                    ${
                                        darkMode
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                    }
                                `}
                            >
                                Admin Panel
                            </p>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    <button
                        type="button"
                        onClick={closeSidebar}
                        className={`
                            rounded-lg
                            p-2
                            transition
                            lg:hidden
                            ${
                                darkMode
                                    ? "text-gray-400 hover:bg-white/5 hover:text-white"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }
                        `}
                    >
                        <MdClose className="text-xl" />
                    </button>

                </div>
            </div>

            {/* =========================
                ADMIN PROFILE
            ========================= */}
            <div className="px-4 pt-5">

                <div
                    className={`
                        rounded-xl
                        border
                        p-3
                        transition-all
                        duration-300
                        ${
                            darkMode
                                ? "border-white/5 bg-white/[0.03] hover:bg-white/[0.05]"
                                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }
                    `}
                >
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-blue-500
                                to-purple-600
                                font-semibold
                                uppercase
                                text-white
                            "
                        >
                            {adminInitial}
                        </div>

                        {/* Admin Info */}
                        <div className="min-w-0 flex-1">

                            <p
                                className={`
                                    truncate
                                    text-sm
                                    font-semibold
                                    ${
                                        darkMode
                                            ? "text-white"
                                            : "text-gray-900"
                                    }
                                `}
                            >
                                {adminName}
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    truncate
                                    text-[11px]
                                    text-gray-500
                                "
                            >
                                {adminEmail}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">

                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        bg-emerald-400
                                    "
                                ></span>

                                <span className="text-xs text-gray-500">
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
            <nav className="flex-1 overflow-y-auto px-4 py-6">

                <div className="space-y-7">

                    {menuGroups.map((group) => (
                        <div key={group.title}>

                            {/* Section Title */}
                            <p
                                className={`
                                    mb-3
                                    px-3
                                    text-[10px]
                                    font-semibold
                                    tracking-[0.2em]
                                    ${
                                        darkMode
                                            ? "text-gray-600"
                                            : "text-gray-400"
                                    }
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
                                                end={
                                                    item.path ===
                                                    "/admin"
                                                }
                                                onClick={
                                                    closeSidebar
                                                }
                                                className={({
                                                    isActive,
                                                }) => `
                                                    group
                                                    relative
                                                    flex
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-3
                                                    transition-all
                                                    duration-200

                                                    ${
                                                        isActive
                                                            ? darkMode
                                                                ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white"
                                                                : "bg-blue-50 text-blue-600"
                                                            : darkMode
                                                            ? "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                    }
                                                `}
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        {/* Active Line */}
                                                        {isActive && (
                                                            <span
                                                                className={`
                                                                    absolute
                                                                    left-0
                                                                    top-2
                                                                    bottom-2
                                                                    w-0.5
                                                                    rounded-full
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
                                                                flex
                                                                h-9
                                                                w-9
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                transition-all
                                                                duration-200

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
                                                                text-lg
                                                                transition-all
                                                                duration-200

                                                                ${
                                                                    isActive
                                                                        ? "translate-x-0 text-blue-400"
                                                                        : darkMode
                                                                        ? "-translate-x-1 text-gray-700 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                                        : "-translate-x-1 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
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
                    border-t
                    p-4
                    ${
                        darkMode
                            ? "border-white/5"
                            : "border-gray-200"
                    }
                `}
            >

                {/* System Status */}
                <div
                    className={`
                        mb-3
                        rounded-xl
                        border
                        p-3
                        transition-all
                        duration-300
                        ${
                            darkMode
                                ? "border-white/5 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                                : "border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50"
                        }
                    `}
                >
                    <div className="flex items-center gap-2">

                        <span className="relative flex h-2 w-2">

                            <span
                                className="
                                    absolute
                                    inline-flex
                                    h-2
                                    w-2
                                    animate-ping
                                    rounded-full
                                    bg-emerald-400
                                    opacity-75
                                "
                            ></span>

                            <span
                                className="
                                    relative
                                    inline-flex
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-500
                                "
                            ></span>

                        </span>

                        <span
                            className={`
                                text-xs
                                ${
                                    darkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            `}
                        >
                            System is running
                        </span>

                    </div>
                </div>

                {/* Light / Dark */}
                <button
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`
                        mb-2
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        transition-all
                        duration-200
                        ${
                            darkMode
                                ? "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }
                    `}
                >
                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            ${
                                darkMode
                                    ? "bg-white/[0.03]"
                                    : "bg-gray-100"
                            }
                        `}
                    >
                        {darkMode ? (
                            <MdLightMode className="text-xl text-yellow-400" />
                        ) : (
                            <MdDarkMode className="text-xl text-indigo-600" />
                        )}
                    </div>

                    <span className="flex-1 text-left text-sm font-medium">
                        {darkMode
                            ? "Light Mode"
                            : "Dark Mode"}
                    </span>
                </button>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        transition-all
                        duration-200
                        ${
                            darkMode
                                ? "text-gray-400 hover:bg-red-500/5 hover:text-red-400"
                                : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                        }
                    `}
                >
                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            ${
                                darkMode
                                    ? "bg-white/[0.03]"
                                    : "bg-gray-100"
                            }
                        `}
                    >
                        <MdLogout className="text-xl" />
                    </div>

                    <span className="text-sm font-medium">
                        Logout
                    </span>
                </button>

                {/* Copyright */}
                <div className="mt-4 px-3">

                    <p
                        className={`
                            text-[10px]
                            ${
                                darkMode
                                    ? "text-gray-600"
                                    : "text-gray-400"
                            }
                        `}
                    >
                        STUDIO ADMIN
                    </p>

                    <p
                        className={`
                            mt-1
                            text-[10px]
                            ${
                                darkMode
                                    ? "text-gray-700"
                                    : "text-gray-400"
                            }
                        `}
                    >
                        © 2026 All rights reserved
                    </p>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;