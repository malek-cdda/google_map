"use client";
import { memo, useEffect, useState } from "react";
import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import { autoCompleteDeclare } from "@/components/fieldmap/auto";
import { AutoCompletePage } from "./AutoFullAddress";
import { dragAble } from "./autoCompleteFunction";

const AutoCompleteField = ({
  autoComplete = true,
  streetView,
  setStreetView,
  mapView,
  setMapView,
  autoCompleteFieldToggle,
  setAutoCompleteFieldToggle,
  setMarkerToggle,
  markerToggle,
}: any) => {
  const [error, setError] = useState(false);
  let [astor, setAstor] = useState({ lat: 40.7128, lng: -74.006 });

  const [placeData, setPlaceData] = useState<any>({});

  useEffect(() => {
    async function initMap() {
      let { map, AdvancedMarkerElement } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      const input = document.querySelector<HTMLInputElement>(".pac-input");
      autoCompleteDeclare(
        marker,
        map,
        infoWindow,
        setAstor,
        setPlaceData,
        input
      );
      // streetView && streetViewDeclare(map, infoWindow, setError);
      // map.addListener("click", (e: any) => {
      //   setAstor({
      //     lat: e.latLng?.lat() as number,
      //     lng: e.latLng?.lng() as number,
      //   });
      // });
      // dragble for place and route cahnging system
      markerToggle &&
        dragAble(
          map,
          infoWindow,
          AdvancedMarkerElement,
          setPlaceData,
          setAstor,
          astor,
          input
        );

      // view sreet for using this function you have to make streetView true
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano") as any,
        {
          position: astor,
          pov: {
            heading: 265,
            pitch: 0,
          },
          disableDefaultUI: true,
          controlSize: 0,
        }
      );
      panorama.addListener("position_changed", (e: any) => {
        const panoramaPosition = panorama.getPosition();
      });

      map.setStreetView(panorama);
      // // map.getStreetView();
      panorama.setPosition(astor);
      const svService = new google.maps.StreetViewService();
      // Check if Street View is available at the specified location
      svService.getPanorama({ location: astor, radius: 50 }, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          setError(false);
        } else {
          // Street View is not available at this location
          setError(true);
        }
      });
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, error, astor, markerToggle]);

  const handleStreetView = (e: any) => {
    setStreetView(!streetView);
  };
  useEffect(() => {
    if (placeData?.formatted_address) {
      const inputValue = document.getElementById(
        "pac-input"
      ) as HTMLInputElement;
      inputValue.value = placeData?.formatted_address;
    }
  }, [placeData?.formatted_address]);
  return (
    <div className="container mx-auto">
      <div id="control"></div>
      <div className="flex justify-center gap-10  ">
        <div className="w-full  rounded-md">
          <div className="flex w-full">
            {streetView && (
              <>
                {!error && (
                  <>
                    <div
                      id="pano"
                      className="h-[600px] w-full rounded-l-md"></div>
                  </>
                )}
              </>
            )}
            <div
              className={`h-[600px] w-full rounded-r-md ${
                !mapView && "hidden"
              } `}
              id="map"></div>
          </div>
        </div>
      </div>
      {/* Street view button div  */}
      <div className=" flex gap-4 py-2">
        <div>
          <label className="  ">
            <input
              type="checkbox"
              value=""
              className=" r"
              checked={streetView}
              onChange={(e) => {
                handleStreetView(e);
              }}
            />
            <span className="ms-3 text-sm font-medium text-black    ">
              Street view
            </span>
          </label>
        </div>
        {/* Map view button div  */}
        <div>
          <label className=" ">
            <input
              type="checkbox"
              value=""
              className=" "
              checked={mapView}
              onChange={(e) => {
                setMapView(!mapView);
              }}
            />
            <span className="ms-3 text-sm font-medium text-black    ">
              Map view
            </span>
          </label>
        </div>
        {/* Auto complete address Field button */}
        <div>
          <label className=" ">
            <input
              type="checkbox"
              value=""
              className=" "
              checked={autoCompleteFieldToggle}
              onChange={(e) => {
                setAutoCompleteFieldToggle(!autoCompleteFieldToggle);
              }}
            />
            <span className="ms-3 text-sm font-medium text-black    ">
              Auto Complete address Field
            </span>
          </label>
        </div>
        {/* Marker Move able button div  */}
        <div>
          <label className=" ">
            <input
              type="checkbox"
              value=""
              className=" "
              checked={markerToggle}
              onChange={(e) => {
                setMarkerToggle(!markerToggle);
              }}
            />
            <span className="ms-3 text-sm font-medium text-black    ">
              Marker Move able
            </span>
          </label>
        </div>
      </div>
      <div className="relative">
        {autoComplete && (
          <input
            id="pac-input"
            className=" pac-input border    z-50 py-2 px-4 rounded-full  outline-none placeholder:text-black focus:rounded-b-none focus:rounded-t-2xl  2  w-full "
            type="text"
            placeholder="Search Google Maps"
            onChange={(e) => {}}
            // value={placeName || ""}
          />
        )}
      </div>
      <div className="container mx-auto">
        {placeData?.formatted_address && (
          <AutoCompletePage placeData={placeData} />
        )}
      </div>
      <div className="py-5   container mx-auto px-2 my-2 rounded-md grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2"></div>
    </div>
  );
};
export default memo(AutoCompleteField);
