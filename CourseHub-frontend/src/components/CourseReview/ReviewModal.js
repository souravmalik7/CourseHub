/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating, TextField } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

// style object for Box tag
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// style object for Button tag
const button = {
  display: 'flex',
  justifyContent: 'end',
  marginTop: '10%',
};

// This function is used to prevent useEffect hook from running on initial render. 
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const ReviewModal = ( { isShow,  setIsShow, addReview }) => {
  // state to store rating given by user
  const [stars, setStars] = useState(0);
  // state to store review given by user
  const [reviewDescription, setReviewDescription] = useState('')
  // state to store any error like, empty review, zero star selected
  const [errors, setErrors] = useState({})

  // On second render execute callback function based on errors state
  useDidMountEffect(() => {
    // if all the keys in errors object are false
    // call addReview() method and set isShow state to false
    // so that ReviewModal component will be removed from UI
    if(Object.keys(errors).every((key) => !errors[key])){
      let review = {stars:stars, description: reviewDescription};
      addReview(review);
      setIsShow(false);
    }
  }, [errors])

  // function to check if any error occured while sumitting the review
  const validateReview = () => {
    let errors = {}
    // if selected star is zero then set star error to true in errors state otherwise set it to false
    stars === 0 ? errors.star = true : errors.star = false
    // if review description is blank then set reviewDescription error to true in errors state otherwise set it to false
    reviewDescription === '' ? errors.reviewDescription = true : errors.reviewDescription = false
    return errors
  }

  return (
    <div>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
        open={isShow} onClose={() => setIsShow(false)} closeAfterTransition BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500, }} >
        <Fade in={isShow}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Write a review
              </Typography>
              <Typography>
                <Rating name="simple-controlled" value={stars} size="large" onChange={(event, newValue) => { setStars(newValue); }} />
                {errors.star ? <Typography variant="caption" display="block" gutterBottom> Please select stars! </Typography> : ''}
              </Typography>
              <Typography>
                <TextField value={reviewDescription} 
                           onChange={(event) => {setReviewDescription(event.target.value) }}  
                           fullWidth label="Review" id="fullWidth" />
                {errors.reviewDescription ? <Typography variant="caption" display="block" gutterBottom> Please write a review! </Typography> : ''}
              </Typography>
              {/* call validateReview function on button click */}
              <Typography sx={button}>
                <Button onClick={ () => setErrors(validateReview())} variant="contained">Submit</Button>
              </Typography>
            </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ReviewModal