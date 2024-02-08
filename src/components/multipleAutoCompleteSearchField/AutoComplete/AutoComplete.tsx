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
  const [markerLatLng, setMarkerLatLng] = useState([
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.7128, lng: -74.008 },
  ]);
  useEffect(() => {
    async function initMap() {
      let { map, AdvancedMarkerElement } = await mapDeclare(astor);
      const { infoWindow } = await infoWindowDeclare(map);
      const { marker } = await markerDeclare(map);
      const inputs = Array.from({ length: add }, (_, i) =>
        document.getElementById(`multiple_inputs-${i}`)
      );
      autoCompleteDeclare(
        map,
        placeNames,
        setPlaceNames,
        inputs,
        markerLatLng,
        setMarkerLatLng
      );
      markerLatLng.forEach((item) => {
        const draggableMarker = new AdvancedMarkerElement({
          map,
          position: item,
          gmpDraggable: true,
          title: "This marker is draggable.",
        });
        //   draggableMarker.setPosition(astor);
        draggableMarker.addListener("dragend", (event: any) => {
          infoWindow.close();
        });
      });
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [astor, placeIds, placeNames, add, markerLatLng]);

  return (
    <div className="container mx-auto">
      <div id="map" className="w-[300px] h-[400px]  "></div>
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
      <div className="flex flex-col ">
        {placeNames.map((item, index) => (
          <span key={index}>Name : {item}</span>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
