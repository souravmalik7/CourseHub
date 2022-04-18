/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import React, { useEffect, useState } from "react";
import Toaster from "../components/Admin/AdminToaster";
import { CourseUpsertModel } from "../Models/AdminCourseUpsertModel";
import { DeleteModal } from "../Models/AdminDeleteModel";
import HttpClient from "../services/AdminHttpClient";
import "../assets/css/AdminCourse.css";
import { AdminDiscountModel } from "../Models/AdminDiscountModel";

function Course() {
  const [message, setToasterMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    data: {},
  });
  const [editModal, setEditModal] = useState({
    state: false,
    action: "view",
    data: {
      courseName: "",
      courseAuthor: "",
      courseDescription: "",
      courseDetails: "",
      coursePrice: 0,
      courseCategory: "",
      courseImage: "",
    },
  });
  const [search, setSearch] = useState('');
  const [discountModel, setDiscountModel] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const res = await HttpClient.get("course");
      setCourses(res.data);
    }
    fetchCourses();
  }, []);

  const handleCardAction = (action, id) => {
    const courseUnderAction = courses.find((_) => _.id === id);
    switch (action) {
      case "delete":
        setDeleteModal({
          state: true,
          data: {
            id: id,
          },
        });
        break;
      case "view":
        setEditModal({ action: "view", state: true, data: courseUnderAction });
        break;
      case "edit":
        setEditModal({ action: "edit", state: true, data: courseUnderAction });
        break;
      default:
        break;
    }
  };

  const handleDeleteModalClose = async (isConfirmed) => {
    if (isConfirmed) {
      const response = await HttpClient.remove(`course/${deleteModal.data.id}`);
      if (response.status === 200) {
        const deletedCourse = courses.find(_ => _.id === deleteModal.data.id);
        setCourses(courses.filter((item) => item.id !== deleteModal.data.id));
        setToasterMessage(
          `${deletedCourse?.courseName} course is deleted succesfully`
        );
      }
    }
    setDeleteModal({
      state: false,
      data: {},
    });
  };

  const editCourse = async (data) => {
    const updatedCourse = await HttpClient.put(`course/${data.id}`, data);
    if (updatedCourse.status === 200) {
      const updatedCourses = [...courses];
      const orgCourse = updatedCourses.find(_ => _.id === data.id);
      orgCourse.courseAuthor = data.courseAuthor;
      orgCourse.courseName = data.courseName;
      orgCourse.coursePrice = data.coursePrice;
      orgCourse.courseCategory = data.courseCategory;
      orgCourse.courseDescription = data.courseDescription;
      orgCourse.courseDetails = data.courseDetails;

      setCourses(updatedCourses);
      setToasterMessage(
        `${data.courseName} course is updated succesfully`
      );
    }
  }

  const addCourse = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const addedCourseResponse = await HttpClient.post("course", formData, config);
    if (addedCourseResponse.status === 200) {
      const updatedCourses = [...courses];
      updatedCourses.push(addedCourseResponse.data);
      setCourses(updatedCourses);
      setToasterMessage(
        `${data.courseName} course is added succesfully`
      );
    }
  }

  const handleEditModalClose = async (data) => {
    if (data) {
      if (editModal.action === "create") {
        await addCourse(data);
      } else if (editModal.action === "edit") {
        await editCourse(data);
      }
    }

    setEditModal({
      state: false,
      action: "view",
      data: {
        courseName: "",
        courseAuthor: "",
        courseDescription: "",
        courseDetails: "",
        coursePrice: 0,
        courseCategory: "",
        courseImage: ""
      },
    });
  };

  const courseCards = courses
    .filter(_ => _.courseName.toLowerCase().indexOf(search) > -1 || search === '')
    .map((item) => {
      return (
        <CourseCard data={item} key={item.id} actionHandler={handleCardAction} />
      );
    });

  const handleSearchChange = ($event) => {
    setSearch($event.target.value?.toLowerCase() || '');
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal.state}
        handleClose={handleDeleteModalClose}
      />
      <CourseUpsertModel
        action={editModal.action}
        show={editModal.state}
        handleClose={(data) => handleEditModalClose(data)}
        data={editModal.data}
      />
      <AdminDiscountModel
        show={discountModel}
        handleClose={(data) => setDiscountModel(false)}
      />
      <section className="courses">
        <section className="course-header">
          <div className="course-heading">Existing courses</div>
          <input
            type="text"
            placeholder="Search by course name"
            className="search-course"
            onChange={($event) => handleSearchChange($event)}
          />
          <div className="btn-container-course">
            <button
              className="add-primary"
              onClick={() =>
                setEditModal({
                  action: "create", state: true, data: {
                    courseName: "",
                    courseAuthor: "",
                    courseDescription: "",
                    courseDetails: "",
                    coursePrice: 0,
                    courseCategory: "",
                    courseImage: "",
                  }
                })
              }
            >
              <span className="material-icons">add_circle_outline</span>
              Add course
            </button>
            <button
              className="add-primary"
              onClick={() => setDiscountModel(true)}
            >
              Manage discount
            </button>
          </div>
        </section>
        <section className="course-cards">{courseCards}</section>
      </section>
      <Toaster message={message} type="success" />
    </React.Fragment>
  );
}

export default Course;

function CourseCard({ data, actionHandler }) {
  return (
    <section className="admin-card img-animate">
      <section className="card-image-holder">
        <img src={data.courseImage} alt={data.courseName} className="card-image" />
      </section>
      <section className="card-name">{data.courseName}</section>
      <section className="author-name">{data.courseAuthor || 'Author Name'}</section>
      <section className="card-footer">
        <section className="card-price">${data.coursePrice}</section>
        <section className="card-actions">
          <span
            className="material-icons icon"
            onClick={() => actionHandler("view", data.id)}
          >
            visibility
          </span>
          <span
            className="material-icons icon"
            onClick={() => actionHandler("edit", data.id)}
          >
            edit
          </span>
          <span
            className="material-icons icon"
            onClick={() => actionHandler("delete", data.id)}
          >
            delete
          </span>
        </section>
      </section>
    </section>
  );
}
