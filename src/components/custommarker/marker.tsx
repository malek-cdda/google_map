"use client";
import Script from "next/script";
import { useEffect } from "react";
import { markerCustom } from "./markerFunction";
import { infoWindowDeclare, mapDeclare } from "../mapFunction/map";

const Marker = ({ apiKey, marker = false }: any) => {
  useEffect(() => {
    async function initMap() {
      const { AdvancedMarkerElement, PinElement, map } = await mapDeclare({
        lat: 34.8791806,
        lng: -111.8265049,
      });
      const { infoWindow } = await infoWindowDeclare(map);
      marker &&
        markerCustom(AdvancedMarkerElement, map, PinElement, infoWindow);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [marker]);

  return (
    <div>
      <div id="map" className="h-[500px]"></div>
      <div id="pano" className="h-[300px] w-full"></div>
    </div>
  );
};

export default Marker;
