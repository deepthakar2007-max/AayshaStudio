import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Photos from "./pages/Photos.jsx";
import Videos from "./pages/Videos.jsx";
import Bookings from "./pages/Bookings.jsx";
import Blogs from "./pages/Blogs.jsx";
import Users from "./pages/Users.jsx";
import Profile from "./pages/Profile.jsx";
import Gallery from "./pages/Gallery.jsx";

import AdminLayout from "./components/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            ROOT
        ========================== */}
        <Route
          path="/"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />

        {/* =========================
            PUBLIC ADMIN PAGES
        ========================== */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />

        {/* =========================
            OLD USER ROUTES
            Redirect to correct route
        ========================== */}
        <Route
          path="/users"
          element={
            <Navigate
              to="/admin/users"
              replace
            />
          }
        />

        <Route
          path="/admin/user"
          element={
            <Navigate
              to="/admin/users"
              replace
            />
          }
        />

        {/* =========================
            PROTECTED ADMIN PAGES
        ========================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Photos */}
          <Route
            path="photos"
            element={<Photos />}
          />

          {/* Videos */}
          <Route
            path="videos"
            element={<Videos />}
          />

          {/* Bookings */}
          <Route
            path="bookings"
            element={<Bookings />}
          />

          {/* Blogs */}
          <Route
            path="blogs"
            element={<Blogs />}
          />

          {/* Users */}
          <Route
            path="users"
            element={<Users />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Gallery */}
          <Route
            path="gallery"
            element={<Gallery />}
          />
        </Route>

        {/* =========================
            404 / UNKNOWN ROUTE
        ========================== */}
        <Route
          path="*"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;