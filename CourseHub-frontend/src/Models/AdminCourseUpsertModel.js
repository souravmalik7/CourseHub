/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import { useEffect, useState } from "react";
import { Modal } from "../components/Admin/AdminModel";
import { Validation } from "../components/Admin/AdminValidation";
import "../assets/css/AdminCourseUpsertModel.css";

export const CourseUpsertModel = ({ handleClose, show, data, action }) => {
  const [errorMessages, setErrorMessage] = useState({
    courseName: [],
  });
  const [course, setCourse] = useState(data);

  useEffect(() => {
    setCourse(data);
    setErrorMessage({
      courseName: [],
    });
  }, [data, show]);

  const validateCourseName = (value) => {
    const state = { ...errorMessages };
    state.courseName = [];
    let isValid = true;

    if (!value.trim()) {
      state.courseName.push("Course name cannot be empty");
      isValid = false;
    }

    setErrorMessage(state);
    return isValid;
  };

  const onCourseNameChange = (value) => {
    validateCourseName(value);
    onInputChange(value, "courseName");
  };

  const onInputChange = (value, property) => {
    const modifiedCourse = { ...course };
    modifiedCourse[property] = value;
    setCourse(modifiedCourse);
  };

  const getHeaderTitle = () => {
    let title = "";
    switch (action) {
      case "view":
        title = "View";
        break;
      case "create":
        title = "Add";
        break;
      case "edit":
        title = "Edit";
        break;
      default:
        title = "View";
    }

    return `${title} course`;
  };

  const handleFormClose = () => {
    if (validateCourseName(course.courseName)) {
      handleClose(course);
    }
  };

  const footer = action !== "view" && (
    <div>
      <button
        value="false"
        className="secondary-button button"
        onClick={() => handleClose(false)}
      >
        Cancel
      </button>
      <button
        value="true"
        className="primary-button button"
        onClick={() => handleFormClose()}
      >
        {getHeaderTitle()}
      </button>
    </div>
  );

  const footerView = action === "view" && (
    <div>
      <button
        value="false"
        className="secondary-button button"
        onClick={() => handleClose(false)}
      >
        Ok
      </button>
    </div>
  );

  const onImageChange = ($event) => {
    if (!$event.target.files?.length) {
      return;
    }
    onInputChange($event.target.files[0], 'courseImage');
  }

  const body = (
    <section className={action === "view" ? 'disabled editCourseModalBody' : 'editCourseModalBody'}>
      <div className="section-container">
        <div className="group">
          <label>Course name</label>
          <input
            type="text"
            name="courseName"
            className="course-name-input"
            value={course.courseName || ""}
            onChange={($event) => onCourseNameChange($event.target.value)}
          />
          <Validation messages={errorMessages.courseName}></Validation>
        </div>
        <div className="group">
          <label>Course category</label>
          <select name="courseCategory" id="courseCategory" className="course-category-select" onChange={($event) =>
            onInputChange($event.target.value, "courseCategory")
          }>
            <option value="Select" selected>Select</option>
            <option value="Web Development" selected={course.courseCategory === 'Web Development'}>Web Development</option>
            <option value="Backend" selected={course.courseCategory === 'Backend'}>Backend</option>
            <option value="Database" selected={course.courseCategory === 'Database'}>Database</option>
          </select>
        </div>
      </div>
      <div className="section-container">
        <div className="group">
          <label>Author name</label>
          <input
            type="text"
            name="courseAuthor"
            className="course-author-input"
            value={course.courseAuthor || ""}
            onChange={($event) =>
              onInputChange($event.target.value, "courseAuthor")
            }
          />
        </div>
        <div className="group">
          <label>Price</label>
          <input
            type="number"
            min="0"
            name="coursePrice"
            className="course-price-input"
            value={course.coursePrice || 0}
            onChange={($event) =>
              onInputChange($event.target.value, "coursePrice")
            }
          />
        </div>
      </div>

      <div className="group">
        <label>Description</label>
        <textarea
          name="courseDescription"
          className="course-description"
          value={course.courseDescription || ""}
          onChange={($event) =>
            onInputChange($event.target.value, "courseDescription")
          }
        />
      </div>
      <div className="group">
        <label>Details</label>
        <textarea
          name="courseDetails"
          className="course-description"
          value={course.courseDetails || ""}
          onChange={($event) =>
            onInputChange($event.target.value, "courseDetails")
          }
        />
      </div>
      {action === "create" && <div className="group">
        <label>Image</label>
        <input type="file" name="courseImage" className="course-image-input" onChange={($event) => onImageChange($event)} />
      </div>}

    </section>
  );

  const content = {
    headerContent: getHeaderTitle(),
    bodyContent: body,
    footerContent: action === 'view' ? footerView : footer,
    modalType: "edit",
  };

  return <Modal content={content} show={show} handleClose={handleClose} />;
};
