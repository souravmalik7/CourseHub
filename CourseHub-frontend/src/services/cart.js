/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import axios from 'axios';

// Backend URL
const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com/cart';
// const backEndURL = 'http://localhost:3000/cart'

// Method to get all the cart items for a user
const getCart = (userId) => {
    return axios.get(backEndURL + `/${userId}`);
}

// Method to add item to cart
const addToCart = (item) => {
    return axios.post(backEndURL + "/add", item);
}

// Method to delete item from cart
const deleteFromCart = (item) => {
    return axios.delete(backEndURL + "/delete", {data: item});
}

export { getCart, addToCart, deleteFromCart }