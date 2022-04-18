/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import "../../assets/css/AdminValidation.css";

export const Validation = ({ messages }) => {
  return (
    messages.length > 0 &&
    <div className="errorMessage">
      {messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
};
