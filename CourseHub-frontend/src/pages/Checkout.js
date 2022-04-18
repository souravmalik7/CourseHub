import React, { useEffect } from 'react';
import NavbarComp from '../components/NavbarComp';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from "@mui/material";

function Checkout() {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("logged_in_user") == '') {
            navigate(`/login`);
        }
    }, []);

    const handleClick = (id) => {
        navigate(`/`);
    }
    return (
        <div>
            <div>
                <NavbarComp />
            </div>
            <div style={{padding: '40px'}}>
                <Typography sx={{ paddingBottom: '20px', textAlign: 'center', color: 'slategray' }} variant="h4" component="h2">
                    Congratuations ! Your purchase is successful, Happy Learning !!
                </Typography>
                <Button variant="contained" sx={{  margin: '0 auto',
    display: 'block', backgroundColor: "rgb(63, 81, 181)" }} onClick={handleClick}  >
                                            Continue Shopping
                                        </Button>
            </div>
        </div>

    )
}

export default Checkout
