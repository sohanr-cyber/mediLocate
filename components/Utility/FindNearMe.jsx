import { showSnackBar } from '@/redux/notistackSlice';
import { setLocation } from '@/redux/userSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRouter } from 'next/router';
import { finishLoading, startLoading } from '@/redux/stateSlice';

const FindNearMe = ({ text = "Find Near Me", redirect = true }) => {
    const dispatch = useDispatch()
    const location = useSelector(state => state.user.location)
    const router = useRouter()

    const findMyLocation = (e) => {
        e.preventDefault()

        if (location?.lat) {
            if (redirect && location?.lat && location?.lng) {
                router.push({
                    pathname: "/dr",
                    query: {
                        lat: location.lat,
                        lng: location.lng,
                    },
                });
            }
            return
        }

        if (!navigator.geolocation) {
            dispatch(showSnackBar({
                message: "Geolocation not supported",
                variant: "warning"
            }))
            return;
        }

        // ✅ Start loading
        dispatch(startLoading())

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                updateCoordinates(pos.coords.latitude, pos.coords.longitude)
                // ✅ Finish loading on success
                dispatch(finishLoading())
            },
            () => {
                // ✅ Finish loading on error
                dispatch(finishLoading())
                dispatch(showSnackBar({
                    message: "Can't Detect Location",
                    variant: "warning"
                }))
            }
        );
    }

    const updateCoordinates = async (lat, lng) => {
        const newLocation = { lat, lng };
        dispatch(setLocation(newLocation))

        if (redirect && newLocation?.lat && newLocation?.lng) {
            router.push({
                pathname: "/dr",
                query: {
                    lat: newLocation.lat,
                    lng: newLocation.lng,
                },
            });
        }

        dispatch(showSnackBar({
            message: `Location set to ${newLocation.lat} , ${newLocation.lng}`
        }))
    }

    return (
        <div>
            <button
                onClick={(e) => findMyLocation(e)}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
                {text}
                <DirectionsIcon style={{ color: "red", fontSize: "150%" }} />
            </button>
        </div>
    )
}

export default FindNearMe