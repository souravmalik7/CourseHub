/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Paper,
  Avatar
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Appbar from "../AppBar/AppBar";
import App from "../../App";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

/**
 * @Ridampreet
 * @Signup
 **/

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",

    paddingTop: 100
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1400px",
    display: "auto"
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
    width: "100%",
    gridRowGap: 20
  },
  signUp: {
    margin: "20px 0px 20px 0px"
  }
}));

function checkUser() {
  return fetch(
    "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.users.length > 0) {
        // console.log(data.users);
        return data.users;
      }
    });
}

export default function Signup() {
  const [arrOfIUsers, setarrOffUsers] = useState([]);
  useEffect(() => {
    fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.users.length > 0) {
          setarrOffUsers(data.users);
        }
      });
  }, []);
  // let users = JSON.parse(localStorage.getItem("users")) ?? [];
  // console.log(userArrayFromAPI);
  const [passError, setpassError] = useState(false);
  const [fnameError, setfnameError] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const [emailEror, setEmailError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  console.log(arrOfIUsers);
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputEmail = data.get("email");
    const inputPassword = data.get("password");
    const inputName = data.get("firstName");
    const inputLName = data.get("lastName");
    const inputCPassword = data.get("cpassword");
    const inputAnswer = data.get("answer");
    var registeredOrNot = false;
    const currentUser = {
      username: inputEmail,
      password: inputPassword,
      answer: inputAnswer
    };
    for (var i = 0; i < arrOfIUsers.length; i++) {
      if (arrOfIUsers[i].email === inputEmail) {
        registeredOrNot = true;
        console.log(arrOfIUsers[i].email, inputEmail);
        break;
      }
    }
    if (
      !/[^a-zA-Z]/.test(inputName) &&
      !/[^a-zA-Z]/.test(inputLName) &&
      inputPassword.length >= 8 &&
      inputCPassword.length >= 8 &&
      inputCPassword === inputPassword &&
      inputEmail.includes("@") &&
      registeredOrNot == false
    ) {
      // users = [...users, currentUser];
      // localStorage.setItem("users", JSON.stringify(users));
      // logic to send the valid details to the registration API.
      const creds = {
        inputEmail,
        inputName,
        inputLName,
        inputPassword,
        inputAnswer
      };
      getResultant(creds);
      navigate("/");
    } else {
      if (
        inputPassword !== inputCPassword ||
        inputPassword.length < 8 ||
        inputCPassword.length < 8
      ) {
        alert("Error with the password");
        setpassError(true);
      }
      if (/[^a-zA-Z]/.test(inputName)) {
        alert("Error with the First name");
        setfnameError(true);
      }
      if (/[^a-zA-Z]/.test(inputLName)) {
        alert("Error with the Last name");
        setlnameError(true);
      }

      if (!inputEmail.includes("@") || !inputEmail.includes(".com")) {
        alert("Please provide a valid email address");
        setEmailError(true);
      }
      if (registeredOrNot == true) {
        alert("User email already registered");
        setEmailError(true);
      }
    }
  };

  function getResultant(creds) {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    justifyContent: "space-around",
    margin: "auto",
    width: "100%"
  }));
  return (
    <div>
      <div>{/* <Appbar></Appbar> */}</div>

      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10} sm={10}>
            <Item>
              <Box className={classes.box}>
                <Typography variant="h5">New User</Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  className={classes.smallerBox}
                >
                  <div className={classes.form}>
                    <TextField
                      label="First Name"
                      fullWidth
                      required
                      autoFocus
                      name="firstName"
                      error={fnameError}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      required
                      name="lastName"
                      error={lnameError}
                    />
                    <TextField
                      label="Email Address"
                      fullWidth
                      required
                      name="email"
                      error={emailEror}
                    />
                    <TextField
                      label="Password"
                      fullWidth
                      required
                      type="password"
                      name="password"
                      error={passError}
                    />
                    <TextField
                      label="Confirm Password"
                      fullWidth
                      required
                      type="password"
                      name="cpassword"
                      error={passError}
                    />
                    <br />
                    <Typography variant="h5">Security Questions</Typography>
                    <br />
                    <Typography>What is your place of birth ?</Typography>
                    <TextField
                      label="Security answer"
                      fullWidth
                      required
                      type="text"
                      name="answer"
                    />
                  </div>
                  <div className={classes.signUp}>
                    <Button type="submit" fullWidth variant="contained">
                      Register
                    </Button>
                  </div>
                  <div>
                    <Link
                      href=""
                      variant="body2"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      SIGN IN
                    </Link>
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
// for grid style-https://mui.com/components/grid/
