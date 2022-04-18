/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
import React, { useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Link, TextField, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarComp from "../NavbarComp";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100
  },
  box: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  smallerBox: {
    marginTop: 30
  },
  form: {
    display: "grid",
    width: 400,
    gridRowGap: 20
  },
  delete: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column"
  }
}));

export default function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  var currentUser = localStorage.getItem("logged_in_user");
  var creds = { currentUser };
  const handleSubmit = event => {
    alert("The account will be deleted");
    // var users = JSON.parse(localStorage.getItem("users"));
    // var curr = localStorage.getItem("currentUser");
    // var final_used = users.filter(function (users) {
    //   return users.username != curr;
    // });
    // localStorage.setItem("users", JSON.stringify(final_used));

    deleteProfile();
    navigate("/");
  };
  function deleteProfile() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  useEffect(() => {
    currentUser = localStorage.getItem("logged_in_user");

    if (currentUser === '') {
      // alert("Please sign in to accesss the account");
      navigate("/login");
    }
  });
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    justifyContent: "space-around",
    margin: "auto"
  }));
  return (
    <div>
      <NavbarComp />
      <div>
        {/* <Appbar></Appbar> */}
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10} sm={10}>
              <Item>
                <Typography variant="h5" component="div">
                  WELCOME USER
                </Typography>
                <Typography variant="h5" component="div">
                  User Email: {currentUser}
                </Typography>
                <div className={classes.delete}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Delete User
                  </Button>
                </div>
              </Item>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

// for grid style-https://mui.com/components/grid/
