import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    MdPhotoLibrary,
    MdVideoLibrary,
    MdCalendarMonth,
    MdArticle,
    MdPeople,
    MdRefresh,
    MdArrowForward,
    MdTrendingUp,
    MdAccessTime,
    MdCheckCircle,
    MdPending,
    MdCancel,
    MdAdd,
    MdDashboard,
} from "react-icons/md";

const API_URL = "https://aayshastudio.onrender.com/api";

// =====================================================
// GET ARRAY FROM API RESPONSE
// =====================================================
const getArray = (response) => {
    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    if (Array.isArray(response?.data?.photos)) {
        return response.data.photos;
    }

    if (Array.isArray(response?.data?.videos)) {
        return response.data.videos;
    }

    if (Array.isArray(response?.data?.bookings)) {
        return response.data.bookings;
    }

    if (Array.isArray(response?.data?.users)) {
        return response.data.users;
    }

    if (Array.isArray(response?.data?.customers)) {
        return response.data.customers;
    }

    if (Array.isArray(response?.data?.blogs)) {
        return response.data.blogs;
    }

    if (Array.isArray(response?.data?.blog)) {
        return response.data.blog;
    }

    return [];
};

// =====================================================
// STAT CARD
// =====================================================
function StatCard({
    title,
    value,
    icon,
    iconBg,
    iconColor,
    description,
}) {
    return (
        <div
            className="
                group
                min-w-0
                overflow-hidden
                rounded-2xl
                border border-gray-200
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                sm:p-5
            "
        >
            <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                        {title}
                    </p>

                    <h3 className="mt-2 truncate text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
                        {value}
                    </h3>
                </div>

                <div
                    className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${iconBg}
                        ${iconColor}
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        sm:h-11
                        sm:w-11
                    `}
                >
                    {icon}
                </div>
            </div>

            <div className="mt-4 flex min-w-0 items-center gap-2">
                <MdTrendingUp
                    size={16}
                    className="shrink-0 text-green-500"
                />

                <span className="truncate text-xs font-medium text-gray-500">
                    {description}
                </span>
            </div>
        </div>
    );
}

// =====================================================
// QUICK ACTION
// =====================================================
function QuickAction({
    to,
    icon,
    title,
    description,
    iconBg,
    iconColor,
}) {
    return (
        <Link
            to={to}
            className="
                group
                flex
                min-w-0
                items-center
                gap-3
                overflow-hidden
                rounded-xl
                border border-gray-200
                bg-white
                p-3
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-gray-300
                hover:shadow-md
                sm:p-4
            "
        >
            <div
                className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${iconBg}
                    ${iconColor}
                    sm:h-11
                    sm:w-11
                `}
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-gray-800">
                    {title}
                </h4>

                <p className="truncate text-xs text-gray-500">
                    {description}
                </p>
            </div>

            <MdArrowForward
                className="
                    shrink-0
                    text-lg
                    text-gray-400
                    transition-transform
                    group-hover:translate-x-1
                "
            />
        </Link>
    );
}

