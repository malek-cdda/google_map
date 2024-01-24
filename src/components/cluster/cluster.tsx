"use client";
import Script from "next/script";
import { useEffect } from "react";

import { infoWindowDeclare, mapDeclare } from "../mapFunction/map";
import { clusterCustom } from "./clusterFunction";

const Cluster = ({}: any) => {
  useEffect(() => {
    async function initMap() {
      const { AdvancedMarkerElement, PinElement, map } = await mapDeclare({
        lat: 34.8791806,
        lng: -111.8265049,
      });
      const { infoWindow } = await infoWindowDeclare(map);

      clusterCustom(AdvancedMarkerElement, map, PinElement, infoWindow);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, []);

  return (
    <div>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs&callback=initMap&libraries=places&v=weekly"
        defer></Script>
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
      <div id="map" className="h-[500px]"></div>
      <div id="pano" className="h-[300px] w-full"></div>
    </div>
  );
};

export default Cluster;
