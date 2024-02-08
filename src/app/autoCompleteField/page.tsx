"use client";
import AutoCompleteField from "@/components/autoCompleteField/AutoCompleteField";
import { useState } from "react";

const Home = () => {
  const [streetView, setStreetView] = useState(true);
  const [mapView, setMapView] = useState(true);
  const [autoCompleteFieldToggle, setAutoCompleteFieldToggle] = useState(true);
  const [markerToggle, setMarkerToggle] = useState(true);
  return (
    <AutoCompleteField
      autoComplete={true}
      streetView={streetView}
      setStreetView={setStreetView}
      mapView={mapView}
      setMapView={setMapView}
      autoCompleteFieldToggle={autoCompleteFieldToggle}
      setAutoCompleteFieldToggle={setAutoCompleteFieldToggle}
      setMarkerToggle={setMarkerToggle}
      markerToggle={markerToggle}
    />
  );
};

export default Home;
