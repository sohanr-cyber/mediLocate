"use client";

import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"]; // choose ONCE

export default function GoogleMapsProvider({ children }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyC-RFV9uSyN3xiACUzFm2nfM9mnU2i69g0",
        libraries,
    });

    if (!isLoaded) return null;

    return children;
}