// =====================================================
// DASHBOARD
// =====================================================
function Dashboard() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // =================================================
    // FETCH DATA
    // =================================================
    const fetchDashboardData = useCallback(
        async (isRefresh = false) => {
            try {
                setError("");

                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                const [
                    photosResponse,
                    videosResponse,
                    bookingsResponse,
                    usersResponse,
                    blogsResponse,
                ] = await Promise.all([
                    axios.get(`${API_URL}/photos`),
                    axios.get(`${API_URL}/videos`),
                    axios.get(`${API_URL}/bookings`),
                    axios.get(`${API_URL}/auth/users`),
                    axios.get(`${API_URL}/blog`),
                ]);

                setPhotos(getArray(photosResponse));
                setVideos(getArray(videosResponse));
                setBookings(getArray(bookingsResponse));
                setUsers(getArray(usersResponse));
                setBlogs(getArray(blogsResponse));
            } catch (err) {
                console.error("Dashboard API Error:", err);

                setError(
                    err?.response?.data?.message ||
                        "Unable to load dashboard data."
                );
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    // =================================================
    // INITIAL LOAD
    // =================================================
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // =================================================
    // RECENT BOOKINGS
    // =================================================
    const recentBookings = [...bookings]
        .sort((a, b) => {
            const dateA = new Date(
                a?.createdAt ||
                    a?.date ||
                    a?.bookingDate ||
                    0
            );

            const dateB = new Date(
                b?.createdAt ||
                    b?.date ||
                    b?.bookingDate ||
                    0
            );

            return dateB - dateA;
        })
        .slice(0, 5);

    // =================================================
    // BOOKING STATUS
    // =================================================
    const confirmedBookings = bookings.filter(
        (booking) =>
            String(booking?.status || "").toLowerCase() ===
            "confirmed"
    ).length;

    const pendingBookings = bookings.filter(
        (booking) =>
            String(booking?.status || "").toLowerCase() ===
            "pending"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) =>
            String(booking?.status || "").toLowerCase() ===
            "cancelled"
    ).length;

    // =================================================
    // FORMAT DATE
    // =================================================
    const formatDate = (date) => {
        if (!date) return "-";

        const formatted = new Date(date);

        if (Number.isNaN(formatted.getTime())) {
            return "-";
        }

        return formatted.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // =================================================
    // CUSTOMER NAME
    // =================================================
    const getCustomerName = (booking) => {
        return (
            booking?.customer?.name ||
            booking?.user?.name ||
            booking?.name ||
            booking?.customerName ||
            "Unknown"
        );
    };

    // =================================================
    // CUSTOMER EMAIL
    // =================================================
    const getCustomerEmail = (booking) => {
        return (
            booking?.customer?.email ||
            booking?.user?.email ||
            booking?.email ||
            "-"
        );
    };

    // =================================================
    // STATUS STYLE
    // =================================================
    const getStatusStyle = (status) => {
        const currentStatus = String(
            status || ""
        ).toLowerCase();

        if (currentStatus === "confirmed") {
            return {
                className:
                    "bg-green-50 text-green-700 border-green-200",
                icon: <MdCheckCircle />,
            };
        }

        if (currentStatus === "cancelled") {
            return {
                className:
                    "bg-red-50 text-red-700 border-red-200",
                icon: <MdCancel />,
            };
        }

        return {
            className:
                "bg-yellow-50 text-yellow-700 border-yellow-200",
            icon: <MdPending />,
        };
    };

    // =================================================
    // LOADING
    // =================================================
    if (loading) {
        return (
            <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
                <div className="text-center">
                    <div
                        className="
                            mx-auto
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-gray-200
                            border-t-blue-600
                            sm:h-12
                            sm:w-12
                        "
                    />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-w-0 max-w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* =================================================
                HEADER
            ================================================= */}
            <div
                className="
                    flex
                    w-full
                    min-w-0
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            sm:h-12
                            sm:w-12
                        "
                    >
                        <MdDashboard className="text-xl sm:text-2xl" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                            Dashboard
                        </h1>

                        <p className="break-words text-xs leading-relaxed text-gray-500 sm:text-sm">
                            Overview of your studio management system
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => fetchDashboardData(true)}
                    disabled={refreshing}
                    className="
                        flex
                        w-full
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gray-900
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-gray-800
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        sm:w-auto
                    "
                >
                    <MdRefresh
                        className={`text-xl ${
                            refreshing ? "animate-spin" : ""
                        }`}
                    />

                    {refreshing ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}
            {error && (
                <div
                    className="
                        flex
                        w-full
                        min-w-0
                        flex-col
                        gap-3
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p className="min-w-0 break-words text-sm text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => fetchDashboardData(true)}
                        className="
                            w-full
                            shrink-0
                            rounded-lg
                            bg-red-600
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                            sm:w-auto
                        "
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* =================================================
                STATS
            ================================================= */}
            <div
                className="
                    grid
                    w-full
                    min-w-0
                    grid-cols-1
                    gap-4
                    min-[480px]:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-5
                "
            >
                <StatCard
                    title="Total Photos"
                    value={photos.length}
                    icon={<MdPhotoLibrary className="text-xl sm:text-2xl" />}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    description="Photos in gallery"
                />

                <StatCard
                    title="Total Videos"
                    value={videos.length}
                    icon={<MdVideoLibrary className="text-xl sm:text-2xl" />}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                    description="Videos uploaded"
                />

                <StatCard
                    title="Total Bookings"
                    value={bookings.length}
                    icon={<MdCalendarMonth className="text-xl sm:text-2xl" />}
                    iconBg="bg-orange-50"
                    iconColor="text-orange-600"
                    description="All bookings"
                />

                <StatCard
                    title="Total Blogs"
                    value={blogs.length}
                    icon={<MdArticle className="text-xl sm:text-2xl" />}
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                    description="Published content"
                />

                <StatCard
                    title="Total Users"
                    value={users.length}
                    icon={<MdPeople className="text-xl sm:text-2xl" />}
                    iconBg="bg-pink-50"
                    iconColor="text-pink-600"
                    description="Registered users"
                />
            </div>

            {/* =================================================
                RECENT BOOKINGS + QUICK ACTIONS
            ================================================= */}
            <div
                className="
                    grid
                    w-full
                    min-w-0
                    grid-cols-1
                    gap-5
                    xl:grid-cols-3
                "
            >
                {/* =================================================
                    RECENT BOOKINGS
                ================================================= */}
                <div
                    className="
                        min-w-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-sm
                        xl:col-span-2
                    "
                >
                    {/* HEADER */}
                    <div
                        className="
                            flex
                            min-w-0
                            flex-col
                            gap-3
                            border-b
                            border-gray-100
                            p-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            sm:p-5
                        "
                    >
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                                Recent Bookings
                            </h2>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                Latest booking activity
                            </p>
                        </div>

                        <Link
                            to="/admin/bookings"
                            className="
                                flex
                                w-fit
                                shrink-0
                                items-center
                                gap-1
                                text-sm
                                font-medium
                                text-blue-600
                                hover:text-blue-700
                            "
                        >
                            View All
                            <MdArrowForward />
                        </Link>
                    </div>

                    {/* =================================================
                        MOBILE BOOKING CARDS
                    ================================================= */}
                    <div className="block space-y-3 p-3 sm:hidden">
                        {recentBookings.length > 0 ? (
                            recentBookings.map((booking, index) => {
                                const status = getStatusStyle(
                                    booking?.status
                                );

                                return (
                                    <div
                                        key={
                                            booking?._id ||
                                            booking?.id ||
                                            index
                                        }
                                        className="
                                            min-w-0
                                            overflow-hidden
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            p-4
                                        "
                                    >
                                        <div className="flex min-w-0 items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold text-gray-800">
                                                    {getCustomerName(
                                                        booking
                                                    )}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-gray-500">
                                                    {getCustomerEmail(
                                                        booking
                                                    )}
                                                </p>
                                            </div>

                                            <span
                                                className={`
                                                    inline-flex
                                                    shrink-0
                                                    items-center
                                                    gap-1
                                                    rounded-full
                                                    border
                                                    px-2
                                                    py-1
                                                    text-[11px]
                                                    font-medium
                                                    ${status.className}
                                                `}
                                            >
                                                {status.icon}

                                                <span className="capitalize">
                                                    {booking?.status ||
                                                        "Pending"}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-200 pt-3">
                                            <div className="min-w-0">
                                                <p className="text-[11px] text-gray-400">
                                                    Booking Date
                                                </p>

                                                <p className="mt-1 truncate text-xs font-medium text-gray-700">
                                                    {formatDate(
                                                        booking?.bookingDate ||
                                                            booking?.date
                                                    )}
                                                </p>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] text-gray-400">
                                                    Created
                                                </p>

                                                <p className="mt-1 truncate text-xs font-medium text-gray-700">
                                                    {formatDate(
                                                        booking?.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-8 text-center text-sm text-gray-500">
                                No bookings found.
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        DESKTOP TABLE
                    ================================================= */}
                    <div className="hidden w-full overflow-x-auto sm:block">
                        <table className="w-full table-fixed text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="w-[38%] px-4 py-3 text-xs font-semibold text-gray-500 lg:px-5">
                                        Customer
                                    </th>

                                    <th className="w-[20%] px-3 py-3 text-xs font-semibold text-gray-500">
                                        Date
                                    </th>

                                    <th className="w-[20%] px-3 py-3 text-xs font-semibold text-gray-500">
                                        Status
                                    </th>

                                    <th className="w-[22%] px-3 py-3 text-xs font-semibold text-gray-500">
                                        Created
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentBookings.length > 0 ? (
                                    recentBookings.map(
                                        (booking, index) => {
                                            const status =
                                                getStatusStyle(
                                                    booking?.status
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        booking?._id ||
                                                        booking?.id ||
                                                        index
                                                    }
                                                    className="
                                                        border-b
                                                        border-gray-100
                                                        last:border-0
                                                        hover:bg-gray-50
                                                    "
                                                >
                                                    <td className="min-w-0 px-4 py-4 lg:px-5">
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-gray-800">
                                                                {getCustomerName(
                                                                    booking
                                                                )}
                                                            </p>

                                                            <p className="truncate text-xs text-gray-500">
                                                                {getCustomerEmail(
                                                                    booking
                                                                )}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="truncate px-3 py-4 text-xs text-gray-600 sm:text-sm">
                                                        {formatDate(
                                                            booking?.bookingDate ||
                                                                booking?.date
                                                        )}
                                                    </td>

                                                    <td className="px-3 py-4">
                                                        <span
                                                            className={`
                                                                inline-flex
                                                                max-w-full
                                                                items-center
                                                                gap-1
                                                                rounded-full
                                                                border
                                                                px-2
                                                                py-1
                                                                text-[11px]
                                                                font-medium
                                                                ${status.className}
                                                            `}
                                                        >
                                                            {status.icon}

                                                            <span className="truncate capitalize">
                                                                {booking?.status ||
                                                                    "Pending"}
                                                            </span>
                                                        </span>
                                                    </td>

                                                    <td className="px-3 py-4 text-xs text-gray-500 sm:text-sm">
                                                        <div className="flex min-w-0 items-center gap-1">
                                                            <MdAccessTime className="shrink-0" />

                                                            <span className="truncate">
                                                                {formatDate(
                                                                    booking?.createdAt
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-12 text-center text-sm text-gray-500"
                                        >
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}
                <div
                    className="
                        min-w-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                    "
                >
                    <div className="mb-4">
                        <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                            Quick Actions
                        </h2>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            Manage your studio quickly
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 min-[500px]:grid-cols-2 xl:grid-cols-1">
                        <QuickAction
                            to="/admin/photos"
                            icon={<MdPhotoLibrary className="text-xl" />}
                            title="Manage Photos"
                            description="Add or remove photos"
                            iconBg="bg-blue-50"
                            iconColor="text-blue-600"
                        />

                        <QuickAction
                            to="/admin/videos"
                            icon={<MdVideoLibrary className="text-xl" />}
                            title="Manage Videos"
                            description="Upload studio videos"
                            iconBg="bg-purple-50"
                            iconColor="text-purple-600"
                        />

                        <QuickAction
                            to="/admin/bookings"
                            icon={<MdCalendarMonth className="text-xl" />}
                            title="Bookings"
                            description="View all bookings"
                            iconBg="bg-orange-50"
                            iconColor="text-orange-600"
                        />

                        <QuickAction
                            to="/admin/blogs"
                            icon={<MdArticle className="text-xl" />}
                            title="Manage Blogs"
                            description="Create new content"
                            iconBg="bg-green-50"
                            iconColor="text-green-600"
                        />

                        <QuickAction
                            to="/users"
                            icon={<MdPeople className="text-xl" />}
                            title="Users"
                            description="Manage customers"
                            iconBg="bg-pink-50"
                            iconColor="text-pink-600"
                        />
                    </div>
                </div>
            </div>

            {/* =================================================
                BOOKING + CONTENT OVERVIEW
            ================================================= */}
            <div
                className="
                    grid
                    w-full
                    min-w-0
                    grid-cols-1
                    gap-5
                    lg:grid-cols-2
                "
            >
                {/* BOOKING OVERVIEW */}
                <div
                    className="
                        min-w-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                    "
                >
                    <div className="mb-5">
                        <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                            Booking Overview
                        </h2>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            Current booking status
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {/* CONFIRMED */}
                        <div className="min-w-0 rounded-xl border border-green-100 bg-green-50 p-4">
                            <div className="flex min-w-0 items-center gap-2">
                                <MdCheckCircle className="shrink-0 text-xl text-green-600" />

                                <span className="truncate text-xs font-medium text-green-700">
                                    Confirmed
                                </span>
                            </div>

                            <p className="mt-3 text-2xl font-bold text-green-800">
                                {confirmedBookings}
                            </p>
                        </div>

                        {/* PENDING */}
                        <div className="min-w-0 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
                            <div className="flex min-w-0 items-center gap-2">
                                <MdPending className="shrink-0 text-xl text-yellow-600" />

                                <span className="truncate text-xs font-medium text-yellow-700">
                                    Pending
                                </span>
                            </div>

                            <p className="mt-3 text-2xl font-bold text-yellow-800">
                                {pendingBookings}
                            </p>
                        </div>

                        {/* CANCELLED */}
                        <div className="min-w-0 rounded-xl border border-red-100 bg-red-50 p-4">
                            <div className="flex min-w-0 items-center gap-2">
                                <MdCancel className="shrink-0 text-xl text-red-600" />

                                <span className="truncate text-xs font-medium text-red-700">
                                    Cancelled
                                </span>
                            </div>

                            <p className="mt-3 text-2xl font-bold text-red-800">
                                {cancelledBookings}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CONTENT OVERVIEW */}
                <div
                    className="
                        min-w-0
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                    "
                >
                    <div className="mb-5">
                        <h2 className="text-base font-bold text-gray-800 sm:text-lg">
                            Content Overview
                        </h2>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            Manage your studio content
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                            to="/admin/photos"
                            className="
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-3
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <MdPhotoLibrary className="shrink-0 text-2xl text-blue-600" />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Photos
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {photos.length} items
                                    </p>
                                </div>
                            </div>

                            <MdArrowForward className="shrink-0 text-gray-400" />
                        </Link>

                        <Link
                            to="/admin/videos"
                            className="
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-3
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <MdVideoLibrary className="shrink-0 text-2xl text-purple-600" />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Videos
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {videos.length} items
                                    </p>
                                </div>
                            </div>

                            <MdArrowForward className="shrink-0 text-gray-400" />
                        </Link>

                        <Link
                            to="/admin/blogs"
                            className="
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-3
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <MdArticle className="shrink-0 text-2xl text-green-600" />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Blogs
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {blogs.length} posts
                                    </p>
                                </div>
                            </div>

                            <MdArrowForward className="shrink-0 text-gray-400" />
                        </Link>

                        <Link
                            to="/users"
                            className="
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-3
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                                transition
                                hover:bg-gray-50
                            "
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <MdPeople className="shrink-0 text-2xl text-pink-600" />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Customers
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {users.length} users
                                    </p>
                                </div>
                            </div>

                            <MdArrowForward className="shrink-0 text-gray-400" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* =================================================
                FOOTER ACTION
            ================================================= */}
            <div
                className="
                    flex
                    w-full
                    min-w-0
                    flex-col
                    gap-4
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-4
                    shadow-sm
                    sm:p-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                <div className="min-w-0">
                    <h3 className="text-sm font-bold text-gray-800 sm:text-base">
                        Need to add something new?
                    </h3>

                    <p className="break-words text-xs text-gray-500 sm:text-sm">
                        Quickly add photos, videos or blog posts.
                    </p>
                </div>

                <div
                    className="
                        grid
                        w-full
                        grid-cols-1
                        gap-2
                        min-[400px]:grid-cols-3
                        lg:w-auto
                    "
                >
                    <Link
                        to="/admin/photos"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        <MdAdd />
                        Photo
                    </Link>

                    <Link
                        to="/admin/videos"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-purple-600
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:bg-purple-700
                        "
                    >
                        <MdAdd />
                        Video
                    </Link>

                    <Link
                        to="/admin/blogs"
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:bg-green-700
                        "
                    >
                        <MdAdd />
                        Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;