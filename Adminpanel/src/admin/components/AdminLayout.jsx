import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Overlay - Mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                ></div>
            )}

            {/* Main Area */}
            <div className="min-h-screen lg:ml-64">

                {/* Topbar */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                {/* Page Content */}
                <main className="p-3 sm:p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;