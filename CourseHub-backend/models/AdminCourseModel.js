/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
 This feature is not a part of assignment 3. It is built for the project.
========================================================= */

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 120,
      trim: true,
    },
    courseAuthor: {
      type: String,
      maxlength: 120,
      trim: true,
    },
    courseDescription: {
      type: String,
      maxlength: 1200,
      trim: true,
    },
    courseDetails: {
      type: String,
      maxlength: 1200,
      trim: true,
    },
    coursePrice: {
      type: mongoose.Decimal128,
    },
    courseCategory: {
      type: String,
      required: true
    },
    courseImage: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

courseSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      "id",
      "courseName",
      "courseAuthor",
      "courseDescription",
      "courseDetails",
      "coursePrice",
      "courseCategory",
      "courseImage",
      "createdAt"
    ];

    fields.forEach((field) => {
      transformed[field] = this[field]?.toString();
    });

    return transformed;
  },
});

module.exports = mongoose.model("Course", courseSchema);
