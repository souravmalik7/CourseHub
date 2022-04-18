import React, { useEffect } from 'react';
import NavbarComp from '../NavbarComp'
import ActiveOrder from './ActiveOrder'
import OrderHistory from './OrderHistory'
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("logged_in_user") == '') {
        navigate(`/login`);
    }
}, [])
  const currentUserID = localStorage.getItem("logged_in_user")
  return (
    <>
        <NavbarComp />
        <Grid container direction="column" alignItems="center" justify="center">
            {/* <ActiveOrder email={currentUserID} /> */}
            <OrderHistory email={currentUserID} />
        </Grid>
    </>
  )
}

export default Order