const express = require("express");
const mongoose = require("mongoose");
const reviewRoute = require("./routes/api/reviews");
const orderRoute = require("./routes/api/orders");
const courseRoute = require("./routes/api/courses");
const adminCourseRoute = require("./routes/api/AdminCourseRoute");
const adminUserRoute = require("./routes/api/AdminUserRoute");
const wishilistRoutes = require("./routes/api/WishlistRoutes");
const userRoute = require("./routes/api/users");
const couponsRoute = require("./routes/api/coupons");
const cartRoute = require("./routes/api/cart");
const cors = require("cors");
const discussionThreadRoute = require("./routes/api/DiscussionThreadRoutes");

const options = {
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
  origin: "*",
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(options));

console.log(adminCourseRoute)
const mongoDBUrl = "mongodb+srv://abhishek:abhishek@cluster0.2spzc.mongodb.net/CourseHub?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(error => {
    console.log("mongoDB connection failed", error);
  });

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/reviews", reviewRoute);
app.use("/courses", courseRoute);
app.use("/wishlist", wishilistRoutes);
app.use("/authenticate", userRoute);
app.use("/coupons", couponsRoute);
app.use("/admin/course", adminCourseRoute);
app.use("/admin/user", adminUserRoute);
app.use("/cart", cartRoute);
app.use("/discussion", discussionThreadRoute);
app.use("/admin/discount", couponsRoute);
app.use("/order", orderRoute);

module.exports = app;
