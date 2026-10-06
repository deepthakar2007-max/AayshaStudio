import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    MdDashboard,
    MdPhotoLibrary,
    MdVideoLibrary,
    MdPeople,
    MdCollections,
    MdArticle,
    MdCalendarMonth,
    MdPerson,
    MdLogout,
    MdClose,
    MdDarkMode,
    MdLightMode,
    MdCircle,
    MdChevronRight,
} from "react-icons/md";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(true);

    // =========================
    // GET ADMIN DATA
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

    const adminName =
        admin?.name ||
        admin?.username ||
        admin?.fullName ||
        "Admin";

    const adminEmail =
        admin?.email ||
        "admin@aayshastudio.com";

    const adminInitial =
        adminName?.trim()?.charAt(0)?.toUpperCase() || "A";

    // =========================
    // MENU DATA
    // =========================
    const menuItems = [
        {
            title: "Dashboard",
            path: "/admin",
            icon: <MdDashboard />,
        },
        {
            title: "Photos",
            path: "/admin/photos",
            icon: <MdPhotoLibrary />,
        },
        {
            title: "Videos",
            path: "/admin/videos",
            icon: <MdVideoLibrary />,
        },
        {
            title: "Users",
            path: "/users",
            icon: <MdPeople />,
        },
        {
            title: "Gallery",
            path: "/admin/gallery",
            icon: <MdCollections />,
        },
        {
            title: "Blogs",
            path: "/admin/blogs",
            icon: <MdArticle />,
        },
        {
            title: "Bookings",
            path: "/admin/bookings",
            icon: <MdCalendarMonth />,
        },
        {
            title: "Profile",
            path: "/admin/profile",
            icon: <MdPerson />,
        },
    ];

    // =========================
    // ACTIVE CHECK
    // =========================
    const isActive = (path) => {
        if (path === "/admin") {
            return location.pathname === "/admin";
        }

        return location.pathname.startsWith(path);
    };

    // =========================
    // NAVIGATION
    // =========================
    const handleNavigation = (path) => {
        navigate(path);

        // Mobile / tablet par sidebar close
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

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

    return (
        <>
            {/* =========================================
                MOBILE OVERLAY
            ========================================= */}
            {sidebarOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/60
                        backdrop-blur-[2px]
                        lg:hidden
                    "
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* =========================================
                SIDEBAR
                NOT FIXED
            ========================================= */}
            <aside
                className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-[280px]
        shrink-0
        flex-col
        overflow-hidden
        border-r
        shadow-2xl
        transition-transform
        duration-300
        ease-in-out

        ${darkMode
                        ? "border-gray-800 bg-gray-950 text-white"
                        : "border-gray-200 bg-white text-gray-800"
                    }

        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

        lg:translate-x-0
    `}
            >

                {/* =========================================
                    LOGO HEADER
                ========================================= */}
                <div
                    className={`
                        flex
                        h-[76px]
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        px-5

                        ${darkMode
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
                    `}
                >
                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                            text-left
                        "
                    >
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
                                text-lg
                                font-bold
                                text-white
                                shadow-lg
                            "
                        >
                            A
                        </div>

                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-bold">
                                AAYSHA STUDIO
                            </h1>

                            <p
                                className={`
                                    truncate
                                    text-[10px]
                                    uppercase
                                    tracking-[2px]

                                    ${darkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }
                                `}
                            >
                                Admin Panel
                            </p>
                        </div>
                    </button>

                    {/* Mobile Close */}
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-800
                            hover:text-white
                            lg:hidden
                        "
                        aria-label="Close sidebar"
                    >
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                {/* =========================================
                    SCROLLABLE CONTENT
                ========================================= */}
                <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">

                    {/* =========================================
                        ADMIN PROFILE
                    ========================================= */}
                    <div className="px-4 py-5">
                        <div
                            className={`
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                p-3

                                ${darkMode
                                    ? "border-gray-800 bg-gray-900"
                                    : "border-gray-200 bg-gray-50"
                                }
                            `}
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-blue-500
                                    to-indigo-600
                                    text-base
                                    font-bold
                                    text-white
                                "
                            >
                                {adminInitial}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold capitalize">
                                    {adminName}
                                </p>

                                <p
                                    className={`
                                        mt-0.5
                                        truncate
                                        text-xs

                                        ${darkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }
                                    `}
                                >
                                    {adminEmail}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <MdCircle className="text-[8px] text-green-500" />

                                    <span className="text-[10px] text-green-500">
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        MENU TITLE
                    ========================================= */}
                    <div className="px-5 pb-2">
                        <p
                            className={`
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[2px]

                                ${darkMode
                                    ? "text-gray-500"
                                    : "text-gray-400"
                                }
                            `}
                        >
                            Main Menu
                        </p>
                    </div>

                    {/* =========================================
                        NAVIGATION
                    ========================================= */}
                    <nav className="space-y-1 px-3 pb-5">

                        {menuItems.map((item) => {
                            const active = isActive(item.path);

                            return (
                                <button
                                    key={item.path}
                                    type="button"
                                    onClick={() =>
                                        handleNavigation(item.path)
                                    }
                                    className={`
                                        group
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-left
                                        transition-all
                                        duration-200

                                        ${active
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                                            : darkMode
                                                ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-xl

                                            ${active
                                                ? "bg-white/15 text-white"
                                                : darkMode
                                                    ? "text-gray-400 group-hover:text-white"
                                                    : "text-gray-500 group-hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        {item.icon}
                                    </span>

                                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                        {item.title}
                                    </span>

                                    {active && (
                                        <MdChevronRight className="shrink-0 text-lg" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* =========================================
                        SYSTEM STATUS
                    ========================================= */}
                    <div className="px-4 pb-5">
                        <div
                            className={`
                                rounded-2xl
                                border
                                p-4

                                ${darkMode
                                    ? "border-gray-800 bg-gray-900"
                                    : "border-gray-200 bg-gray-50"
                                }
                            `}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span
                                    className={`
                                        text-xs
                                        font-medium

                                        ${darkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }
                                    `}
                                >
                                    System Status
                                </span>

                                <MdCircle className="text-[9px] text-green-500" />
                            </div>

                            <div className="space-y-2">

                                <div className="flex items-center justify-between text-xs">
                                    <span
                                        className={
                                            darkMode
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        }
                                    >
                                        Server
                                    </span>

                                    <span className="font-medium text-green-500">
                                        Online
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span
                                        className={
                                            darkMode
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        }
                                    >
                                        Database
                                    </span>

                                    <span className="font-medium text-green-500">
                                        Connected
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        THEME
                    ========================================= */}
                    <div className="px-4 pb-4">
                        <button
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            className={`
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                border
                                px-4
                                py-3
                                transition

                                ${darkMode
                                    ? "border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800"
                                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }
                            `}
                        >
                            <span
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-gray-700
                                    text-yellow-400
                                "
                            >
                                {darkMode ? (
                                    <MdDarkMode className="text-lg" />
                                ) : (
                                    <MdLightMode className="text-lg" />
                                )}
                            </span>

                            <span className="flex-1 text-left text-sm font-medium">
                                {darkMode ? "Dark Mode" : "Light Mode"}
                            </span>

                            <div
                                className={`
                                    relative
                                    h-5
                                    w-9
                                    rounded-full
                                    transition

                                    ${darkMode
                                        ? "bg-blue-600"
                                        : "bg-gray-300"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        absolute
                                        top-0.5
                                        h-4
                                        w-4
                                        rounded-full
                                        bg-white
                                        shadow
                                        transition-all

                                        ${darkMode
                                            ? "left-[18px]"
                                            : "left-0.5"
                                        }
                                    `}
                                />
                            </div>
                        </button>
                    </div>

                </div>

                {/* =========================================
                    FOOTER
                ========================================= */}
                <div
                    className={`
                        shrink-0
                        border-t
                        px-4
                        py-4

                        ${darkMode
                            ? "border-gray-800"
                            : "border-gray-200"
                        }
                    `}
                >
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-red-500
                            px-4
                            py-3
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-600
                            active:scale-[0.98]
                        "
                    >
                        <MdLogout className="text-xl" />

                        <span>
                            Logout
                        </span>
                    </button>

                    <p
                        className={`
                            mt-3
                            text-center
                            text-[10px]

                            ${darkMode
                                ? "text-gray-600"
                                : "text-gray-400"
                            }
                        `}
                    >
                        Aaysha Studio Admin Panel
                    </p>
                </div>

            </aside>
        </>
    );
}

export default Sidebar;