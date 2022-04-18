/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import axios from 'axios';

// Backend URL
const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com/coupons';
// const backEndURL = 'http://localhost:3000/coupons'


// Method to get coupon
const getDiscount = (coupon) => {
    return axios.get(backEndURL + `/${coupon}`);
}

export { getDiscount}