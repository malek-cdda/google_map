import React, { useEffect, useState } from "react";
import { autoCompleteDeclare, streetViewDeclare } from "./autoFunction";

import { infoWindowDeclare, mapDeclare, markerDeclare } from "../map/map";
import axios from "axios";

const AutoComplete = ({ autoComplete, streetView }: any) => {
  const [nearBy, setNearBy] = useState<any>([]);
  const [error, setError] = useState<any>(true);
  async function initMap() {
    const { map } = await mapDeclare("");
    const { infoWindow } = await infoWindowDeclare(map);
    const { marker } = await markerDeclare(map);
    streetView &&
      autoCompleteDeclare(marker, map, infoWindow, setError, setNearBy);
    streetView && streetViewDeclare(map, infoWindow, setError);
  }
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, setError, error]);
  const [placeData, setPlaceData] = useState<any>([]);
  useEffect(() => {
    // console.log(nearBy[0]);
    nearBy.map((item: any) => {
      // console.log(item?.opening_hours?.weekday_text?.length);
      // console.log(JSON.stringify(item.opening_hours, "hours", 24));
      axios
        .get(`http://localhost:3000/api/map?placeId=${item.place_id}`)
        .then((res) => {
          setPlaceData((prev: any) => [...prev, res?.data?.result?.result]);
        });
    });
  }, [nearBy]);
  console.log(placeData);
  // console.log(
  //   `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AWU5eFgBueuOBi49CThcNCG20i5MwcVF0WfFJZJI7t1AGBYyZlZO4U4cQs55w2rZHqS9HbttHajV0PZDByUGdeMa4RrLKrW8gCgwHxQB56rSAPxQEuOtaSuZtq_T01L6cHh_32LtS2ox_iZVimWy5TZ0nqJdGi4baDoh7pnE9ZIePnOHbny1&key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs`
  // );
  return (
    <div className="container mx-auto">
      <div className={`grid  ${!error ? "grid-cols-1" : "grid-cols-2"}`}>
        <div>
          {streetView && (
            <> {error && <div id="pano" className="h-[500px] w-full"></div>} </>
          )}
        </div>
        <div className="relative">
          {autoComplete && (
            <input
              id="pac-input"
              className="controls   absolute top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-1/2  px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  "
              type="text"
              placeholder="Search Box"
            />
          )}
          <div className="h-[500px]" id="map"></div>
        </div>
      </div>
      {nearBy.length > 0 && (
        <h1 className="text-5xl text-center border py-3 px-4 my-5 capitalize rounded-md font-bold">
          restaurant
        </h1>
      )}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {nearBy.map((item: any, index: number) => (
          <div key={index} className="border shadow-md p-3 rounded-md">
            <h1 className="font-bold text-[16px]">{item.name}</h1>
            <img src={item?.icon} alt="loading..." />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
