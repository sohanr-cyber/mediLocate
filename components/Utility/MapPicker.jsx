import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/redux/notistackSlice";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const dhakaCenter = {
  lat: 23.8103,
  lng: 90.4125,
};

const MapPicker = ({ onCoordinateSelect, selectedLocation, setSelectedLocation }) => {
  ;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  // Detect User Location on Load
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateCoordinates(latitude, longitude);
          setLoading(false);
        },
        () => {
          // If user denies location, fall back to Dhaka
          updateCoordinates(dhakaCenter.lat, dhakaCenter.lng);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      updateCoordinates(dhakaCenter.lat, dhakaCenter.lng);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    selectedLocation.lat && updateCoordinates(selectedLocation.lat, selectedLocation.lng)
  }, [selectedLocation])

  // Function to update coordinates and pan to location
  const updateCoordinates = useCallback(
    (lat, lng) => {
      const newLocation = { lat, lng };
      setSelectedLocation(newLocation);

      if (mapRef.current) {
        mapRef.current.panTo(newLocation);
      }

      // dispatch(
      //   showSnackBar({
      //     message: `Coordinates Selected: ${newLocation.lat}, ${newLocation.lng}`,
      //   })
      // );

      if (onCoordinateSelect) {
        onCoordinateSelect(newLocation);
      }
    },
    [onCoordinateSelect, dispatch]
  );

  // Map click handler
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    updateCoordinates(lat, lng);
  };

  // Marker drag handler
  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    updateCoordinates(lat, lng);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC-RFV9uSyN3xiACUzFm2nfM9mnU2i69g0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={selectedLocation || dhakaCenter}
        zoom={12}
        onClick={handleMapClick}
        onLoad={(map) => (mapRef.current = map)}
      >
        {!loading && selectedLocation && (
          <Marker
            position={selectedLocation}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPicker;
