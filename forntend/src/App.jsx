import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import Booking from "./components/Booking";
import AddBooking from "./components/Addbooking";

import Photos from "./components/Photos";
import AddPhoto from "./components/AddPhoto";

import Gallery from "./components/Gallery";

import Addvideo from "./components/Addvideo";

import Login from "./components/Login";
import Register from "./components/Register";

import Blog from "./components/Blog";
import Addblog from "./components/Addblog";



import {
    Routes,
    Route,
} from "react-router-dom";


function App() {

    return (

        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <Routes>

                {/* =========================
                    HOME
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================
                    ABOUT
                ========================= */}

                <Route
                    path="/about"
                    element={<About />}
                />


                {/* =========================
                    BOOKING
                ========================= */}

                <Route
                    path="/booking"
                    element={<Booking />}
                />

                <Route
                    path="/AddBooking"
                    element={<AddBooking />}
                />


                {/* =========================
                    PHOTOS
                ========================= */}

                <Route
                    path="/Photos"
                    element={<Photos />}
                />

                <Route
                    path="/addPhotos"
                    element={<AddPhoto />}
                />


                {/* =========================
                    GALLERY
                ========================= */}

                <Route
                    path="/Gallery"
                    element={<Gallery />}
                />


                {/* =========================
                    VIDEO
                ========================= */}

                <Route
                    path="/addvideo"
                    element={<Addvideo />}
                />


                {/* =========================
                    BLOG
                ========================= */}

                <Route
                    path="/blog"
                    element={<Blog />}
                />

                <Route
                    path="/Addblog"
                    element={<Addblog />}
                />


                {/* =========================
                    AUTH
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    USER PROFILE
                ========================= */}

               


            </Routes>

        </div>

    );

}

export default App;