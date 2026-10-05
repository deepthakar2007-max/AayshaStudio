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

const API_URL =
    "https://aayshastudio.onrender.com/api";

function Dashboard() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // GET ARRAY FROM API RESPONSE
    // ==========================================
    const getArray = (response) => {
        const result = response?.data;

        if (Array.isArray(result)) {
            return result;
        }

        if (Array.isArray(result?.data)) {
            return result.data;
        }

        if (Array.isArray(result?.photos)) {
            return result.photos;
        }

        if (Array.isArray(result?.videos)) {
            return result.videos;
        }

        if (Array.isArray(result?.bookings)) {
            return result.bookings;
        }

        if (Array.isArray(result?.users)) {
            return result.users;
        }

        if (Array.isArray(result?.customers)) {
            return result.customers;
        }

        if (Array.isArray(result?.blogs)) {
            return result.blogs;
        }

        if (Array.isArray(result?.blog)) {
            return result.blog;
        }

        return [];
    };

    // ==========================================
    // FETCH DASHBOARD DATA
    // ==========================================
    const fetchDashboardData = useCallback(
        async (isRefresh = false) => {
            try {
                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                setError("");

                const [
                    photosRes,
                    videosRes,
                    bookingsRes,
                    usersRes,
                    blogsRes,
                ] = await Promise.all([
                    axios.get(`${API_URL}/photos`),
                    axios.get(`${API_URL}/videos`),
                    axios.get(`${API_URL}/bookings`),
                    axios.get(`${API_URL}/auth/users`),
                    axios.get(`${API_URL}/blog`),
                ]);

                console.log(
                    "PHOTOS API:",
                    photosRes.data
                );

                console.log(
                    "VIDEOS API:",
                    videosRes.data
                );

                console.log(
                    "BOOKINGS API:",
                    bookingsRes.data
                );

                console.log(
                    "USERS API:",
                    usersRes.data
                );

                console.log(
                    "BLOG API:",
                    blogsRes.data
                );

                setPhotos(getArray(photosRes));
                setVideos(getArray(videosRes));
                setBookings(getArray(bookingsRes));
                setUsers(getArray(usersRes));
                setBlogs(getArray(blogsRes));

            } catch (err) {
                console.error(
                    "Dashboard API Error:",
                    err
                );

                console.error(
                    "Response:",
                    err.response?.data
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load dashboard data. Please check your API."
                );

            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    // ==========================================
    // LOAD DASHBOARD
    // ==========================================
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // ==========================================
    // RECENT BOOKINGS
    // ==========================================
    const recentBookings = [...bookings]
        .sort((a, b) => {
            const dateA = new Date(
                a.createdAt ||
                a.date ||
                a.bookingDate ||
                0
            ).getTime();

            const dateB = new Date(
                b.createdAt ||
                b.date ||
                b.bookingDate ||
                0
            ).getTime();

            return dateB - dateA;
        })
        .slice(0, 5);

    // ==========================================
    // BOOKING STATUS COUNTS
    // ==========================================
    const confirmedBookings =
        bookings.filter(
            (booking) =>
                String(
                    booking.status || ""
                ).toLowerCase() === "confirmed"
        ).length;

    const pendingBookings =
        bookings.filter(
            (booking) =>
                String(
                    booking.status || "pending"
                ).toLowerCase() === "pending"
        ).length;

    const cancelledBookings =
        bookings.filter(
            (booking) =>
                String(
                    booking.status || ""
                ).toLowerCase() === "cancelled"
        ).length;

    // ==========================================
    // FORMAT DATE
    // ==========================================
    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        const parsedDate = new Date(date);

        if (isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ==========================================
    // GET CUSTOMER NAME
    // ==========================================
    const getCustomerName = (booking) => {
        return (
            booking.name ||
            booking.fullName ||
            booking.customerName ||
            booking.user?.name ||
            "Unknown Customer"
        );
    };

    // ==========================================
    // GET CUSTOMER EMAIL
    // ==========================================
    const getCustomerEmail = (booking) => {
        return (
            booking.email ||
            booking.user?.email ||
            "No email"
        );
    };

    // ==========================================
    // STATUS STYLE
    // ==========================================
    const getStatusStyle = (status) => {
        const value = String(
            status || "Pending"
        ).toLowerCase();

        if (value === "confirmed") {
            return {
                className:
                    "bg-green-50 text-green-700 border-green-200",
                icon: (
                    <MdCheckCircle size={15} />
                ),
            };
        }

        if (value === "cancelled") {
            return {
                className:
                    "bg-red-50 text-red-700 border-red-200",
                icon: <MdCancel size={15} />,
            };
        }

        return {
            className:
                "bg-amber-50 text-amber-700 border-amber-200",
            icon: <MdPending size={15} />,
        };
    };

    // ==========================================
    // STAT CARD
    // ==========================================
    const StatCard = ({
        title,
        value,
        icon,
        iconBg,
        iconColor,
        description,
    }) => {
        return (
            <div
                className="
                    group
                    rounded-2xl
                    border
                    border-gray-200
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
                <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                        <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                            {title}
                        </p>

                        <h3
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                tracking-tight
                                text-gray-800
                                sm:text-3xl
                            "
                        >
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
                            sm:h-12
                            sm:w-12
                            ${iconBg}
                            ${iconColor}
                            transition-transform
                            duration-300
                            group-hover:scale-110
                        `}
                    >
                        {icon}
                    </div>

                </div>

                <div className="mt-4 flex items-center gap-2">

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
    };

    // ==========================================
    // LOADING
    // ==========================================
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-white px-4">

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                        "
                    >
                        <MdDashboard
                            size={25}
                            className="animate-pulse text-blue-600"
                        />
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-600">
                        Loading dashboard...
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Please wait a moment
                    </p>

                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN
    // ==========================================
    return (
        <div className="min-h-full space-y-5 bg-white sm:space-y-6 lg:space-y-7">

            {/* ==========================================
                HEADER
            ========================================== */}
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-blue-600
                                text-white
                            "
                        >
                            <MdDashboard size={20} />
                        </div>

                        <h1
                            className="
                                truncate
                                text-xl
                                font-bold
                                tracking-tight
                                text-gray-800
                                sm:text-2xl
                            "
                        >
                            Dashboard
                        </h1>

                    </div>

                    <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                        Manage your photography business from one place.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        fetchDashboardData(true)
                    }
                    disabled={refreshing}
                    className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        shadow-sm
                        transition-all
                        hover:border-blue-300
                        hover:bg-blue-50
                        hover:text-blue-600
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        sm:w-auto
                    "
                >
                    <MdRefresh
                        size={19}
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh Data"}
                </button>

            </div>

            {/* ==========================================
                ERROR
            ========================================== */}
            {error && (
                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <p className="text-sm text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            fetchDashboardData(true)
                        }
                        className="
                            self-start
                            shrink-0
                            text-sm
                            font-medium
                            text-red-700
                            hover:underline
                            sm:self-auto
                        "
                    >
                        Retry
                    </button>

                </div>
            )}

            {/* ==========================================
                STATISTICS
            ========================================== */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-5
                "
            >

                <StatCard
                    title="Total Photos"
                    value={photos.length}
                    icon={
                        <MdPhotoLibrary size={25} />
                    }
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                    description="Photo library"
                />

                <StatCard
                    title="Total Videos"
                    value={videos.length}
                    icon={
                        <MdVideoLibrary size={25} />
                    }
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                    description="Video collection"
                />

                <StatCard
                    title="Total Bookings"
                    value={bookings.length}
                    icon={
                        <MdCalendarMonth size={25} />
                    }
                    iconBg="bg-orange-50"
                    iconColor="text-orange-600"
                    description="All bookings"
                />

                <StatCard
                    title="Total Blogs"
                    value={blogs.length}
                    icon={
                        <MdArticle size={25} />
                    }
                    iconBg="bg-emerald-50"
                    iconColor="text-emerald-600"
                    description="Published content"
                />

                <StatCard
                    title="Total Customers"
                    value={users.length}
                    icon={
                        <MdPeople size={25} />
                    }
                    iconBg="bg-pink-50"
                    iconColor="text-pink-600"
                    description="Registered customers"
                />

            </div>

            {/* ==========================================
                RECENT BOOKINGS + QUICK ACTIONS
            ========================================== */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-5
                    xl:grid-cols-3
                    xl:gap-6
                "
            >

                {/* ======================================
                    RECENT BOOKINGS
                ====================================== */}
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

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            border-b
                            border-gray-100
                            px-4
                            py-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            sm:px-6
                            sm:py-5
                        "
                    >

                        <div>
                            <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                                Recent Bookings
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                Latest customer booking activity
                            </p>
                        </div>

                        <Link
                            to="/admin/bookings"
                            className="
                                flex
                                w-fit
                                items-center
                                gap-1
                                text-sm
                                font-medium
                                text-blue-600
                                transition
                                hover:text-blue-700
                            "
                        >
                            View All
                            <MdArrowForward size={17} />
                        </Link>

                    </div>

                    {/* Horizontal Scroll */}
                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-[620px]">

                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70">

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                                        Customer
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                                        Booking Date
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                                        Status
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {recentBookings.length > 0 ? (
                                    recentBookings.map(
                                        (
                                            booking,
                                            index
                                        ) => {
                                            const customerName =
                                                getCustomerName(
                                                    booking
                                                );

                                            const customerEmail =
                                                getCustomerEmail(
                                                    booking
                                                );

                                            const status =
                                                booking.status ||
                                                "Pending";

                                            const statusStyle =
                                                getStatusStyle(
                                                    status
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        booking._id ||
                                                        booking.id ||
                                                        index
                                                    }
                                                    className="
                                                        border-b
                                                        border-gray-100
                                                        transition
                                                        hover:bg-gray-50
                                                    "
                                                >

                                                    {/* Customer */}
                                                    <td className="px-4 py-4 sm:px-6">

                                                        <div className="flex items-center gap-3">

                                                            <div
                                                                className="
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-blue-50
                                                                    text-sm
                                                                    font-semibold
                                                                    text-blue-600
                                                                    sm:h-10
                                                                    sm:w-10
                                                                "
                                                            >
                                                                {customerName
                                                                    .charAt(
                                                                        0
                                                                    )
                                                                    .toUpperCase()}
                                                            </div>

                                                            <div className="min-w-0">

                                                                <p className="max-w-48 truncate text-sm font-semibold text-gray-800">
                                                                    {customerName}
                                                                </p>

                                                                <p className="max-w-48 truncate text-xs text-gray-500">
                                                                    {customerEmail}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-4 py-4 sm:px-6">

                                                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">

                                                            <MdAccessTime
                                                                size={17}
                                                                className="shrink-0 text-gray-400"
                                                            />

                                                            {formatDate(
                                                                booking.date ||
                                                                booking.bookingDate ||
                                                                booking.createdAt
                                                            )}

                                                        </div>

                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-4 py-4 sm:px-6">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                items-center
                                                                gap-1.5
                                                                whitespace-nowrap
                                                                rounded-full
                                                                border
                                                                px-3
                                                                py-1
                                                                text-xs
                                                                font-medium
                                                                ${statusStyle.className}
                                                            `}
                                                        >
                                                            {
                                                                statusStyle.icon
                                                            }

                                                            {status}
                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="px-6 py-12 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div
                                                    className="
                                                        flex
                                                        h-12
                                                        w-12
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-gray-100
                                                        text-gray-400
                                                    "
                                                >
                                                    <MdCalendarMonth
                                                        size={24}
                                                    />
                                                </div>

                                                <p className="mt-3 text-sm font-medium text-gray-700">
                                                    No bookings found
                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">
                                                    New bookings will appear here.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>

                {/* ======================================
                    QUICK ACTIONS
                ====================================== */}
                <div className="min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">

                        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                            Manage your website content
                        </p>

                    </div>

                    <div className="grid gap-3 p-4 sm:p-5">

                        {/* Photos */}
                        <Link
                            to="/admin/photos"
                            className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-3
                                transition-all
                                duration-200
                                hover:border-blue-200
                                hover:bg-blue-50
                                sm:p-4
                            "
                        >

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <MdPhotoLibrary size={21} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Manage Photos
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {photos.length} photos
                                    </p>

                                </div>

                            </div>

                            <MdArrowForward
                                size={19}
                                className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                            />

                        </Link>

                        {/* Videos */}
                        <Link
                            to="/admin/videos"
                            className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-3
                                transition-all
                                duration-200
                                hover:border-purple-200
                                hover:bg-purple-50
                                sm:p-4
                            "
                        >

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <MdVideoLibrary size={21} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Manage Videos
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {videos.length} videos
                                    </p>

                                </div>

                            </div>

                            <MdArrowForward
                                size={19}
                                className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600"
                            />

                        </Link>

                        {/* Bookings */}
                        <Link
                            to="/admin/bookings"
                            className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-3
                                transition-all
                                duration-200
                                hover:border-orange-200
                                hover:bg-orange-50
                                sm:p-4
                            "
                        >

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                    <MdCalendarMonth size={21} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Manage Bookings
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {pendingBookings} pending
                                    </p>

                                </div>

                            </div>

                            <MdArrowForward
                                size={19}
                                className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-600"
                            />

                        </Link>

                        {/* Blogs */}
                        <Link
                            to="/admin/blogs"
                            className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-3
                                transition-all
                                duration-200
                                hover:border-emerald-200
                                hover:bg-emerald-50
                                sm:p-4
                            "
                        >

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <MdArticle size={21} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Manage Blogs
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {blogs.length} articles
                                    </p>

                                </div>

                            </div>

                            <MdArrowForward
                                size={19}
                                className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                            />

                        </Link>

                        {/* Users */}
                        <Link
                            to="/admin/users"
                            className="
                                group
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-3
                                transition-all
                                duration-200
                                hover:border-pink-200
                                hover:bg-pink-50
                                sm:p-4
                            "
                        >

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                                    <MdPeople size={21} />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-sm font-semibold text-gray-800">
                                        Manage Users
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {users.length} users
                                    </p>

                                </div>

                            </div>

                            <MdArrowForward
                                size={19}
                                className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-pink-600"
                            />

                        </Link>

                    </div>
                </div>

            </div>

            {/* ==========================================
                BOOKING + CONTENT OVERVIEW
            ========================================== */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">

                {/* BOOKING OVERVIEW */}
                <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                            <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                                Booking Overview
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                Current booking status
                            </p>

                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                            <MdCalendarMonth size={21} />
                        </div>

                    </div>

                    <div className="mt-6 space-y-5">

                        {/* Confirmed */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <MdCheckCircle
                                        size={17}
                                        className="text-green-500"
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        Confirmed
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {confirmedBookings}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                <div
                                    className="h-full rounded-full bg-green-500 transition-all duration-500"
                                    style={{
                                        width:
                                            bookings.length >
                                            0
                                                ? `${(confirmedBookings / bookings.length) * 100}%`
                                                : "0%",
                                    }}
                                />

                            </div>
                        </div>

                        {/* Pending */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <MdPending
                                        size={17}
                                        className="text-amber-500"
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        Pending
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {pendingBookings}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                <div
                                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                                    style={{
                                        width:
                                            bookings.length >
                                            0
                                                ? `${(pendingBookings / bookings.length) * 100}%`
                                                : "0%",
                                    }}
                                />

                            </div>
                        </div>

                        {/* Cancelled */}
                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <MdCancel
                                        size={17}
                                        className="text-red-500"
                                    />

                                    <span className="text-sm font-medium text-gray-700">
                                        Cancelled
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-gray-800">
                                    {cancelledBookings}
                                </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                <div
                                    className="h-full rounded-full bg-red-500 transition-all duration-500"
                                    style={{
                                        width:
                                            bookings.length >
                                            0
                                                ? `${(cancelledBookings / bookings.length) * 100}%`
                                                : "0%",
                                    }}
                                />

                            </div>
                        </div>

                    </div>
                </div>

                {/* CONTENT OVERVIEW */}
                <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                            <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                                Content Overview
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                Your website content at a glance
                            </p>

                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <MdPhotoLibrary size={21} />
                        </div>

                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4">

                        {/* Photos */}
                        <Link
                            to="/admin/photos"
                            className="rounded-xl border border-gray-100 p-3 transition hover:border-blue-200 hover:bg-blue-50 sm:p-4"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                    <MdPhotoLibrary size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-gray-500">
                                        Photos
                                    </p>

                                    <p className="text-lg font-bold text-gray-800 sm:text-xl">
                                        {photos.length}
                                    </p>

                                </div>

                            </div>
                        </Link>

                        {/* Videos */}
                        <Link
                            to="/admin/videos"
                            className="rounded-xl border border-gray-100 p-3 transition hover:border-purple-200 hover:bg-purple-50 sm:p-4"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <MdVideoLibrary size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-gray-500">
                                        Videos
                                    </p>

                                    <p className="text-lg font-bold text-gray-800 sm:text-xl">
                                        {videos.length}
                                    </p>

                                </div>

                            </div>
                        </Link>

                        {/* Blogs */}
                        <Link
                            to="/admin/blogs"
                            className="rounded-xl border border-gray-100 p-3 transition hover:border-emerald-200 hover:bg-emerald-50 sm:p-4"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                    <MdArticle size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-gray-500">
                                        Blogs
                                    </p>

                                    <p className="text-lg font-bold text-gray-800 sm:text-xl">
                                        {blogs.length}
                                    </p>

                                </div>

                            </div>
                        </Link>

                        {/* Customers */}
                        <Link
                            to="/admin/users"
                            className="rounded-xl border border-gray-100 p-3 transition hover:border-pink-200 hover:bg-pink-50 sm:p-4"
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                                    <MdPeople size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs text-gray-500">
                                        Customers
                                    </p>

                                    <p className="text-lg font-bold text-gray-800 sm:text-xl">
                                        {users.length}
                                    </p>

                                </div>

                            </div>
                        </Link>

                    </div>
                </div>

            </div>

            {/* ==========================================
                FOOTER QUICK LINKS
            ========================================== */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5">

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-gray-800">
                            Need to add new content?
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Quickly add photos, videos or manage your bookings.
                        </p>

                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                        <Link
                            to="/admin/photos"
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-blue-600
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-700
                                sm:w-auto
                            "
                        >
                            <MdAdd size={18} />
                            Add Photos
                        </Link>

                        <Link
                            to="/admin/videos"
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-gray-700
                                transition
                                hover:border-purple-300
                                hover:text-purple-600
                                sm:w-auto
                            "
                        >
                            <MdAdd size={18} />
                            Add Video
                        </Link>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Dashboard;