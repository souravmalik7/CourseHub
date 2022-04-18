/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import { Modal } from "../components/Admin/AdminModel";
import "../assets/css/AdminDiscount.css";
import { useEffect, useState } from "react";
import HttpClient from "../services/AdminHttpClient";
import Toaster from "../components/Admin/AdminToaster";


export const AdminDiscountModel = ({ handleClose, show }) => {
  const [message, setToasterMessage] = useState("");
  const [discount, setDiscount] = useState([]);

  const fetchDiscounts = async () => {
    const response = await HttpClient.get("discount/coupons");
    setDiscount(response.data.users);
  };

  useEffect(() => {
    show && fetchDiscounts();
  }, [show]);

  const addDiscountRow = () => {
    const discounts = [...discount];
    discounts.push({
      couponCode: "",
      value: "",
      _id: (discounts.length + 1).toString(),
      isNew: true,
      couponCodeError: false,
      valueError: false,
    });
    setDiscount(discounts);
  };

  const handleDiscountDelete = async (item) => {
    if (!item.isNew) {
      const result = await HttpClient.remove(`discount/coupons/${item._id}`);
      if (result.status === 200) {
        setDiscount(discount.filter((_) => _._id !== item._id));
        setToasterMessage(
          `Coupon deleted succesfully`
        );
      }
    } else {
      setDiscount(discount.filter((_) => _._id !== item._id));
    }
  };

  const handleDiscountSave = async (item) => {
    const clonedDiscounts = [...discount];
    const itemToAdd = clonedDiscounts.find((_) => _._id === item._id);

    if (itemToAdd.couponCode === "" || itemToAdd.value === "") {
      return;
    }

    if (item.isNew) {
      const addedCouponResponse = await HttpClient.post("discount/add", {
        name: item.couponCode,
        value: item.value
      });
      if (addedCouponResponse.status === 201) {
        itemToAdd.isNew = false;
        itemToAdd._id = addedCouponResponse.data.id;
        setDiscount(clonedDiscounts);
        setToasterMessage(
          `Coupon added succesfully`
        );
      }
    } else {
      const updatedCouponResponse = await HttpClient.put(`discount/coupons/${item._id}`, {
        couponCode: item.couponCode,
        value: item.value
      });
      if (updatedCouponResponse.status === 201) {
        setDiscount(clonedDiscounts);
        setToasterMessage(
          `Coupon updated succesfully`
        );
      }
    }
  };

  const handleValueChange = (item, property, value) => {
    const clonedDiscounts = [...discount];
    const updatedDiscount = clonedDiscounts.find((_) => _._id === item._id);
    updatedDiscount[property] = value;
    if (value === "") {
      updatedDiscount[property + "Error"] = true;
    } else {
      updatedDiscount[property + "Error"] = false;
    }
    setDiscount(clonedDiscounts);
  };

  const discountRows = discount.map((item) => {
    return (
      <tr key={item._id}>
        <td>
          <input
            type="text"
            className={item.couponCodeError ? "error" : ""}
            value={item.couponCode}
            onChange={($event) =>
              handleValueChange(item, "couponCode", $event.target.value)
            }
          />
        </td>
        <td>
          <input
            type="text"
            className={item.valueError ? "error" : ""}
            value={item.value}
            onChange={($event) =>
              handleValueChange(item, "value", $event.target.value)
            }
          />
        </td>
        <td>
          <section className="actions">
            <span
              className="material-icons icon"
              onClick={() => handleDiscountDelete(item)}
            >
              delete
            </span>
            <span
              className="material-icons icon"
              onClick={() => handleDiscountSave(item)}
            >
              save
            </span>
          </section>
        </td>
      </tr>
    );
  });

  const handleModelClose = () => {
    setDiscount([]);
    handleClose(false);
  };

  const footerView =
    <div>
      <button
        value="false"
        className="secondary-button button"
        onClick={() => handleClose(false)}
      >
        Ok
      </button>
    </div>
    ;

  const body = (
    <section className="discount-container">
      <section className="add-discount">
        <div className="add-primary add-primary-discount" onClick={() => addDiscountRow()}>
          Add discount
        </div>
      </section>
      <table className="discount-table">
        <thead>
          <tr>
            <th>Coupon</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{discountRows}</tbody>
      </table>

    </section>
  );

  const content = {
    headerContent: "Manage Discount",
    bodyContent: body,
    footerContent: footerView,
    modalType: "edit",
  };

  return <section>
    <Toaster message={message} type="success" />
    <Modal content={content} show={show} handleClose={handleModelClose} />
  </section>;
};
