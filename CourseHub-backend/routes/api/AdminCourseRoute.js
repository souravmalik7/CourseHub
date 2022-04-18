/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
const express = require('express');
const courseController = require('../../controllers/AdminCourseController');
const multer = require('../../multer');

const router = express.Router();

router.route("/")
  .get(courseController.list)
  .post(multer.upload.single('courseImage'), courseController.create);

router
  .route("/:courseId")
  .get(courseController.get)
  .put(courseController.replace)
  .delete(courseController.remove);

module.exports = router;
