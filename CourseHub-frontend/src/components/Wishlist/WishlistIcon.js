/**
 * @Author  Jay Bipinchandra Patel
 * @Banner  B00886902
 * @NetID   jy439129
 * @EmailId jy439129@dal.ca
 */
import FavoriteIcon from '@mui/icons-material/Favorite';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './../../assets/css/WishlistIcon.css'

const wishlistEndpoint = 'https://csci-5709-course-hub-backend.herokuapp.com/wishlist/'

export default function WishlistIcon(props) {
    const SILVER_COLOR_CODE = "#C0C0C0";
    const BLUE_COLOR_CODE = "#0096FF";
    const [iconColorCode, setIconColorCode] = useState(SILVER_COLOR_CODE);
    const [changeId, setChangeId] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if(!props.userId) {
            return;
        }
        let checkUrl = wishlistEndpoint + "check" + "/" + props.userId + "/" + props.courseId;
        axios.get(checkUrl).then((res) => {
            if (res.data.isWishlisted) {
                setIconColorCode(BLUE_COLOR_CODE);
                setIsWishlisted(true);
            } else {
                setIconColorCode(SILVER_COLOR_CODE);
                setIsWishlisted(false);
            }
        });
    }, []);

    async function handleOnClick() {
        if(!props.userId) {
            return;
        }
        if (isWishlisted) {
            // remove
            let removeFromWishlistUrl = wishlistEndpoint + props.userId + "/" + props.courseId;
            console.log(removeFromWishlistUrl);
            axios.delete(removeFromWishlistUrl).then((res) => {
                if (res.data.success) {
                    setIconColorCode(SILVER_COLOR_CODE);
                    setIsWishlisted(false);
                }
            });
        } else {
            // add
            let addToWishlistUrl = wishlistEndpoint + "add/";
            console.log(addToWishlistUrl);
            const headers = {
                'Content-Type': 'text/plain'
            };
            axios.post(addToWishlistUrl, props, headers).then((res) => {
                if (res.data.success) {
                    setIconColorCode(BLUE_COLOR_CODE);
                    setIsWishlisted(true);
                }
            });
        }
    }

    useEffect(() => {
        if (changeId > 0) {
            handleOnClick();
        }
    }, [changeId]);

    return (
        <button className='favorite-btn' onClick={() => { setChangeId(changeId + 1); }}>
            <div className='favorite-icon'>
                <FavoriteIcon
                    sx={{ fontSize: 35, color: iconColorCode }} >
                </FavoriteIcon>
            </div>
        </button>
    );
}