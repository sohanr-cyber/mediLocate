import { showSnackBar } from '@/redux/notistackSlice';
import { setLocation } from '@/redux/userSlice';
import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';

const FindNearMe = () => {
    const dispatch = useDispatch()
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
        (lat, lng) => {
            const newLocation = { lat, lng };
            dispatch(setLocation(newLocation))
            dispatch(showSnackBar({
                message: `location set to ${newLocation.lat} , ${newLocation.lng}`
            }))
        }

    return (
        <div>
            <button onClick={(e) => findMyLocation(e)}>Find NearBy</button>
        </div>
    )
}

export default FindNearMe
