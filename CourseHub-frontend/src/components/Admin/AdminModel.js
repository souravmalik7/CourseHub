/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import "../../assets/css/AdminModel.css";

export const Modal = ({
  handleClose,
  show,
  content: { headerContent, bodyContent, footerContent, modalType },
}) => {
  const showHideClassName = show ? "modal show" : "modal hide";
  const bodyHeightClassName =
    modalType === "delete" ? "delete-body" : "edit-body";
  const modalwidthClassName = modalType === "delete" ? "" : "edit-modal-width";

  return (
    show && (
      <section className={showHideClassName}>
        <section className={`modalContainer ${modalwidthClassName}`}>
          <section className="modalHeader">
            {headerContent}
            <span
              className="material-icons close"
              onClick={() => handleClose(false)}
            >
              close
            </span>
          </section>
          <section className={`modalBody ${bodyHeightClassName}`}>
            {bodyContent}
          </section>
          <section className="modalFooter">{footerContent}</section>
        </section>
      </section>
    )
  );
};
