import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const defaultCenter = {
    lat: 23.8103, // Default: Dhaka, Bangladesh
    lng: 90.4125,
};

const MapPicker = ({ onCoordinateSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

    const handleMapClick = (event) => {
        const newLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setSelectedLocation(newLocation);
        onCoordinateSelect(newLocation); // Pass coordinates to parent
    };

    return (
        <LoadScript googleMapsApiKey={"108437942063504296828"}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation}
                zoom={12}
                onClick={handleMapClick}
            >
                <Marker position={selectedLocation} draggable={true} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapPicker;
