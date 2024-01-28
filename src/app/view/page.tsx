"use client";

import { mapDeclare } from "@/components/mapFunction/map";
import { use, useEffect, useState } from "react";

const Home = () => {
  const [markerPosition, setMarkerPosition] = useState<any>({
    lat: 40.729884,
    lng: -73.990988,
  });

  useEffect(() => {
    let panorama: any;
    let value: any;

    async function initMap() {
      // Set up the map

      const { map, AdvancedMarkerElement } = await mapDeclare(markerPosition);
      const viewClick = document.getElementById("toggle") as any;
      viewClick.addEventListener("click", toggleStreetView);

      // Set up the markers on the map
      const cafeMarker = new google.maps.Marker({
        draggable: true,
        position: markerPosition,
        map,
        icon: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00",
        title: "Cafe",
      });

      google.maps.event.addListener(cafeMarker, "dragend", () => {
        const newPosition: any = cafeMarker.getPosition();
        console.log(newPosition);
        cafeMarker.setPosition(newPosition);
        setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
        value = newPosition; // Assign newPosition to the variable
        // map.setCenter(markerPosition); // Set map center to marker position
      });

      // We get the map's default panorama and set up some defaults.
      // Note that we don't yet set it visible.
      console.log(value);
      panorama = map.getStreetView(); // TODO fix type
      panorama.setPosition(markerPosition);
      panorama.setPov({
        heading: 265,
        pitch: 0,
      });
    }

    function toggleStreetView() {
      const toggle = panorama.getVisible();
      if (toggle == false) {
        panorama.setVisible(true);
      } else {
        panorama.setVisible(false);
      }
    }
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [markerPosition]);
  return (
    <div className="container mx-auto rounded-md">
      <div id="floating-panel" className="text-center  ">
        <input
          type="button"
          value="Toggle Street View"
          id="toggle"
          className=" bg-blue-500 text-white p-2 rounded-md cursor-pointer my-5 hover:bg-blue-400"
        />
      </div>
      <div id="map" className="h-[500px] rounded-md"></div>
    </div>
  );
};

export default Home;
