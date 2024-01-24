"use client";
import { useEffect, useState } from "react";

import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import { autoCompleteDeclare } from "@/components/fieldmap/auto";
import { circleArea, mapFullArea, markerCustom } from "./OwnPropertyFunction";
import { propertyData } from "./propertyData";
import PropertyCard from "./PropertyCard";

const OwnProperty = ({ apiKey = "", autoComplete = false }: any) => {
  let [astor, setAstor] = useState({ lat: 30.788872, lng: -83.019038 });
  const [placeId, setPlaceId] = useState("");
  const [circle, setCircle] = useState<any>({});
  const [value, setValue] = useState<any>("fullMap");
  useEffect(() => {
    async function initMap() {
      let { map, AdvancedMarkerElement, PinElement } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      autoCompleteDeclare(marker, map, infoWindow, setAstor, setPlaceId);
      // Assuming 'map' is your Google Map object
      // Add an event listener for the 'idle' event

      document
        .getElementById("selectRadius")
        ?.addEventListener("change", (e: any) => {
          let values = e.target.value;
          e.target.value == "fullMap" && mapFullArea(map, setCircle);
          e.target.value == "radius" && circleArea(map, setCircle);
          // map.addListener("drag", (e: any) => {
          //   console.log(e);
          //   values == "fullMap" && mapFullArea(map, setCircle);
          //   values == "radius" && circleArea(map, setCircle);
          // });
          // map.addListener("zoom_changed", (e: any) => {
          //   console.log(e);
          //   values == "fullMap" && mapFullArea(map, setCircle);
          //   values == "radius" && circleArea(map, setCircle);
          // });
        });

      // specificarea to show product
      // circleArea(map, setCircle);
      // product base marker show
      markerCustom(
        AdvancedMarkerElement,
        map,
        propertyData,
        PinElement,
        infoWindow
      );
      // drag for show product data
      map.addListener("drag", (e: any) => {
        // value == "fullMap" && mapFullArea(map, setCircle);
        // value == "radius" && circleArea(map, setCircle);
        mapFullArea(map, setCircle);
      });
      // zoom for change product data
      map.addListener("zoom_changed", (e: any) => {
        // value == "fullMap" && mapFullArea(map, setCircle);
        // value == "radius" && circleArea(map, setCircle);
        mapFullArea(map, setCircle);
      });
      // click for change product data
      map.addListener("click", (e: any) => {
        // circleArea(map, setCircle);
      });
      //   findPropertyMe(map, setPlaceId);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [autoComplete, apiKey, astor]);

  const [propertyAllData, setPropertyAllData] = useState<any>([]);

  useEffect(() => {
    if (placeId || circle?.highestLatitude) {
      setPropertyAllData(
        propertyData?.filter(
          (item: any) =>
            circle?.highestLatitude >= item?.position?.lat &&
            circle?.lowestLatitude <= item?.position?.lat &&
            circle?.highestLongitude >= item?.position?.lng &&
            circle.lowestLongitude <= item?.position?.lng
        )
      );
    } else {
      setPropertyAllData(propertyData);
    }
  }, [circle, placeId]);
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className="container mx-auto  ">
      <div className="flex gap-3 pb-4">
        <input
          id="pac-input"
          className={` border   z-50 py-2 px-4 rounded-full  outline-none placeholder:text-black     w-full `}
          type="text"
          placeholder="Search Your your property area"
        />
        <select
          className="border rounded-full px-3"
          onChange={handleChange}
          id="selectRadius">
          <option value="fullMap" defaultValue="fullMap">
            Full Map
          </option>
          <option value="radius" className="group ">
            Radius
          </option>
          {/* <input className="group-hover:block" /> */}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="h-screen  w-3/4 " id="map"></div>
        <div className="w-1/2 grid grid-cols-2 gap-4 overflow-y-auto h-screen ">
          {propertyAllData.map((item: any, index: any) => (
            <PropertyCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default OwnProperty;
