import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import React, { memo, use, useEffect, useState } from "react";
import { autoCompleteDeclare, markerDraggable } from "../autoComplete";
import { haversine } from "@/components/haversine/Haversine";
import { customScript } from "@/components/hooks/script";
import { dragAble } from "@/components/autoCompleteField/autoCompleteFunction";

const AutoComplete = () => {
  const [add, setAdd] = useState<number>(1);
  const [astor, setAstor] = useState({ lat: 40.7128, lng: -74.006 });
  const [placeNames, setPlaceNames] = useState(Array(1).fill(""));
  const [placeName, setPlaceName] = useState<any>({});
  const [markerLatLng, setMarkerLatLng] = useState([
    { lat: 40.7128, lng: -74.006 },
  ]);
  const [draggablePlace, setDraggablePlace] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [latLng, setLatLng] = useState<any>([]);
  useEffect(() => {
    const script = customScript();
    script.onload = initializeMap;
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const initializeMap = async () => {
    const { map, marker } = await mapDeclare(astor);

    setMap(map);
    setMarker(marker);
  };

  // ?!autocomplete search place code function
  useEffect(() => {
    const handleAddedSearchField = async (
      placeNames: any,
      setPlaceNames: any
    ) => {
      const data = Array.from({ length: add }).map((_, index) => {
        const input: any =
          document.getElementsByClassName("searchInput")[index];
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);
        autocomplete.addListener("place_changed", async () => {
          // marker.setVisible(false);
          const place: any = autocomplete.getPlace();
          // const { AdvancedMarkerElement, PinElement } = marker;
          if (!place.geometry) {
            window.alert(
              "No details available for input: '" + place.name + "'"
            );
            return;
          }
          setLatLng((prev: any) => {
            const newLatLng = [...prev];
            newLatLng[index] = {
              lat: place.geometry.location.lat() + 0.0018018,
              lng: place.geometry.location.lng() + 0.0018018,
            };
            return newLatLng;
          });

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          const updatedPlaceNames = [...placeNames]; // Create a copy of placeNames
          updatedPlaceNames[index] = place?.formatted_address;
          setPlaceNames(updatedPlaceNames);
          // displayDistance();
        });
        return placeNames[index];
      });

      return data;
      // displayDistance();
    };
    // try to make a marker in the function

    if (map && marker) {
      handleAddedSearchField(placeNames, setPlaceNames);
    }
    localStorage.setItem("latLng", JSON.stringify(latLng));
  }, [map, add, placeNames, setPlaceNames, marker, latLng]);

  // ?! distance marker draggable for place and route changing system function

  function displayDistance() {
    const directionsService = new google.maps.DirectionsService();
    const panel = document.getElementById("panel") as HTMLElement;
    const directionsRenderers: any = [];
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: false,
      map,
      panel: panel as HTMLElement,
      // suppressMarkers: true,
      markerOptions: {
        draggable: false,
      },
      polylineOptions: {
        strokeColor: "green",
      },
    });
    const rendererId = "myRendererId";
    directionsRenderers.push({
      id: rendererId,
      renderer: directionsRenderer,
    });

    directionsRenderer.addListener("directions_changed", () => {
      const directions: any = directionsRenderer.getDirections();
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
        .catch((e: any) => {
          // alert("Could not display directions due to: " + e);
        });
    }

    function computeTotalDistance(result) {
      let total = 0;
      const myroute = result.routes[0];

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
  }
  useEffect(() => {
    if (map) {
      displayDistance();
    }
  }, [placeNames, map]);
  const handleDelete = (index: number) => {
    const newPlaceNames = [...placeNames];
    newPlaceNames.splice(index, 1);
    setPlaceNames(newPlaceNames);
    setAdd(add - 1);
  };
  return (
    <div className="container mx-auto">
      {/* <div id="panel"></div> */}
      <div id="map" className="  h-[400px]  "></div>
      <div className="flex w-full justify-between gap-3">
        <div className="w-full">
          {Array.from({ length: add }).map((_, index) => (
            <div key={index} className="flex items-center ">
              <input
                id={`multi-${index}`}
                className={`searchInput controls border-2 border-gray-500 w-full h-10 mb-2 rounded-full px-3 py-2`}
                placeholder={`Search for place ${index + 1}`}
                // className="controls border-2 border-gray-500 w-full h-10 mb-2 rounded-full px-3 py-2  "
                type="text"
              />
              <button
                className="bg-red-700 py-2 px-7 rounded-full text-white w-32 h-12 my-2 mx-2"
                onClick={() => {
                  handleDelete(index);
                }}>
                Delete
              </button>
            </div>
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
      <div className="flex flex-col my-5"></div>
    </div>
  );
};

export default AutoComplete;
