
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:px-6">

      <div className="mx-auto max-w-7xl">

        {/* ================= NAVBAR ================= */}
        <div className="flex h-14 items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold shadow-lg shadow-indigo-500/20 transition duration-300 group-hover:scale-105">
              A
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                Aaysha
                <span className="ml-1 text-indigo-400">
                  Studio
                </span>
              </h1>

             
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden items-center gap-1 md:flex">

            <Link
              to="/"
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Home
              <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

            <Link
              to="/about"
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              About
              <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

            <Link
              to="/Photos"
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Photos & Video
              <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

            <Link
              to="/gallery"
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Gallery
              <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

            <Link
              to="/blog"
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/5 hover:text-white"
            >
              Blog
              <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-indigo-500 transition duration-300 group-hover:scale-x-100" />
            </Link>

          </div>

          {/* ================= USER SECTION ================= */}
          <div className="hidden items-center gap-3 md:flex">

            {user ? (
              <>
                {/* User Profile */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden lg:block">
                    <p className="max-w-[100px] truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      men
                    </p>
                  </div>

                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition duration-300 hover:border-red-500/40 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30"
              >
                Login
              </Link>
            )}

          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 transition duration-300 hover:bg-white/10 md:hidden"
          >

            <span
              className={`h-0.5 w-5 rounded-full bg-white transition duration-300 ${
                menuOpen
                  ? "translate-y-2 rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-white transition duration-300 ${
                menuOpen
                  ? "opacity-0"
                  : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-white transition duration-300 ${
                menuOpen
                  ? "-translate-y-2 -rotate-45"
                  : ""
              }`}
            />

          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`grid transition-all duration-300 md:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >

          <div className="overflow-hidden">

            <div className="mt-3 border-t border-white/10 py-4">

              <div className="flex flex-col gap-1">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-indigo-400"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-indigo-400"
                >
                  About
                </Link>

                <Link
                  to="/Photos"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-indigo-400"
                >
                  Photos & Video
                </Link>

                <Link
                  to="/gallery"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-indigo-400"
                >
                  Gallery
                </Link>

                <Link
                  to="/blog"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-indigo-400"
                >
                  Blog
                </Link>

                {/* ================= MOBILE USER ================= */}
                {user ? (
                  <div className="mt-3 border-t border-white/10 pt-4">

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            Logged In
                          </p>
                        </div>

                      </div>

                      <button
                        onClick={handleLogout}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Logout
                      </button>

                    </div>

                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="mt-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-purple-500"
                  >
                    Login
                  </Link>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
