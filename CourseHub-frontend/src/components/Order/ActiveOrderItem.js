import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ActiveOrderItem = ({order}) => {
    const navigate = useNavigate()
    const openActiveOrder = (order) => {
        let id = order._id
        navigate(`/order/${id}`, {state: {order: order}})
    }
    return (
        <Paper sx={{ p: 2, margin: '5px', width: '50%', height: '50px', flexGrow: 1, backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff', }} >
        <Grid container spacing={2}>
            <Grid xs={12} m="10px" container>
                  <Grid item xs>
                    <Typography gutterBottom variant="h6" component="div">
                        Order {order._id}
                    </Typography>
                  </Grid>
                  <Grid item m="-3px" justifyContent="flex-end">
                    <Button onClick={() => openActiveOrder(order)} variant="outlined"> Check Status </Button>
                  </Grid>
            </Grid>
        </Grid>
        </Paper>
    )
  }
  
  export default ActiveOrderItem
