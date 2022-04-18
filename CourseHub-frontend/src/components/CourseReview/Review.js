/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Profile from '../../assets/images/profile.png'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaStar } from 'react-icons/fa';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Review = ({review, setReviewToDelete, currentUser, setIsDeleteIconClicked}) => {
    return (
        <Paper sx={{ p: 2, margin: '5px', width: '70%', flexGrow: 1, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }} >
        <Grid container spacing={2}>
            {/* Display user profile*/}
            <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={Profile} />
            </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                {/* Display user name*/}
                <Typography gutterBottom variant="subtitle1" component="div">
                    {review.userName}
                </Typography>
                {/* Display review description*/}
                <Typography variant="body2" gutterBottom>
                    {review.description}
                </Typography>
                {/* Display rating given by user*/}
                <Typography variant="body2" color="text.secondary">
                    {/* map all the star to star icon */}
                    { [...Array(parseInt(review.stars))].map((star, index) => {
                        return (
                            <label>
                                <FaStar color="#FFC107" size={30}/>
                            </label>
                        )
                    })}
                </Typography>
                </Grid>
            </Grid>
            {/* If the review is written by current logged in user then display delete icon to delete the review.
                if delete icon is clicked then set this review as review to delete in reviewToDelete state
                and also set isDeleteIconClicked state to true. so, that parent component will perform further action.
            */}
            <Grid item>
                {review.userName ===  currentUser ? <IconButton aria-label="delete" size="large">
                    <DeleteIcon onClick={() => {
                        setReviewToDelete(review)
                        setIsDeleteIconClicked(true)
                    }}  
                fontSize="inherit"/>
                </IconButton>
                :
                <></>}
            </Grid>
            </Grid>
        </Grid>
        </Paper>
    );
}

export default Review