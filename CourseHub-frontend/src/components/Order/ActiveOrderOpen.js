import { Box, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import NavbarComp from '../NavbarComp'

const ActiveOrderOpen = () => {
  const steps = [
    'Order Intiated',
    'Awaiting Payment',
    'Payment Started',
    'Completed',
  ];
  const location = useLocation()
  const {order} = location.state

  return (
      <>
          <NavbarComp />
          <Typography gutterBottom variant="h6" mt="10px" component="h2" align='center'>Order ID {order._id} Status</Typography>
          <Grid container mt="20px" direction="column" alignItems="center" justify="center">
            <Box sx={{ width: '50%' }}>
              <Stepper activeStep={steps.indexOf(order.status)} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
      </>
    )
  }
  
  export default ActiveOrderOpen