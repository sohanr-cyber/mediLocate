import { showSnackBar } from '@/redux/notistackSlice';
import { setLocation } from '@/redux/userSlice';
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Address from '../User/Address/Address';
import { fetchPlaceName } from '@/utility/helper';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRouter } from 'next/router';
const FindNearMe = ({ text = "Find Near Me" }) => {
    const dispatch = useDispatch()
    const location = useSelector(state => state.user.location)
    const router = useRouter()


    const dhakaCenter = {
        lat: 23.8103,
        lng: 90.4125,
    };
    const findMyLocation = (e) => {
        e.preventDefault()
        if (!navigator.geolocation) {
            // updateCoordinates(dhakaCenter.lat, dhakaCenter.lng);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => updateCoordinates(pos.coords.latitude, pos.coords.longitude),
            () => dispatch(showSnackBar({
                message: "Can't Detect Location",
                variant: "warning"
            }))
        );




    }

    const updateCoordinates =
        async (lat, lng) => {
            const newLocation = { lat, lng };
            dispatch(setLocation(newLocation))
           if (newLocation?.lat && newLocation?.lng) {
            router.push({
                pathname: "/dr",
                query: {
                    lat: newLocation.lat,
                    lng: newLocation.lng,
                },
            });
        }
            // const address = await fetchPlaceName(newLocation.lat, newLocation.lng)
            // console.log(address)
            dispatch(showSnackBar({
                message: `location set to ${newLocation.lat} , ${newLocation.lng}`
            }))
        }

    return (
        <div>
            <button onClick={(e) => findMyLocation(e)} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {text}
                <DirectionsIcon style={{ color: "red", fontSize: "150%" }} />

            </button>
        </div>
    )
}

export default FindNearMe
