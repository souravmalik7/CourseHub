/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import React from 'react';
import { getCourseByName } from '../services/courses';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { autocompleteClasses } from '@mui/material';
import ReviewSection from "../components/CourseReview/ReviewSection";
import NavbarComp from '../components/NavbarComp';
import WishlistIcon from "../components/Wishlist/WishlistIcon";
import { addToCart } from '../services/cart';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    //   maxWidth: 350,
    //   maxHeight: 1500,
    margin: autocompleteClasses,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function CoursePage() {
  let navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("logged_in_user"));
  const [wishlist, setWishlist] = useState('');
  const classes = useStyles();
  const [course, setCourse] = useState([]);
  const [courseNameReview, setCourseNameReview] = useState('');
  const params = useParams();
  // const [body, setBody] = useState({
  //   userId: "",
  //   courseName: ""
  // });

  useEffect(() => {
    getCourseByName(params.courseName).then((response) => {
      setCourse(response.data.course)
      if (response.data.course !== undefined && response.data.course.length > 0) {
        setCourseNameReview(response.data.course[0].courseName);
      }
    });
  }, []);

  useEffect(() => {
    if (course.length > 0) {
      setWishlist(<WishlistIcon userId={userId} courseId={course[0]._id} />);
    }
  }, [course]);

  let courseName, courseDescription, coursePrice, courseImage, courseAuthor, purchasedBy, courseDetails;
  if (course !== undefined && course.length > 0) {
    courseName = course[0].courseName;
    courseDescription = course[0].courseDescription;
    coursePrice = course[0].coursePrice;
    courseImage = course[0].courseImage;
    courseAuthor = course[0].courseAuthor;
    purchasedBy = course[0].purchasedBy;
    courseDetails = course[0].courseDetails;
  }

  const handleClick = (event) => {
    if (localStorage.getItem("logged_in_user") == '') {
      navigate(`/login`);
    }
    // setBody(userId, courseName);
    const body = {
      userId: userId,
      courseName: courseName,
      courseImage: courseImage,
      coursePrice: coursePrice,
      courseAuthor: courseAuthor
    }
    event.preventDefault();
    addToCart(body);
  };

  return (
    <>
      <NavbarComp />
      <Card size="lg" className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image={courseImage}
            title={courseName}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              <table className='tbl'>
                <tr>
                  <td className='tbl-cell1'>{courseName}</td>
                  <td className='tbl-cell2'>
                    <div className='wishlist-btn'><Typography>{wishlist}</Typography></div>
                  </td>
                </tr>
              </table>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Created By: {courseAuthor}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {courseDetails}
            </Typography>
            <br />
            <Typography gutterBottom variant="h5" component="h2">
              ${coursePrice}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClick}>
            Add to Cart
          </Button>
        </CardActions>
        {courseNameReview !== '' && <ReviewSection courseName={courseNameReview} purchasedBy={purchasedBy} />}
      </Card>
    </>
  );
}

export default CoursePage
