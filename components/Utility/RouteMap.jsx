import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";

const defaultContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 23.8103, lng: 90.4125 };

const RouteMap = ({ origin, destination, containerStyle }) => {
  const [directions, setDirections] = useState(null);


  useEffect(() => {
    if (!origin || !destination) {
      console.warn("Origin or destination missing");
      return;
    }


    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
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
      mapContainerStyle={containerStyle || defaultContainerStyle}
      center={origin || defaultCenter}
      zoom={13}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {origin && <Marker position={origin} label="A" />}
      {destination && <Marker position={destination} label="D" />}

      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
