/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import { useState, useEffect } from "react";
import "../../assets/css/AdminToaster.css";

function Toaster({ message, type }) {
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setToastMessage(message);
  }, [message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setToastMessage('');
    }, 2000);

    return () => clearInterval(interval);
  }, [toastMessage]);

  return (
    toastMessage && (
      <section className={`toaster-container ${type}`}>{toastMessage}</section>
    )
  );
}

export default Toaster;
