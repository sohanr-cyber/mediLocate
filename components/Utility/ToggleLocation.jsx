import React, { useRef } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocationOffIcon from '@mui/icons-material/LocationOff'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from '@/redux/userSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const ToggleLocation = () => {
    const location = useSelector(state => state.user.location)
    const dispatch = useDispatch()

    const locationRef = useRef(location)

    const turnOnLocation = () => {

        if (!navigator.geolocation) {
            dispatch(showSnackBar({
                message: "Geolocation not supported",
                variant: "warning"
            }))
            return
        }

        // ✅ Start loading
        dispatch(startLoading())

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                updateCoordinates(
                    pos.coords.latitude,
                    pos.coords.longitude
                )
                // ✅ Stop loading on success
                dispatch(finishLoading())
            },
            () => {
                // ✅ Stop loading on error
                dispatch(finishLoading())

                dispatch(showSnackBar({
                    message: "Can't Detect Location",
                    variant: "warning"
                }))
            }
        )
    }

    const updateCoordinates = (lat, lng) => {
        const newLocation = { lat, lng }

        locationRef.current = newLocation
        dispatch(setLocation(newLocation))

        dispatch(showSnackBar({
            message: `Location set to ${newLocation.lat}, ${newLocation.lng}`
        }))
    }

    return (
        <div onClick={turnOnLocation} >
            {locationRef.current?.lat || location?.lat ? (
                <LocationOnIcon style={{ color: "red", fontSize: "190%" }} />
            ) : (
                <LocationOffIcon style={{ fontSize: "190%" }} />
            )}
        </div>
    )
}

export default ToggleLocation