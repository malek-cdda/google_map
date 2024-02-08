import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import React, { memo, use, useEffect, useState } from "react";
import { autoCompleteDeclare, markerDraggable } from "../autoComplete";
import { haversine } from "@/components/haversine/Haversine";

const AutoComplete = () => {
  const [add, setAdd] = useState<number>(1);
  const [error, setError] = useState(false);
  const [astor, setAstor] = useState({ lat: 40.7128, lng: -74.006 });
  const [placeIds, setPlaceIds] = useState(Array(2).fill(""));
  const [placeNames, setPlaceNames] = useState(Array(1).fill(""));
  const [markerLatLng, setMarkerLatLng] = useState([
    { lat: 40.7128, lng: -74.006 },
  ]);
  const [draggablePlace, setDraggablePlace] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [maps, setMap] = useState<any>({});
  useEffect(() => {
    async function initMap() {
      let { map, AdvancedMarkerElement, PinElement } = await mapDeclare(astor);

      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      const inputs = Array.from({ length: add }, (_, i) =>
        document.getElementById(`multiple_inputs-${i}`)
      );
      setMap({ map, AdvancedMarkerElement, PinElement, infoWindow, marker });
      autoCompleteDeclare(
        map,
        infoWindow,
        placeNames,
        setPlaceNames,
        inputs,
        markerLatLng,
        setMarkerLatLng,
        setAstor
      );
      //  marker dragable for place and route cahnging system
      // markerDraggable(
      //   setMarkerLatLng,
      //   markerLatLng,
      //   map,
      //   PinElement,
      //   infoWindow,
      //   AdvancedMarkerElement,
      //   placeNames,
      //   setPlaceNames,
      //   setDraggablePlace
      // );
      // direction in two place

      const directionsService = new google.maps.DirectionsService();
      const panel = document.getElementById("panel") as HTMLElement;

      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: panel as HTMLElement,
        markerOptions: {
          draggable: true,

          label: "Karim",
        },
        polylineOptions: {
          strokeColor: "green",
        },
      });

      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        console.log(directions, "directions");
        if (directions) {
          computeTotalDistance(directions);
        }
      });
      displayRoute(
        placeNames[0],
        placeNames[placeNames?.length - 1],
        directionsService,
        directionsRenderer
      );
    }

    function displayRoute(origin, destination, service, display) {
      service
        .route({
          origin: origin,
          destination: destination,
          waypoints: placeNames
            ?.slice(1, placeNames.length - 1)
            .map((city) => ({ location: `${city}` })),
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true,
        })
        .then((result) => {
          display.setDirections(result);
        })
        .catch((e) => {
          // alert("Could not display directions due to: " + e);
        });
    }

    function computeTotalDistance(result) {
      let total = 0;
      const myroute = result.routes[0];
      console.log(result, "result");
      if (!myroute) {
        return;
      }
      let value: any = [];
      for (let i = 0; i < myroute.legs.length; i++) {
        value.push({
          distance: myroute.legs[i].distance.value / 1000,
          place: placeNames[i + 1],
        });
        total += myroute.legs[i].distance.value;
      }

      total = total / 1000;
    }

    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [astor, placeIds, placeNames, add, markerLatLng, setDraggablePlace]);

  return (
    <div className="container mx-auto">
      {/* <div id="panel"></div> */}
      <div id="map" className="  h-[400px]  "></div>
      <div className="flex w-full justify-between gap-3">
        <div className="w-full">
          {Array.from({ length: add }).map((_, index) => (
            <input
              key={index}
              id={`multiple_inputs-${index}`}
              placeholder={`Search for place ${index + 1}`}
              className="controls border-2 border-gray-500 w-full h-10 mb-2 rounded-full px-3 py-2  "
              type="text"
            />
          ))}
        </div>
        <button
          className="bg-blue-700 py-2 px-7 rounded-full text-white w-32 h-12"
          onClick={(e) => {
            setAdd(add + 1);
          }}>
          + Add{" "}
        </button>
      </div>
      <div className="flex flex-col my-5">
        {placeNames.map((item, index) => (
          <span key={index}>Name : {item}</span>
        ))}
      </div>
    </div>
  );
};

export default memo(AutoComplete);
