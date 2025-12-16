import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 23.8103, lng: 90.4125 };

const RouteMap = ({ origin, destination }) => {
  const [directions, setDirections] = useState(null);


  useEffect(() => {

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions error:", status);
        }
      }
    );
  }, [origin, destination]);


  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin || defaultCenter}
      zoom={13}
    >
      {origin && <Marker position={origin} label="A" />}
      {destination && <Marker position={destination} label="D" />}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
