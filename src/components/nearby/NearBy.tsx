"use client";
import { useEffect, useState } from "react";
import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import { autoCompleteDeclare } from "@/components/fieldmap/auto";
import { NearbyCard } from "./NearByCard";
import { placeFetch } from "./nearByFunction";
let panorama: google.maps.StreetViewPanorama;
const NearBy = ({ apiKey = "", autoComplete = false }: any) => {
  const [error, setError] = useState(false);
  let [astor, setAstor] = useState({ lat: -33.91722, lng: 151.23064 });
  const [placeId, setPlaceId] = useState("");
  const [nearByData, setNearByData] = useState<any>([]);
  const [streetView, setStreetView] = useState(true);
  useEffect(() => {
    async function initMap() {
      let { map } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      autoCompleteDeclare(marker, map, infoWindow, setAstor, setPlaceId);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, apiKey, error, astor]);
  const [placeData, setPlaceData] = useState<any>({});
  useEffect(() => {
    // placeId Fetch for place nearbydATA
    placeFetch(placeId, setPlaceData);
  }, [placeId]);
  const [nearValue, setNearValue] = useState<any>("");
  const handleNearbySearch = (e: any) => {
    setNearValue(e.target.value);
  };
  let token = "";
  // type=restaurant&keyword=restaurant
  useEffect(() => {
    fetch(
      `/api?token=${token}&lat=${placeData?.geometry?.location?.lat}&lng=${placeData?.geometry?.location?.lng}&type=${nearValue}&keyword=${nearValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNearByData(data?.result?.results);
      });
  }, [
    nearValue,
    placeData?.geometry?.location?.lat,
    placeData?.geometry?.location?.lng,
    token,
  ]);

  return (
    <div>
      <div className="flex justify-center gap-10 container mx-auto">
        <div className="w-full  rounded-md">
          <div className="flex space-x-3">
            <input
              id="pac-input"
              className={` border   z-50 py-2 px-4 rounded-full  outline-none placeholder:text-black focus:rounded-b-none focus:rounded-t-2xl   w-full `}
              type="text"
              placeholder="Search Your Nearby place"
            />
            <select
              onChange={handleNearbySearch}
              className="border rounded-full px-3">
              <option value="">All</option>
              <option value="restaurant">Restaurant</option>
              <option value="hospital">Hospital</option>
              <option value="school">School</option>
              <option value="bank">Bank</option>
              <option value="atm">ATM</option>
              <option value="park">Park</option>
              {/* <option value="bus_station">Bus Station</option> */}
            </select>
          </div>

          <div className="h-[600px] w-full rounded-r-md hidden " id="map"></div>
        </div>
      </div>
      <div className="container mx-auto"></div>
      <div className="py-5   container mx-auto px-2 my-2 rounded-md grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
        {nearByData.map((item: any, index: any) => (
          <NearbyCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default NearBy;
