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
      const input = document.getElementById("pac-input") as HTMLInputElement;

      autoCompleteDeclare(marker, map, infoWindow, setAstor, setPlaceId, input);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, apiKey, error, astor]);
  const [placeData, setPlaceData] = useState<any>({});
  const [token, setToken] = useState<any>("");
  const [nextToken, setNextToken] = useState<any>("");
  useEffect(() => {
    // placeId Fetch for place nearbydATA
    setNearByData([]);
    setNextToken("");
    setToken("");
    placeFetch(placeId, setPlaceData);
  }, [placeId]);
  const [nearValue, setNearValue] = useState<any>("");
  const handleNearbySearch = (e: any) => {
    setToken("");
    setNextToken("");
    setNearByData([]);
    setNearValue(e.target.value);
  };

  // type=restaurant&keyword=restaurant
  useEffect(() => {
    fetch(
      `/api?token=${token}&lat=${placeData?.geometry?.location?.lat}&lng=${placeData?.geometry?.location?.lng}&type=${nearValue}&keyword=${nearValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNextToken(data?.result?.next_page_token);
        setNearByData((prev: any) => [...prev, ...data?.result?.results]);
      });
  }, [
    nearValue,
    placeData?.geometry?.location?.lat,
    placeData?.geometry?.location?.lng,
    token,
  ]);

  class haversineFormula {
    constructor() {}
    radiansMethod(degrees: any) {
      return (degrees * Math.PI) / 180;
    }
    haversineDistance(obj1: any, obj2: any) {
      //         a = sin²(φB - φA/2) + cos φA * cos φB * sin²(λB - λA/2)
      // c = 2 * atan2( √a, √(1−a) )
      // d = R ⋅ c
      // here φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km)
      const [lng1, lat1] = obj1;
      const [lng2, lat2] = obj2;
      const phi_1 = this.radiansMethod(lat1);
      const phi_2 = this.radiansMethod(lat2);
      const deltaPhi = this.radiansMethod(lat2 - lat1);
      const deltaLamda = this.radiansMethod(lng2 - lng1);
      const radius = 6371; // radius in km
      const formula =
        Math.pow(Math.sin(deltaPhi / 2), 2) +
        Math.cos(phi_1) *
          Math.cos(phi_2) *
          Math.pow(Math.sin(deltaLamda / 2), 2);
      const c = 2 * Math.atan2(Math.sqrt(formula), Math.sqrt(1 - formula));
      const d = radius * c;
      return d;
    }
  }
  const haversine = new haversineFormula();
  console.log(placeData, "placeData");
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-10 ">
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
          <NearbyCard
            key={index}
            item={item}
            haversine={haversine}
            astor={astor}
          />
        ))}
      </div>
      <div className="text-left flex justify-end">
        {nextToken && (
          <button
            onClick={() => setToken(nextToken)}
            className="rounded-lg bg-blue-400 py-2 px-2 text-white font-semibold hover:bg-blue-300 w-full mb-5">
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};
export default NearBy;
