/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */

import React, { useState, useEffect } from "react";
import { Box, Button, Link, TextField, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import NavbarComp from '../../components/NavbarComp';

/**
 * @Ridampreet
 * @Login
 **/

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100,
    height: "1500px"
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
    marginLeft: "50px"
  },
  signIn: {
    margin: "20px 0px 20px 0px",
    width: "100px",
    marginLeft: "180px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column",
    marginLeft: "30px"
  }
}));

export default function Login() {
  const styleForPaper = {
    // padding: 20,
    height: "40vh",
    width: 500,
    margin: "auto",
    marginTop: "2px",

    display: "flex"
  }; //css for the paper cards

  const [userFound, setuserFound] = useState(false);
  let email = "";
  let password = "";
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {});

  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    email = data.get("email");
    password = data.get("password");
    if (email == undefined || password == undefined) {
      alert("Credentials not valid");
    } else {
      const creds = { email };
      read();
    }
  };

  async function read() {
    const ch = await checkRegistration();
    console.log(localStorage.getItem("isAdmin") === "true" && ch);
    if (ch == true) {
      if (email === "sourav@gmail.com") {
        window.open("/admin", "_self");
      } else {
        navigate("/home");
      }
    } else {
      alert("login details do not match");
    }
  }

  function checkRegistration() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/" +
        email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (
          data.users[0] != undefined &&
          email === data.users[0].email &&
          password === data.users[0].password
        ) {
          localStorage.setItem("name", data.users[0].firstName);

          localStorage.setItem("logged_in_user", email);
          if (email === "sourav@gmail.com") {
            localStorage.setItem("isAdmin", true);
          } else {
            localStorage.setItem("isAdmin", false);
          }
          return true;
        } else {
          return false;
        }
      });
  }
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    justifyContent: "space-around",
    margin: "auto"
  }));
  return (
    <div>
      {/* <Appbar></Appbar> */}
      <NavbarComp />
      <div className={classes.container}>
        {/* <Paper elevation={24} style={styleForPaper}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={10} sm={10}>
            <Item>
              <Box>
                <Typography component="h1" variant="h5">
                  SIGN IN
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  className={classes.smallerBox}
                >
                  <div>
                    <TextField
                      autoFocus
                      required
                      fullWidth
                      name="email"
                      label="Email Address"
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </div>
                  <br></br>
                  <div>
                    <Button type="submit" fullWidth variant="contained">
                      Sign In
                    </Button>
                  </div>
                  <br></br>
                  <div className={classes.forgotPassword}>
                    <Link
                      href=""
                      variant="body2"
                      onClick={() => {
                        navigate("/authenticate/forgotPassword");
                      }}
                    >
                      FORGOT PASSWORD?
                    </Link>
                    <Link
                      href=""
                      style={{ marginRight: "15px" }}
                      variant="body2"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      SIGN UP
                    </Link>
                  </div>
                </Box>
              </Box>
            </Item>
          </Grid>

          {/* </Paper> */}
        </Grid>
      </div>
    </div>
  );
}
// citation for the paper and the paper styling is -https://www.youtube.com/watch?v=L2RnP5vhbdg&t=640s
// for paper style-https://mui.com/components/grid/
