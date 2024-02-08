import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import React, { useEffect, useState } from "react";
import { autoCompleteDeclare } from "../autoComplete";

const AutoComplete = () => {
  const [add, setAdd] = useState<number>(1);
  const [error, setError] = useState(false);
  const [astor, setAstor] = useState({ lat: 40.7128, lng: -74.006 });
  const [placeIds, setPlaceIds] = useState(Array(2).fill(""));
  const [placeNames, setPlaceNames] = useState(Array(2).fill(""));

  useEffect(() => {
    async function initMap() {
      let { map, AdvancedMarkerElement } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);

      const inputs = Array.from({ length: add }, (_, i) =>
        document.getElementById(`multiple_inputs-${i}`)
      );
      //   autoCompleteDeclare(marker, map, infoWindow, setAstor, setPlaceId, input);
      async function autoCompleteDeclare(inputs: any) {
        const options = {
          fields: [
            "address_components",
            "geometry",
            "icon",
            "name",
            "place_id",
            "formatted_address",
          ],
          strictBounds: false,
        };

        inputs.forEach((input: any, index: any) => {
          const autocomplete = new google.maps.places.Autocomplete(
            input,
            options
          );
          autocomplete.bindTo("bounds", map);
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log(place);
            if (!place.geometry || !place.geometry.location) {
              return;
            }
            const newPlaceIds = [...placeIds];
            const newPlaceNames = [...placeNames];
            newPlaceIds[index] = place.place_id;
            newPlaceNames[index] = place?.formatted_address;
            setPlaceIds(newPlaceIds);
            setPlaceNames(newPlaceNames);
          });
        });
      }
      autoCompleteDeclare(inputs);
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [astor, placeIds, placeNames, add]);
  console.log(placeIds, placeNames, "placeIds");
  return (
    <div className="container mx-auto">
      <div id="map" className="w-[300px] h-[400px] hidden"></div>
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
    </div>
  );
};

export default AutoComplete;
