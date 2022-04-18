/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import axios from 'axios';

// Backend URL
const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com';
// const backEndURL = 'http://localhost:3000'

// Method to add to orderhistory
const addOrder = (body) => {
    return axios.post(backEndURL + "/order/add", body);
}

// Method to add user to course
const addUserToCourse = (body) => {
    return axios.post(backEndURL + "/courses/adduser", body);
}

// Method to delete item from cart
const clearCart = (item) => {
    return axios.delete(backEndURL + "/cart/clear", {data: item});
}

export { addOrder, addUserToCourse, clearCart }