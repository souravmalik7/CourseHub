/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca )
========================================================= */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../components/Appbar";
import Card from "../components/CourseCard"
import { useState, useEffect } from 'react';
import { Grid, AppBar, Filter } from "@material-ui/core";
import { getCourses } from '../services/courses';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NavbarComp from '../components/NavbarComp';

const useStyles = makeStyles({
  gridcontainer: {
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '50px',
  },
  center: {
    paddingLeft: '25px',
    paddingTop: '15px',
  }
});

const Home = () => {
  const [allcourses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [uniqueCourses, setUniqueCourses] = useState([]);
  const [value, setValue] = React.useState('all');
  let currentCourse = '';
  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response.data.courses);
      for (let i = 0; i < response.data.courses.length; i++) {
        currentCourse = response.data.courses[i].courseCategory;
        if (uniqueCourses.indexOf(currentCourse) == -1) {
          uniqueCourses.push(currentCourse);
        }
      }
      setUniqueCourses(uniqueCourses);
      setSelectedCourses(response.data.courses);
    });
  }, []);

  const filterCourses = (event) => {
    setValue(event.target.value);
    let filterVal = event.target.value;
    let filteredCourses = allcourses.filter(course => course.courseCategory === filterVal);
    setSelectedCourses(filteredCourses);
    if (filterVal === 'all') {
      setSelectedCourses(allcourses);
    }
  }

  const classes = useStyles();

  return (
    <>
      <NavbarComp />
      <div>
        <div className={classes.center}>
          <FormControl component="fieldset">
            <FormLabel component="legend" required={true} >Category</FormLabel>
            <RadioGroup aria-label="category" name="category" value={value} onChange={filterCourses} row>
              <FormControlLabel value="all" control={<Radio />} label="All" />
              {uniqueCourses.map((course) => {
                return <FormControlLabel value={course} control={<Radio />} label={course} />
              })}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Grid
            container
            spacing={3}
            className={classes.gridcontainer}>
            {selectedCourses.map((course) => {
              return <Grid item xs={12} sm={6} md={4}>
                <div><Card courseName={course.courseName} courseDescription={course.courseDescription} courseImage={course.courseImage} coursePrice={course.coursePrice} courseAuthor={course.courseAuthor} /></div></Grid>
            })}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Home