import { useEffect, useState } from "react";
import {
    MdDelete,
    MdVisibility,
    MdSearch,
    MdClose,
    MdPeople,
    MdRefresh,
} from "react-icons/md";

import api from "../api/axios";

function Users() {
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    // ==========================================
    // GET USERS
    // ==========================================

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/auth/users");

            console.log("Users API Response:", response.data);

            const userData =
                response.data?.users ||
                response.data?.data ||
                [];

            setUsers(Array.isArray(userData) ? userData : []);
        } catch (error) {
            console.error("Fetch Users Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to fetch users."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOAD USERS
    // ==========================================

    useEffect(() => {
        fetchUsers();
    }, []);

    // ==========================================
    // DELETE USER
    // ==========================================

    const handleDelete = async (id) => {
        if (!id) {
            alert("User ID not found.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleting(id);
            setError("");

            // console.log("Deleting User ID:", id);

            const response = await api.delete(
                `/auth/users/${id}`
            );

            console.log(
                "Delete User Response:",
                response.data
            );

            // Remove user from frontend list
            setUsers((prevUsers) =>
                prevUsers.filter(
                    (user) => user._id !== id
                )
            );

            // Close modal if deleted user is selected
            if (selectedUser?._id === id) {
                setSelectedUser(null);
            }

            alert(
                response.data?.message ||
                "User deleted successfully."
            );
        } catch (error) {
            console.error(
                "Delete User Error:",
                error
            );

            console.error(
                "Delete Status:",
                error.response?.status
            );

            console.error(
                "Delete Response:",
                error.response?.data
            );

            if (error.response?.status === 404) {
                alert(
                    "Delete API not found. Please check the backend DELETE route."
                );
            } else {
                alert(
                    error.response?.data?.message ||
                    "Failed to delete user."
                );
            }
        } finally {
            setDeleting(null);
        }
    };

    // ==========================================
    // FILTER USERS
    // ==========================================

    const filteredUsers = users.filter((user) => {
        const searchText = search
            .trim()
            .toLowerCase();

        const name =
            user.name?.toLowerCase() || "";

        const email =
            user.email?.toLowerCase() || "";

        const phone =
            user.phone?.toString() || "";

        const matchesSearch =
            name.includes(searchText) ||
            email.includes(searchText) ||
            phone.includes(searchText);

        const matchesStatus =
            status === "All" ||
            (status === "Active" &&
                user.isOnline === true) ||
            (status === "Inactive" &&
                user.isOnline !== true);

        return (
            matchesSearch &&
            matchesStatus
        );
    });

    // ==========================================
    // COUNTS
    // ==========================================

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.isOnline === true
    ).length;

    const inactiveUsers = users.filter(
        (user) => user.isOnline !== true
    ).length;

    // ==========================================
    // RETURN
    // ==========================================

    return (
        <div className="min-h-full bg-gray-100 p-3 sm:p-4 md:p-6">

            {/* =====================================
                HEADER
            ====================================== */}

            <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">

                <div className="min-w-0">
                    <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        Users
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 sm:text-base">
                        Manage registered users
                    </p>
                </div>

                <div className="flex w-full items-center justify-between gap-2 rounded-xl bg-white px-3 py-3 shadow-sm sm:w-auto sm:justify-start sm:px-4">

                    <div className="flex items-center gap-2">
                        <MdPeople className="text-xl text-blue-600" />

                        <span className="font-semibold text-gray-700">
                            {totalUsers} Users
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={fetchUsers}
                        disabled={loading}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Refresh"
                    >
                        <MdRefresh
                            size={20}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />
                    </button>

                </div>

            </div>

            {/* =====================================
                STATS
            ====================================== */}

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mb-6">

                {/* TOTAL */}

                <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">

                    <p className="text-sm text-gray-500">
                        Total Users
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">
                        {totalUsers}
                    </h2>

                </div>

                {/* ONLINE */}

                <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">

                    <div className="flex items-center justify-between">

                        <p className="text-sm text-gray-500">
                            Online Users
                        </p>

                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                    </div>

                    <h2 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
                        {activeUsers}
                    </h2>

                </div>

                {/* OFFLINE */}

                <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">

                    <div className="flex items-center justify-between">

                        <p className="text-sm text-gray-500">
                            Offline Users
                        </p>

                        <span className="h-2.5 w-2.5 rounded-full bg-gray-400"></span>

                    </div>

                    <h2 className="mt-2 text-2xl font-bold text-gray-600 sm:text-3xl">
                        {inactiveUsers}
                    </h2>

                </div>

            </div>

            {/* =====================================
                SEARCH + FILTER
            ====================================== */}

            <div className="mb-5 rounded-2xl bg-white p-3 shadow-sm sm:mb-6 sm:p-4">

                <div className="flex flex-col gap-3 md:flex-row">

                    {/* SEARCH */}

                    <div className="relative min-w-0 flex-1">

                        <MdSearch
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={22}
                        />

                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-base"
                        />

                    </div>

                    {/* STATUS */}

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-44 sm:text-base"
                    >
                        <option value="All">
                            All Users
                        </option>

                        <option value="Active">
                            Online
                        </option>

                        <option value="Inactive">
                            Offline
                        </option>
                    </select>

                </div>

            </div>

            {/* =====================================
                ERROR
            ====================================== */}

            {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* =====================================
                LOADING
            ====================================== */}

            {loading ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <p className="mt-4 text-gray-500">
                        Loading users...
                    </p>

                </div>

            ) : (

                /* =====================================
                   TABLE
                ====================================== */

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[850px]">

                            <thead className="border-b bg-gray-50">

                                <tr>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        Phone
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        Role
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                                        Last Login
                                    </th>

                                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredUsers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="px-5 py-12 text-center text-gray-500"
                                        >
                                            No users found
                                        </td>

                                    </tr>

                                ) : (

                                    filteredUsers.map(
                                        (user) => (

                                            <tr
                                                key={
                                                    user._id
                                                }
                                                className="border-b transition hover:bg-gray-50"
                                            >

                                                {/* USER */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">

                                                            {user.name
                                                                ?.charAt(
                                                                    0
                                                                )
                                                                ?.toUpperCase() ||
                                                                "U"}

                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="max-w-[180px] truncate font-semibold text-gray-800">

                                                                {user.name ||
                                                                    "Unknown User"}

                                                            </p>

                                                            <p className="max-w-[180px] truncate text-xs text-gray-400">

                                                                ID:{" "}
                                                                {
                                                                    user._id
                                                                }

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* EMAIL */}

                                                <td className="px-5 py-4 text-gray-600">

                                                    {user.email ||
                                                        "-"}

                                                </td>

                                                {/* PHONE */}

                                                <td className="px-5 py-4 text-gray-600">

                                                    {user.phone ||
                                                        "-"}

                                                </td>

                                                {/* ROLE */}

                                                <td className="px-5 py-4">

                                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">

                                                        {user.role ||
                                                            "user"}

                                                    </span>

                                                </td>

                                                {/* STATUS */}

                                                <td className="px-5 py-4">

                                                    {user.isOnline ? (

                                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">

                                                            <span className="h-2 w-2 rounded-full bg-green-500"></span>

                                                            Online

                                                        </span>

                                                    ) : (

                                                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">

                                                            <span className="h-2 w-2 rounded-full bg-gray-400"></span>

                                                            Offline

                                                        </span>

                                                    )}

                                                </td>

                                                {/* LAST LOGIN */}

                                                <td className="px-5 py-4 text-sm text-gray-500">

                                                    {user.lastLoginAt
                                                        ? new Date(
                                                              user.lastLoginAt
                                                          ).toLocaleString()
                                                        : "Never"}

                                                </td>

                                                {/* ACTIONS */}

                                                <td className="px-5 py-4">

                                                    <div className="flex justify-center gap-2">

                                                        {/* VIEW */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setSelectedUser(
                                                                    user
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100 active:scale-95"
                                                            title="View User"
                                                        >
                                                            <MdVisibility
                                                                size={
                                                                    20
                                                                }
                                                            />
                                                        </button>

                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user._id
                                                                )
                                                            }
                                                            disabled={
                                                                deleting ===
                                                                user._id
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                                            title="Delete User"
                                                        >

                                                            {deleting ===
                                                            user._id ? (

                                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></span>

                                                            ) : (

                                                                <MdDelete
                                                                    size={
                                                                        20
                                                                    }
                                                                />

                                                            )}

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

            {/* =====================================
                VIEW USER MODAL
            ====================================== */}

            {selectedUser && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
                    onClick={() =>
                        setSelectedUser(null)
                    }
                >

                    <div
                        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                                User Details
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedUser(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                title="Close"
                            >
                                <MdClose
                                    size={22}
                                />
                            </button>

                        </div>

                        {/* USER AVATAR */}

                        <div className="mb-6 flex flex-col items-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">

                                {selectedUser.name
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    "U"}

                            </div>

                            <h3 className="mt-3 text-lg font-bold text-gray-800">

                                {selectedUser.name ||
                                    "Unknown User"}

                            </h3>

                            <span
                                className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                    selectedUser.isOnline
                                        ? "bg-green-50 text-green-600"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                            >

                                {selectedUser.isOnline
                                    ? "Online"
                                    : "Offline"}

                            </span>

                        </div>

                        {/* DETAILS */}

                        <div className="space-y-4">

                            <div className="rounded-xl bg-gray-50 p-3">

                                <p className="text-xs text-gray-400">
                                    Name
                                </p>

                                <p className="mt-1 break-words font-semibold text-gray-800">
                                    {selectedUser.name ||
                                        "-"}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">

                                <p className="text-xs text-gray-400">
                                    Email
                                </p>

                                <p className="mt-1 break-all font-semibold text-gray-800">
                                    {selectedUser.email ||
                                        "-"}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">

                                <p className="text-xs text-gray-400">
                                    Phone
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {selectedUser.phone ||
                                        "-"}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">

                                <p className="text-xs text-gray-400">
                                    Role
                                </p>

                                <p className="mt-1 font-semibold capitalize text-gray-800">
                                    {selectedUser.role ||
                                        "user"}
                                </p>

                            </div>

                            <div className="rounded-xl bg-gray-50 p-3">

                                <p className="text-xs text-gray-400">
                                    Last Login
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">

                                    {selectedUser.lastLoginAt
                                        ? new Date(
                                              selectedUser.lastLoginAt
                                          ).toLocaleString()
                                        : "Never"}

                                </p>

                            </div>

                        </div>

                        {/* DELETE FROM MODAL */}

                        <button
                            type="button"
                            onClick={() =>
                                handleDelete(
                                    selectedUser._id
                                )
                            }
                            disabled={
                                deleting ===
                                selectedUser._id
                            }
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {deleting ===
                            selectedUser._id ? (

                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    Deleting...
                                </>

                            ) : (

                                <>
                                    <MdDelete size={20} />
                                    Delete User
                                </>

                            )}

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Users;