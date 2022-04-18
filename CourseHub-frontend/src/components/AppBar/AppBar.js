import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  icons: {
    marginLeft: theme.spacing(2),
    padding: 1
  }
}));

export default function Appbar() {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CourseHub
          </Typography>
          <Typography variant="h6" className={classes.icons}>
            Discussion Forum
          </Typography>
          <Typography
            variant="h6"
            className={classes.icons}
            onClick={() => navigate("profile")}
          >
            Discounts
          </Typography>
          <FavoriteIcon className={classes.icons} />
          <ShoppingCartIcon className={classes.icons} />
          <AccountCircleIcon className={classes.icons} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
