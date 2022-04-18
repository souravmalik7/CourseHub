/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link, TextField, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Appbar from "../AppBar/AppBar";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    height: "1000px",
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
    gridRowGap: 20,
    marginLeft: "37px"
  },
  signIn: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column",
    background: "lightgrey",
    alignItems: "center"
  }
}));

export default function ForgotPassword() {
  var creds = "";
  var currentUser = "";
  const navigate = useNavigate();
  var answer = "";
  const classes = useStyles();

  // const user = localStorage.getItem("currentUser");
  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // var users = JSON.parse(localStorage.getItem("users"));
    currentUser = data.get("email");
    console.log("The current user is ", currentUser);
    checkForgotPasswordrequirments();
    answer = data.get("answer");

    const username = data.get("email");
    const password = data.get("password");
    const c_password = data.get("cpassword");
    var changed = false;

    if (password.length < 8 || password != c_password) {
      alert("Password not appropriate");
    } else {
      creds = { currentUser, password };
      read();

      navigate("/");
    }
  };
  async function read() {
    const ch = await checkForgotPasswordrequirments();
    console.log("answer is", ch);
    if (ch == true) {
      updateNewPassord();
    } else {
      alert("login details do not match");
    }
  }
  function checkForgotPasswordrequirments() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/" +
        currentUser,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (answer === data.users[0].answer) {
          console.log("******", answer, data.users[0].answer);
          return true;
        } else {
          return false;
        }
      });
  }

  function updateNewPassord() {
    return fetch("https://tutorial5709-3.herokuapp.com/authenticate/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then(response => response.json())
      .then(data => {});
  }
  const styleForPaper = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
    marginTop: "100px",
    display: "flex"
  };
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    justifyContent: "space-around",

    marginLeft: "20%",
    marginRight: "20%",
    width: "60%",
    marginTop: "10%"
  }));
  return (
    <div>
      {/* <Appbar></Appbar> */}
      <div>
        <Grid>
          <Grid item xs={12} md={10} sm={10}>
            <Item>
              <Box className={classes.box}>
                <Typography component="h3" variant="h5">
                  FORGOT PASSWORD
                </Typography>
                <br />
                <Box component="form" onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      autoFocus
                      required
                      fullWidth
                      name="email"
                      label="Email Address"
                    />
                    <br />
                    <br />
                    <Typography component="h1" variant="h5">
                      Enter the answer to the Security Question
                    </Typography>
                    <br />
                    <TextField
                      required
                      fullWidth
                      name="answer"
                      label="What is your place of birth"
                      type="text"
                    />
                    <br />
                    <br />
                    <TextField
                      label="Password"
                      fullWidth
                      required
                      type="password"
                      name="password"
                    />
                    <br />
                    <br />
                    <TextField
                      label="Confirm Password"
                      fullWidth
                      required
                      type="password"
                      name="cpassword"
                    />
                  </div>
                  <div className={classes.signIn}>
                    <Button type="submit" fullWidth variant="contained">
                      Reset Password
                    </Button>
                  </div>
                  <div className={classes.signIn} fullWidth variant="contained">
                    <Button
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </Box>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
// citation for the paper and the paper styling is -https://www.youtube.com/watch?v=L2RnP5vhbdg&t=640s
// for paper style-https://mui.com/components/grid/
