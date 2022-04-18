/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */

const CourseModel = require("../models/AdminCourseModel");

exports.list = async (req, res, next) => {
  try {
    const courses = await CourseModel.find().exec();
    const transformedCourses = courses.map((course) => {
      const tmp = course.transform();
      tmp.courseImage = getFormattedUrl(tmp.courseImage, req);
      return tmp;
    });
    res.json(transformedCourses);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const course = req.body;
    course.courseImage = getFormattedUrl(req.file.path.toString(), req);
    const output = await CourseModel.create(course);
    course.courseImage = getFormattedUrl(course.courseImage, req);
    course.id = output._id.toString();
    res.json(course);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  const { courseId } = req.params;
  const course = await CourseModel.findById(courseId).exec();
  if (course) {
    res.json(course.transform());
  } else {
    res.status(404).send({ error: "course does not exist" });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findByIdAndRemove(courseId).exec();
    const message = course
      ? course.transform()
      : { error: "course does not exist" };
    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const payload = req.body;

    if (!payload) {
      res.status(400).send({ error: "missing payload" });
    }

    const course = await CourseModel.findByIdAndUpdate(courseId, {
      courseAuthor: payload.courseAuthor,
      courseName: payload.courseName,
      courseDescription: payload.courseDescription,
      courseDetails: payload.courseDetails,
      coursePrice: payload.coursePrice,
      courseCategory: payload.courseCategory,
    }).exec();

    const message = course ? course.transform() : { error: "course does not exist" };

    res.status(200).send(message);
  } catch (error) {
    next(error);
  }
};

function getFormattedUrl(imagePath, req) {
  let imageUrl = imagePath;
  if (imagePath && !imagePath.startsWith('http'))
    imageUrl = (new URL(`${req.protocol}://${req.get('host')}/${imageUrl}`)).href.toString();
  return imageUrl;
}

