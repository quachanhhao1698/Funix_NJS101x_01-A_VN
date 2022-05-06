const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    name: {
      type: String,
      required: true,
      ref:'User'
    },
  },
});
module.exports = mongoose.model("Order", orderSchema);
