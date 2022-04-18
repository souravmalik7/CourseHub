/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import { Modal } from "../components/Admin/AdminModel";

export const DeleteModal = ({ handleClose, show }) => {
  const footer = (
    <div className="button-wrapper">
      <button value="false" className="secondary-button button" onClick={() => handleClose(false)}>
        No
      </button>
      <button value="true" className="primary-button button" onClick={() => handleClose(true)}>
        Yes
      </button>
    </div>
  );

  const content = {
    headerContent: "Confirm",
    bodyContent: "Are you sure you want to delete this record?",
    footerContent: footer,
    modalType: 'delete'
  };

  return <Modal content={content} show={show} handleClose={handleClose} />;
};
