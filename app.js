const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Tạo liên kết giữa các bảng
Product.belongsTo(User, { constrains: true, onDelete: "CASCADE" }); //Product thuộc về User
User.hasMany(Product); // 1 User có nhiều Product
User.hasOne(Cart); // 1 User có 1 Cart
Cart.belongsTo(User); // Cart thuộc về User
Cart.belongsToMany(Product, { through: CartItem }); // Cart thuộc về nhiều Product -> 1 SP có thể nằm trong nhiều giỏ hàng
Product.belongsToMany(Cart, { through: CartItem }); // Product thuộc về nhiều Cart -> 1 giỏ hàng có thể chứa nhiều SP
Order.belongsTo(User)
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
//   .sync({force: true})
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
