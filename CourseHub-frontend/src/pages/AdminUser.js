/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import React, { useEffect, useState } from "react";
import Toaster from "../components/Admin/AdminToaster";
import { DeleteModal } from "../Models/AdminDeleteModel";
import { EditUserModal } from "../Models/AdminEditUserModel";
import "../assets/css/AdminUser.css";
import HttpClient from "../services/AdminHttpClient";

function User() {
  const [message, setToasterMessage] = useState("");
  const [users, updateUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    data: {},
  });
  const [editModal, setEditModal] = useState({
    state: false,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      coursePurchased: "",
    },
  });

  const fetchUsers = async () => {
    const userResponse = await HttpClient.get("user");
    updateUsers(userResponse.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const gridRows = users.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.coursePurchased}</td>
        <td>
          <span
            className="material-icons edit-icon"
            onClick={() => setEditModal({ state: true, data: user })}
          >
            edit
          </span>
          <span
            className="material-icons delete-icon"
            onClick={() =>
              setDeleteModal({ state: true, data: { id: user.id } })
            }
          >
            delete
          </span>
        </td>
      </tr>
    );
  });

  const userGrid = (
    <section className="users">
      <section>
        <div className="users-heading">Existing Users</div>
      </section>
      <div className="table-container">
        <table className="userGrid">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>No. of courses purchased</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{gridRows}</tbody>
        </table>
      </div>
    </section>
  );

  const handleModalClose = async (isConfirmed) => {
    if (isConfirmed) {
      const deleteResponse = await HttpClient.remove(
        `user/${deleteModal.data.id}`
      );
      if (deleteResponse.status === 200) {
        deleteUserRow(deleteModal.data.id);
      }
    }
    setDeleteModal({
      state: false,
      data: {},
    });
  };

  const deleteUserRow = (id) => {
    const userToDelete = users.find((_) => _.id === id);
    updateUsers(users.filter((user) => user.id !== id));
    setToasterMessage(
      `User (${userToDelete.firstName} ${userToDelete.lastName}) is deleted succesfully`
    );
  };

  const handleEditModalClose = async (user) => {
    if (user) {
      let orgUsersState = [...users];
      let userToUpdate = orgUsersState.find((_) => _.id === user.id);
      userToUpdate.firstName = user.firstName;
      userToUpdate.lastName = user.lastName;
      userToUpdate.coursePurchased = user.coursePurchased;

      const editUserResponse = await HttpClient.put(
        `user/${user.id}`,
        userToUpdate
      );
      if (editUserResponse.status === 200) {
        updateUsers(orgUsersState);
        setToasterMessage(
          `User (${user.firstName} ${user.lastName}) is updated succesfully`
        );
      }
    }
    setEditModal({
      state: false,
      data: {
        firstName: "",
        lastName: "",
        email: "",
        coursePurchased: "",
      },
    });
  };

  return (
    <React.Fragment>
      <DeleteModal show={deleteModal.state} handleClose={handleModalClose} />
      <EditUserModal
        show={editModal.state}
        handleClose={(user) => handleEditModalClose(user)}
        data={editModal.data}
      />
      {userGrid}
      <Toaster message={message} type="success" />
    </React.Fragment>
  );
}

export default User;
