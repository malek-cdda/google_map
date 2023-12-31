import React, { useEffect, useState } from "react";
import { autoCompleteDeclare, streetViewDeclare } from "./autoFunction";

import { infoWindowDeclare, mapDeclare, markerDeclare } from "../map/map";
import axios from "axios";
import Rating from "react-rating";
import Link from "next/link";

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
  const [unique, setUnique] = useState<any>([]);

  useEffect(() => {
    setUnique([]);
    nearBy.map((item: any) => {
      axios
        .get(`http://localhost:3000/api/map?placeId=${item.place_id}`)
        .then((res) => {
          setPlaceData((prev: any) => [...prev, res?.data?.result?.result]);
        });
    });
  }, [nearBy]);
  // console.log(placeData);
  // console.log(nearBy);
  // console.log(placeData);
  // console.log(
  //   `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AWU5eFgBueuOBi49CThcNCG20i5MwcVF0WfFJZJI7t1AGBYyZlZO4U4cQs55w2rZHqS9HbttHajV0PZDByUGdeMa4RrLKrW8gCgwHxQB56rSAPxQEuOtaSuZtq_T01L6cHh_32LtS2ox_iZVimWy5TZ0nqJdGi4baDoh7pnE9ZIePnOHbny1&key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs`
  // );

  useEffect(() => {
    // make a array of name and filter it
    const name = placeData.map((item: any) => item.name);
    // arranging the unique array data
    const placeDataValue = placeData.filter(
      (item: any, index: number) => !name.includes(item.name, index + 1)
    );
    setUnique(placeDataValue);
  }, [nearBy, placeData]);
  console.log(unique);
  const data = new Date();
  console.log(data.getUTCDate());
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
      <div className=" w-1/2 flex  flex-col space-y-5">
        {placeData.length > 0 &&
          unique?.map((item: any, index: number) => (
            <div
              key={index}
              className="group border shadow-md p-3 rounded-md flex justify-between w-full  relative ">
              <div className="w-60">
                <h1 className="font-bold text-[16px]">{item.name}</h1>
                <span className="text-gray-400 block">
                  {item.rating}{" "}
                  <Rating
                    readonly
                    placeholderRating={item.rating}
                    emptySymbol="far fa-star text-yellow-500"
                    fullSymbol="fas fa-star text-yellow-500"
                    placeholderSymbol={
                      <span className="fas fa-star text-yellow-600"></span>
                    }
                    fractions={2}
                  />{" "}
                  {item.user_ratings_total}
                </span>
                {/* time close open time  */}
                <span>{}</span>
                <span>{item?.formatted_address}</span>
                <div className="pt-2">
                  <Link
                    href={item?.website?.length > 0 ? item?.website : ""}
                    className="hover:underline hover:text-blue-500 pt-9 ">
                    Website{" "}
                  </Link>
                </div>
                <br />
              </div>
              <div className="w-40">
                {item?.photos?.length > 0 && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                      item?.photos[item?.photos?.length - 1]?.photo_reference
                    }&key=AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs`}
                    alt=""
                    width="100%"
                    height="150px"
                    className="rounded-md w-full h-40"
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoComplete;
