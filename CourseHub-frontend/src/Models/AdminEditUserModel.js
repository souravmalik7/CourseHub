/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import { useState, useEffect } from "react";
import { Modal } from "../components/Admin/AdminModel";
import { Validation } from "../components/Admin/AdminValidation";
import "../assets/css/AdminEditUserModel.css";

export const EditUserModal = ({ handleClose, show, data }) => {
  const [errorMessages, setErrorMessage] = useState({
    firstName: [],
    lastName: [],
    coursePurchased: [],
  });
  const [editUser, setEditUser] = useState(data);

  useEffect(() => {
    setEditUser(data);
    setErrorMessage({
      firstName: [],
      lastName: [],
      coursePurchased: [],
    });
  }, [data, show]);

  const onFirstNameChange = ($event) => {
    const state = { ...errorMessages };
    state.firstName = [];

    if (!$event.target.value.trim()) {
      state.firstName.push("First name cannot be empty");
    }
    setErrorMessage(state);

    const user = { ...editUser };
    user.firstName = $event.target.value;
    setEditUser(user);
  };

  const onLastNameChange = ($event) => {
    const state = { ...errorMessages };
    state.lastName = [];

    if (!$event.target.value.trim()) {
      state.lastName.push("Last name cannot be empty");
    }
    setErrorMessage(state);

    const user = { ...editUser };
    user.lastName = $event.target.value;
    setEditUser(user);
  };

  const coursePurchasedChange = ($event) => {
    const state = { ...errorMessages };
    state.coursePurchased = [];

    if (!$event.target.value.trim()) {
      state.coursePurchased.push("Courses cannot be empty");
    }
    setErrorMessage(state);

    const user = { ...editUser };
    user.coursePurchased = $event.target.value;
    setEditUser(user);
  };

  const footer = (
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
        onClick={() => handleClose(editUser)}
        disabled={
          errorMessages.firstName.length ||
          errorMessages.lastName.length ||
          errorMessages.coursePurchased.length
        }
      >
        Update
      </button>
    </div>
  );

  const body = (
    <section className="editUserModalBody">
      <Validation messages={errorMessages}></Validation>
      <div className="group">
        <label>First name</label>
        <input
          type="text"
          name="fname"
          value={editUser.firstName}
          onChange={onFirstNameChange}
        />
        <Validation messages={errorMessages.firstName}></Validation>
      </div>
      <div className="group">
        <label>Last name</label>
        <input
          type="text"
          name="lname"
          value={editUser.lastName}
          onChange={onLastNameChange}
        />
        <Validation messages={errorMessages.lastName}></Validation>
      </div>
      <div className="group">
        <label>Email</label>
        <input type="email" name="email" value={editUser.email} disabled />
      </div>
      <div className="group">
        <label>No. of courses purchased</label>
        <input
          type="number"
          min="0"
          name="coursePurchased"
          value={editUser.coursePurchased}
          onChange={coursePurchasedChange}
        />
        <Validation messages={errorMessages.coursePurchased}></Validation>
      </div>
    </section>
  );

  const content = {
    headerContent: "Edit user",
    bodyContent: body,
    footerContent: footer,
    modalType: "edit",
  };

  return <Modal content={content} show={show} handleClose={handleClose} />;
};
