import { useEffect, useState } from "react";
import {
  MdDelete,
  MdVisibility,
  MdSearch,
  MdClose,
  MdPeople,
} from "react-icons/md";

import api from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  // =================================
  // GET USERS
  // =================================

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/users");

      console.log("Users API Response:", response.data);

      setUsers(response.data.users || []);
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

  // =================================
  // LOAD USERS
  // =================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // =================================
  // DELETE USER
  // =================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/auth/users/${id}`);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Delete User Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete user."
      );
    }
  };

  // =================================
  // FILTER USERS
  // =================================

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.phone?.includes(searchText);

    const matchesStatus =
      status === "All" ||
      (status === "Active" && user.isOnline === true) ||
      (status === "Inactive" && user.isOnline !== true);

    return matchesSearch && matchesStatus;
  });

  // =================================
  // COUNTS
  // =================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isOnline === true
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.isOnline !== true
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Users
          </h1>

          <p className="text-gray-500 mt-1">
            Manage registered users
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
          <MdPeople className="text-blue-600 text-xl" />

          <span className="font-semibold text-gray-700">
            {totalUsers} Users
          </span>
        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Online Users
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {activeUsers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Offline Users
          </p>

          <h2 className="text-3xl font-bold text-gray-600 mt-2">
            {inactiveUsers}
          </h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Search user by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Users</option>
            <option value="Active">Online</option>
            <option value="Inactive">Offline</option>
          </select>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>

          <p className="text-gray-500 mt-4">
            Loading users...
          </p>

        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Last Login
                  </th>

                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: {user._id}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-4 text-gray-600">
                        {user.phone || "-"}
                      </td>

                      {/* ROLE */}

                      <td className="px-6 py-4">

                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          {user.role || "user"}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        {user.isOnline ? (

                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">

                            <span className="w-2 h-2 rounded-full bg-green-500"></span>

                            Online

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">

                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>

                            Offline

                          </span>

                        )}

                      </td>

                      {/* LAST LOGIN */}

                      <td className="px-6 py-4 text-sm text-gray-500">

                        {user.lastLoginAt
                          ? new Date(
                              user.lastLoginAt
                            ).toLocaleString()
                          : "Never"}

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              setSelectedUser(user)
                            }
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                            title="View"
                          >
                            <MdVisibility size={20} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user._id)
                            }
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                            title="Delete"
                          >
                            <MdDelete size={20} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}

      {selectedUser && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold text-gray-800">
                User Details
              </h2>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <MdClose size={22} />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-gray-400">
                  Name
                </p>

                <p className="font-semibold">
                  {selectedUser.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="font-semibold">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="font-semibold">
                  {selectedUser.phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Role
                </p>

                <p className="font-semibold">
                  {selectedUser.role || "user"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Last Login
                </p>

                <p className="font-semibold">
                  {selectedUser.lastLoginAt
                    ? new Date(
                        selectedUser.lastLoginAt
                      ).toLocaleString()
                    : "Never"}
                </p>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Users;