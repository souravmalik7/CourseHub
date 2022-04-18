/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */

import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Appbar from "../AppBar/AppBar";

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
    gridRowGap: 20
  },
  signIn: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column"
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1800px"
  }
}));

export default function Login() {

  localStorage.setItem("isAdmin", false);
  localStorage.setItem("logged_in_user", "");
  localStorage.setItem("name", "");
  window.open('/', '_self'); 
}
