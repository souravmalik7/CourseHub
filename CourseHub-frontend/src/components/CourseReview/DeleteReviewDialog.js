/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
========================================================= */
import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DeleteReviewDialog = ({ isDeleteIconClicked, setIsDeleteIconClicked, setIsYes }) => {
  // useTheme hook to access currently active theme
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // function to handle buttons (YES / NO) click
  const handleClick = (event) => {
    // set isYes state to Yes or No based on button click
    if(event.target.value === "Yes"){
      setIsYes(true)
    }
    if(event.target.value === "No"){
      setIsYes(false)
    }
    // set isDeleteIconClicked state to false
    // so that DeleteReviewDialog component will be removed from UI
    setIsDeleteIconClicked(false);
  }
  
  return (  
    <Dialog open={isDeleteIconClicked} onClose={() => setIsDeleteIconClicked(false)}
            fullScreen={fullScreen} 
            aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title"> {"Are you sure?"} </DialogTitle>
      <DialogContent>
        <DialogContentText>
            By clicking YES will delete your review permanently. 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} value="Yes">Yes</Button>
        <Button onClick={handleClick} value="No" autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteReviewDialog