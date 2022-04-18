/*=======================================================
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/cart';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 200,
  },
  media: {
    height: 140,
  },
});

export default function CourseCard(props) {
  const classes = useStyles();
  let navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/courses/${id}`);
}

const handleClickCart = () => {
  if (localStorage.getItem("logged_in_user") == '') {
    navigate(`/login`);
  }
  const body = {
    userId: localStorage.getItem("logged_in_user"),
    courseName: props.courseName,
    courseImage: props.courseImage,
    coursePrice: props.coursePrice,
    courseAuthor: props.courseAuthor
  }
  addToCart(body);
};

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.courseImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.courseName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.courseDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleClick(props.courseName)}>
          View
        </Button>
        <Button size="small" color="primary" onClick={() => handleClickCart()}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
