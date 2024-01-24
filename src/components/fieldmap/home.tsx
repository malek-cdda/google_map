import Script from "next/script";
import { useEffect, useState } from "react";
import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "../mapFunction/map";
import { autoCompleteDeclare, streetViewDeclare } from "./auto";
import Image from "next/image";
let panorama: google.maps.StreetViewPanorama;
export const AutoComplete = ({ apiKey = "", autoComplete = false }: any) => {
  const [error, setError] = useState(false);
  let [astor, setAstor] = useState({ lat: -33.91722, lng: 151.23064 });
  const [placeId, setPlaceId] = useState("");
  const [nearByData, setNearByData] = useState<any>([]);
  const [streetView, setStreetView] = useState(false);
  useEffect(() => {
    async function initMap() {
      let { map } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      autoComplete &&
        autoCompleteDeclare(marker, map, infoWindow, setAstor, setPlaceId);
      // streetView && streetViewDeclare(map, infoWindow, setError);
      map.addListener("click", (e: any) => {
        setAstor({
          lat: e.latLng?.lat() as number,
          lng: e.latLng?.lng() as number,
        });
      });

      // view sreet for using this function you have to make streetView true
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano") as HTMLElement,
        {
          position: astor,
          pov: {
            heading: 34,
            pitch: 10,
          },
          disableDefaultUI: true,
        }
      );
      // streetview set here
      map.setStreetView(panorama);
      const svService = new google.maps.StreetViewService();
      // Check if Street View is available at the specified location
      svService.getPanorama({ location: astor, radius: 50 }, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          setError(false);
        } else {
          // Street View is not available

          setError(true);
        }
      });
      // find place data for fatching
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, apiKey, error, astor]);
  const [placeData, setPlaceData] = useState<any>({});
  useEffect(() => {
    async function placeFetch() {
      fetch(`http://localhost:3000/api/placeapi?placeId=${placeId}`)
        .then((response) => response.json())
        .then((data) => {
          setPlaceData(data.result.result);
        });
    }
    placeFetch();
  }, [placeId]);
  const [nearValue, setNearValue] = useState<any>("");
  const handleNearbySearch = (e: any) => {
    setNearValue(e.target.value);
  };
  let token = "";
  // type=restaurant&keyword=restaurant
  useEffect(() => {
    fetch(
      `http://localhost:3000/api?token=${token}&lat=${placeData?.geometry?.location?.lat}&lng=${placeData?.geometry?.location?.lng}&type=${nearValue}&keyword=${nearValue}`
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
        {placeData?.name && (
          <div className=" w-1/2">
            {" "}
            {placeData?.name && (
              <PlaceDetails
                placeData={placeData}
                handleNearbySearch={handleNearbySearch}
              />
            )}
          </div>
        )}
        <div className="w-full  rounded-md">
          <div className="relative">
            {autoComplete && (
              <input
                id="pac-input"
                className={` border absolute  top-2   z-50 py-2 px-4 rounded-full  outline-none placeholder:text-black focus:rounded-b-none focus:rounded-t-2xl  ${
                  streetView && !error
                    ? "right-10 w-[400px]"
                    : "left-1/2 -translate-x-1/2 w-[500px]"
                } `}
                type="text"
                placeholder="Search Google Maps"
              />
            )}
            {autoComplete && (
              <label className=" absolute z-50   inline-flex items-center cursor-pointer rounded-full top-3 left-3 bg-white pr-5">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={(e) => {
                    setStreetView(!streetView);
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-black    ">
                  street view
                </span>
              </label>
            )}
          </div>

          <div className="flex w-full">
            {streetView && (
              <>
                {!error && (
                  <div
                    id="pano"
                    className="h-[600px] w-full rounded-l-md"></div>
                )}
              </>
            )}

            <div className="h-[600px] w-full rounded-r-md" id="map"></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <AutoCompletePage placeData={placeData} />
      </div>
      <div className="py-5   container mx-auto px-2 my-2 rounded-md grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
        {nearByData.map((item: any, index: any) => (
          <NearbyCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const PlaceDetails = ({ placeData, handleNearbySearch }: any) => {
  return (
    <div className="">
      {/* <h1>{placeData.formatted_address}</h1>
    <h1>{placeData.formatted_phone_number}</h1> */}

      <Image
        alt="loading"
        width={1000}
        height={1000}
        className="  w-full object-cover rounded-md border"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
          placeData?.photos?.length && placeData?.photos[0]?.photo_reference
        }&key=${process.env.NEXT_PUBLIC_API_KEY}`}
      />
      <div className="py-3">
        <div className="flex justify-between items-center">
          <span className="  capitalize   rounded-md font-bold">nearby</span>
          <select
            onChange={handleNearbySearch}
            className="capitalize border rounded-md py-2 px-2">
            <option value="resturant">resturant</option>
            <option value="school">school</option>
            <option value="lodging">hotel</option>
            <option value="bar">Bar</option>
          </select>
        </div>
        <div className="py-3 capitalize font-semibold">
          <h1>name : {placeData?.name}</h1>
        </div>
      </div>
    </div>
  );
};

const NearbyCard = ({ item }: any) => {
  return (
    <div className="flex justify-between items-center border rounded-md     gap-3">
      <div className="py-2 px-3 space-y-2">
        <span className="text-sm font-bold">name {item?.name}</span>
        <div className="space-x-3">
          <span className="text-sm font-bold ">{item.rating}</span>
          <span className="text-sm  ">ratingstar</span>
          <span className="text-sm font-bold ">
            ({item?.user_ratings_total})
          </span>
        </div>
        <span className="text-sm  ">{item?.vicinity}</span>
      </div>
      <div>
        <Image
          alt="loading"
          width={1000}
          height={1000}
          className="h-[150px] w-[150px]  object-cover rounded-md border"
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
            item?.photos?.length && item?.photos[0]?.photo_reference
          }&key=${process.env.NEXT_PUBLIC_API_KEY}`}
        />
      </div>
    </div>
  );
};

const AutoCompletePage = ({ placeData }: any) => {
  return (
    <div>
      {placeData?.name && (
        <div className="mt-1 flex justify-between flex-wrap">
          {placeData?.address_components.map((item: any, index: any) => (
            <>
              {item?.types?.includes("apt") && (
                <Label item={item} name="Apt suit" />
              )}
              {item?.types?.includes("route") && (
                <Label item={item} name="Street Name" />
              )}
              {item?.types?.includes("street_number") && (
                <Label item={item} name="Street Number" />
              )}
              {item?.types?.includes("country") && (
                <Label item={item} name="Street Number" />
              )}
              {item?.types?.includes("locality") && (
                <Label item={item} name="Street Number" />
              )}
              {item?.types?.includes("postal_code") && (
                <Label item={item} name="Street Number" />
              )}
              {item?.types?.includes("administrative_area_level_1") && (
                <Label item={item} name="Street Number" />
              )}
            </>
          ))}
          <Label item={placeData?.geometry?.location?.lat} name="Latitude" />
          <Label item={placeData?.geometry?.location?.lng} name="Longitude" />
        </div>
      )}
    </div>
  );
};

const Label = ({ item, name }: any) => {
  return (
    <div className="w-full md:w-[20%]">
      <label
        htmlFor="apt_suite"
        className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        name="apt_suite"
        type="text"
        id="apt_suite"
        className="px-2 block disabled:bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm outline-none border py-2"
        placeholder=""
        value={item?.long_name ? item?.long_name : item}
        readOnly
      />
    </div>
  );
};
