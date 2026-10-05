import { useNavigate } from "react-router-dom";
import {
    MdLogout,
    MdPerson,
    MdMenu,
} from "react-icons/md";

function Topbar({ onMenuClick }) {
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
    const adminInitial =
        adminName
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
        <header
            className="
                sticky
                top-0
                z-30
                flex
                min-h-16
                w-full
                items-center
                justify-between
                gap-3
                border-b
                border-gray-200
                bg-white
                px-3
                py-3
                shadow-sm
                sm:px-5
                md:px-6
                lg:min-h-20
                lg:px-8
            "
        >

            {/* =========================
                LEFT SIDE
            ========================= */}
            <div className="flex min-w-0 items-center gap-3">

                {/* MOBILE MENU */}
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
                        rounded-lg
                        text-gray-600
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        lg:hidden
                    "
                    aria-label="Open menu"
                >
                    <MdMenu className="text-2xl" />
                </button>

                {/* TITLE */}
                <div className="min-w-0">

                    <h2
                        className="
                            truncate
                            text-base
                            font-semibold
                            text-gray-800
                            sm:text-lg
                            md:text-xl
                        "
                    >
                        Admin Dashboard
                    </h2>

                    <p
                        className="
                            hidden
                            text-sm
                            text-gray-500
                            sm:block
                        "
                    >
                        Welcome back,{" "}
                        <span className="font-medium capitalize text-gray-700">
                            {adminName}
                        </span>
                    </p>

                    {/* Mobile Welcome */}
                    <p
                        className="
                            truncate
                            text-xs
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

            {/* =========================
                RIGHT SIDE
            ========================= */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5">

                {/* =========================
                    ADMIN PROFILE
                ========================= */}
                <div className="flex items-center gap-2 sm:gap-3">

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
                            shadow-sm
                            sm:h-10
                            sm:w-10
                            sm:text-base
                            md:h-11
                            md:w-11
                            md:text-lg
                        "
                    >
                        {adminInitial || (
                            <MdPerson size={22} />
                        )}
                    </div>

                    {/* Admin Details */}
                    <div className="hidden min-w-0 sm:block">

                        <p
                            className="
                                max-w-32
                                truncate
                                text-sm
                                font-semibold
                                capitalize
                                text-gray-800
                                md:max-w-48
                            "
                        >
                            {adminName}
                        </p>

                        <p
                            className="
                                max-w-32
                                truncate
                                text-xs
                                text-gray-500
                                md:max-w-48
                            "
                        >
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
                    className="
                        flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-red-500
                        px-3
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:bg-red-600
                        active:scale-95
                        sm:px-4
                        sm:py-2.5
                    "
                >
                    <MdLogout className="text-lg sm:text-xl" />

                    {/* Hide text on very small screens */}
                    <span className="hidden text-sm font-medium sm:inline">
                        Logout
                    </span>
                </button>

            </div>

        </header>
    );
}

export default Topbar;