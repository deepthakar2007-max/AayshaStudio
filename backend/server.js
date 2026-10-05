const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");




const connectDB = require("./config/db");

// ROUTES
const customerRoutes = require("./router/customerrouter");
const photoRoutes = require("./router/photorouter");
const bookingRoutes = require("./router/bookingrouter");
const videoRoutes = require("./router/videorouter");
const authRouter = require("./router/authrouter");
const blog = require("./router/blog");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================= UPLOAD FOLDER =================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================= ROUTES =================

app.use(
  "/api/customers",
  customerRoutes
);

app.use(
  "/api/photos",
  photoRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/videos",
  videoRoutes
);

// AUTH ROUTES
app.use(
  "/api/auth",
  authRouter
);

// blog
app.use("/api/blog", blog);



// ================= HOME =================

app.get("/", (req, res) => {
  res.send("Photo Studio API Running");
});

// ================= SERVER =================

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});