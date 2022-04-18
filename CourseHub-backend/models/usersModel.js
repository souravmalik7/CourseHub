const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: String,
  _id: mongoose.Schema.Types.ObjectId,
  password: String,
  lastName: String,
  answer: String,
  coursePurchased: Number
});


/** Transform User details */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "email",
      "id",
      "firstName",
      "lastName",
      "coursePurchased"
    ];

    fields.forEach((field) => {
      transformed[field] = this[field]?.toString();
      if (field === "coursePurchased" && !transformed[field]) {
        transformed[field] = 0;
      }
    });

    return transformed;
  },
});

module.exports = mongoose.model("registeredusers", userSchema);
