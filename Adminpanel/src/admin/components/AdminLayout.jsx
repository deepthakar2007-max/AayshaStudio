
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gray-100">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="min-h-screen min-w-0 w-full lg:ml-[280px] lg:w-[calc(100%-280px)]">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
