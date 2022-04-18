/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import axios from 'axios';
import { useState, useEffect } from 'react';

// Backend URL
const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com/courses';

// Method to get all the courses
const getCourses = (course) => {
    return axios.get(backEndURL, course);
}

// Method to get all the courses
const getCourseByName = (courseName) => {
    return axios.get(backEndURL + `/${courseName}`);
}

export { getCourses, getCourseByName }