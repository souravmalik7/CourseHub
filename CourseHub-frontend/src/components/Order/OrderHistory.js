import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        borderRadius: 15,
        margin: '10px',
        maxWidth: 800,
        overflowX: 'auto'
    },
    table: {
        minWidth: 650, 
        border:"1px solid",
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: "rgb(63, 81, 181)",
        color: "theme.palette.getContrastText(theme.palette.primary.dark)"
    },
    status: {
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}))

const OrderHistory = ( {email}) => {
    const classes = useStyles();

    const [orderHistory, setOrderHistory] = useState([]);

    // useEffect hook to get all the past orders for current logged in user from the database
    useEffect(()=>{
        // Backend URL
        const backEndURL = 'https://csci-5709-course-hub-backend.herokuapp.com/order/history';
        // fetch all the past order from the database for the current logged in user
        axios.get(backEndURL + '/' + email)
        .then((response) => {
            let result = response.data
            // set order history state if the success attribute of response is true 
            if(result.success){
                setOrderHistory(result.orderHistory)
            }
            console.log(orderHistory)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Grid container direction="column" alignItems="center" border= "1px solid rgba(0,0,0,.125)" border-radius="0.25rem" >
            <Typography gutterBottom  sx={{ mt:'10px', fontSize: { md: 25, sm: 15, xs: 15 }}} variant="h4" component="h2" align='center'>Order History</Typography>
            {orderHistory.length > 0 ?
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead sx={{color: 'white'}}>
                        <TableRow style={{height: '10px'}}>
                            <TableCell className={classes.tableHeaderCell}> Order ID </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Course Name </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Date </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Amount </TableCell>
                            <TableCell className={classes.tableHeaderCell}> Status </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orderHistory.map((order) => (
                            <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row"> {order._id} </TableCell>
                            <TableCell >{order.courseName.length > 1 ? order.courseName[0] + ", " + order.courseName[1] + ", ..." : order.courseName} </TableCell>
                            <TableCell >{order.date.split("T")[0]}</TableCell>
                            <TableCell >{order.amount}</TableCell>
                            <TableCell >
                                <Typography className={classes.status} style={{ backgroundColor: ((order.status === 'Completed' && 'green') ||
                                                                                                 (order.status === 'Failed' && 'red')) }}> 
                                    {order.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : 
                <Typography variant="h6" component="h2">
                  No order history is available.
                </Typography>
            }
        </Grid>
  )
}

export default OrderHistory