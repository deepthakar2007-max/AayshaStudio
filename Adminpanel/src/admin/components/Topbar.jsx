import { useNavigate } from "react-router-dom";

import {
    MdLogout,
    MdPerson,
    MdMenu,
} from "react-icons/md";

function Topbar({ onMenuClick }) {
    const navigate = useNavigate();

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

    const adminId =
        admin?._id ||
        admin?.id ||
        "Admin";

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
    // PROFILE
    // =========================
    const handleProfile = () => {
        navigate("/admin/profile");
    };

    return (
        <header
            className="
                sticky
                top-0
                z-30
                w-full
                border-b
                border-gray-200
                bg-white/95
                shadow-sm
                backdrop-blur-md
            "
        >
            <div
                className="
                    flex
                    min-h-[64px]
                    w-full
                    min-w-0
                    items-center
                    justify-between
                    gap-2
                    px-3
                    py-2

                    sm:min-h-[72px]
                    sm:px-5

                    md:px-6

                    lg:min-h-[80px]
                    lg:px-8
                "
            >

                {/* =========================================
                    LEFT SIDE
                ========================================= */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            text-gray-700
                            transition-all
                            hover:bg-gray-100
                            hover:text-gray-900
                            active:scale-95

                            sm:h-11
                            sm:w-11

                            lg:hidden
                        "
                        aria-label="Open menu"
                    >
                        <MdMenu className="text-[24px] sm:text-[26px]" />
                    </button>

                    {/* Page Title */}
                    <div className="min-w-0">
                        <h2
                            className="
                                truncate
                                text-[15px]
                                font-bold
                                leading-5
                                text-gray-800

                                sm:text-lg
                                sm:leading-6

                                md:text-xl
                            "
                        >
                            Admin Dashboard
                        </h2>

                        {/* Desktop/Tablet */}
                        <p
                            className="
                                hidden
                                truncate
                                text-xs
                                text-gray-500

                                sm:block
                                sm:text-sm
                            "
                        >
                            Welcome back,{" "}
                            <span className="font-semibold capitalize text-gray-700">
                                {adminName}
                            </span>
                        </p>

                        {/* Mobile */}
                        <p
                            className="
                                block
                                max-w-[130px]
                                truncate
                                text-[11px]
                                leading-4
                                text-gray-500

                                sm:hidden
                            "
                        >
                            Welcome,{" "}
                            <span className="font-medium capitalize text-gray-700">
                                {adminName}
                            </span>
                        </p>
                    </div>
                </div>

                {/* =========================================
                    RIGHT SIDE
                ========================================= */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">

                    {/* Admin Profile */}
                    <button
                        type="button"
                        onClick={handleProfile}
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                            rounded-xl
                            p-1.5
                            transition
                            hover:bg-gray-100

                            sm:gap-3
                            sm:p-2
                        "
                    >

                        {/* Avatar */}
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-blue-500
                                to-indigo-600
                                text-sm
                                font-bold
                                text-white
                                shadow-md

                                sm:h-10
                                sm:w-10
                                sm:text-base

                                md:h-11
                                md:w-11
                                md:text-lg
                            "
                        >
                            {adminInitial || (
                                <MdPerson className="text-xl" />
                            )}
                        </div>

                        {/* Name */}
                        <div className="hidden min-w-0 text-left sm:block">
                            <p
                                className="
                                    max-w-[120px]
                                    truncate
                                    text-sm
                                    font-semibold
                                    capitalize
                                    leading-5
                                    text-gray-800

                                    md:max-w-[170px]
                                "
                            >
                                {adminName}
                            </p>

                            <p
                                className="
                                    max-w-[120px]
                                    truncate
                                    text-[11px]
                                    leading-4
                                    text-gray-500

                                    md:max-w-[170px]
                                "
                            >
                                ID: {adminId}
                            </p>
                        </div>
                    </button>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-500
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:bg-red-600
                            hover:shadow-md
                            active:scale-95

                            sm:h-10
                            sm:w-auto
                            sm:gap-2
                            sm:px-3

                            md:px-4
                        "
                        title="Logout"
                    >
                        <MdLogout className="text-lg sm:text-xl" />

                        <span className="hidden text-sm font-medium sm:inline">
                            Logout
                        </span>
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Topbar;