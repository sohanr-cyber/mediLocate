import { useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/redux/notistackSlice";

const containerStyle = {
  width: "100%",
  height: "500px",
  position: "relative",
  // border: "1px solid red",
};

const dhakaCenter = {
  lat: 23.8103,
  lng: 90.4125,
};

const MapPicker = ({ onCoordinateSelect, selectedLocation, setSelectedLocation }) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(selectedLocation);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateCoordinates = useCallback(
    (lat, lng) => {
      const newLocation = { lat, lng };
      setLocation(newLocation);
      setSelectedLocation(newLocation)

      if (mapRef.current) {
        mapRef.current.panTo(newLocation);
      }

      dispatch(
        showSnackBar({
          message: `Coordinates Selected: ${lat}, ${lng}`,
        })
      );

      onCoordinateSelect?.(newLocation);
    },
    [dispatch, onCoordinateSelect]
  );

  useEffect(() => {
    if (selectedLocation.lng || selectedLocation.lat) {
      return
    }
    if (!navigator.geolocation) {
      // updateCoordinates(dhakaCenter.lat, dhakaCenter.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => updateCoordinates(pos.coords.latitude, pos.coords.longitude),
      () => updateCoordinates(dhakaCenter.lat, dhakaCenter.lng)
    );
  }, [updateCoordinates]);

  const LocateMe = (e) => {
    e.preventDefault()
    if (!navigator.geolocation) {
      // updateCoordinates(dhakaCenter.lat, dhakaCenter.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => updateCoordinates(pos.coords.latitude, pos.coords.longitude),
      () => updateCoordinates(dhakaCenter.lat, dhakaCenter.lng)
    );
  }


  const handleMapClick = (e) => {
    updateCoordinates(e.latLng.lat(), e.latLng.lng());
  };




  return (
    isClient &&
    <div style={{ width: "100%", position: "relative" }}>
      <button style={{ bottom: "10px",  }} onClick={(e) => { LocateMe(e) }}>Locate📍</button>   <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={14}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        <Marker position={location} />
        <Marker position={location} />

      </GoogleMap>
    </div>
  );
};

export default MapPicker;
