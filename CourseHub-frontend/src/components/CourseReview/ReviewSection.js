/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import '../../assets/css/course-home-page.css'
import ReviewModal from './ReviewModal';
import Review from './Review';
import { Box, Grid, Typography } from '@mui/material';
import { deleteReviewByID, addReviewByCourseName } from '../../services/reviews';
import DeleteReviewDialog from './DeleteReviewDialog';
import axios from 'axios';

const ReviewSection = ( { courseName, purchasedBy } ) => {
  // current logged in user
  const currentUser = localStorage.getItem("name");
  // state to store all the reviews for the selected course
  const [reviews, setReviews] = useState([]);
  // state to show and hide ReviewModal
  const [isShow, setIsShow] = useState(false);
  // state to check if delete icon is clicked or not
  const [isDeleteIconClicked, setIsDeleteIconClicked] = useState(false);
  // state to store review to delete on click of delete icon
  const [reviewToDelete, setReviewToDelete] = useState()
  // state to check if user selected Yes or No on DeleteReviewDialog component
  const [isYes, setIsYes] = useState(false)
  let isFirst = true
  // function to add review
  const addReview = (review) => {
    review.userName = currentUser;
    review.courseName = courseName;
    // call addReviewByCourseName service method to store review in database
    addReviewByCourseName(review);
  }

  // useEffect hook to get all the review for selected course from the database
  useEffect(()=>{
    // Backend URL
    const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com/reviews';
    // fetch all the reviews from the database for selected course
    if(courseName && isFirst){
      axios.get(backEndURL + '/' + courseName)
      .then((response) => {
          let result = response.data
          // set reviews state if the success attribute of response is true 
          if(result.success){
              setReviews(result.reviews)
          }
      })
      .catch((error) => {
          console.log(error)
      })
      isFirst = false
      }
    }, [])
  
  // useEffect hook to delete review on isYes state changes
  useEffect(() => {
    if(isYes){
      // call deleteReviewByID service method to delete review from database
      deleteReviewByID(reviewToDelete._id)
      // update the reviews state to render updated reviews on UI after deleting the review 
      let updatedReviews = reviews.filter((element) => element._id !== reviewToDelete._id);
      setReviews(updatedReviews);
      setIsYes(false)
    }
  }, [isYes])
  
  return (
    <>
      {// ReviewSection component
      }
      <Typography gutterBottom variant="h5" component="h2"align='center'>REVIEWS</Typography>
      <Grid container border= "1px solid rgba(0,0,0,.125)" border-radius="0.25rem">
        <Grid container width="100%" direction="row" justify="right">
          { // if the the selected course is purchased bu current user then only display the
            // Add Review button otherwise do not display button
            purchasedBy ? 
            purchasedBy.includes(currentUser) ?
            <Box sx={{ pt:'1.5%', pl:'89%' }}><Button onClick={() => setIsShow(true)} variant="outlined"> Add Review </Button> </Box>
            : <></> 
            : <></>
          }
        </Grid>
        <Grid container direction="column" alignItems="center" justify="center">
          { /* If reviews exists for this course then use map function 
               to map all the review to corresponding Review component, 
               otherwise display proper message*/
            reviews.length > 0 ? reviews.map((review) => {
              return <Review review={review} currentUser={currentUser} setReviewToDelete={setReviewToDelete}  setIsDeleteIconClicked= {setIsDeleteIconClicked} />
            })
            : 
            <Typography variant="h6" component="h2">
              No reviews available for this course.
            </Typography>
          }
        </Grid>
      </Grid>
      
      {// ReviewModal component
      isShow ? <ReviewModal isShow={isShow}  setIsShow={setIsShow} addReview={addReview}/> : <></>
      }
      {// DeleteReviewDialog component
      isDeleteIconClicked ? 
        <DeleteReviewDialog isDeleteIconClicked={isDeleteIconClicked} 
                            setIsDeleteIconClicked={setIsDeleteIconClicked} 
                            setIsYes={setIsYes} /> 
        : <></> }
    </>
  )
}

export default ReviewSection