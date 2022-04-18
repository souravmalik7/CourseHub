const mongoose = require("mongoose");

const couponSchema = {
  couponCode: { type: String, required: true },
  _id: mongoose.Schema.Types.ObjectId,
  value: Number,
  src: String
};

module.exports = mongoose.model("Coupons", couponSchema);
