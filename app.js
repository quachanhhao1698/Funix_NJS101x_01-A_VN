const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("62714bf7c391fc78f3ff8ef6")
//     .then((user) => {
//       req.user = new User(user.userName, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect(
    "mongodb+srv://quachanhhao:01245312z@cluster0.zs7t6.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
