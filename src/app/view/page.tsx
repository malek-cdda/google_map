"use client";

import { mapDeclare } from "@/components/mapFunction/map";
import { use, useEffect } from "react";

const Home = () => {
  useEffect(() => {
    let panorama: any;

    async function initMap() {
      const astorPlace = { lat: 40.729884, lng: -73.990988 };
      // Set up the map

      const { map, AdvancedMarkerElement } = await mapDeclare(astorPlace);
      const viewClick = document.getElementById("toggle") as any;
      viewClick.addEventListener("click", toggleStreetView);

      // Set up the markers on the map
      const cafeMarker = new google.maps.Marker({
        draggable: true,
        position: { lat: 40.730031, lng: -73.991428 },
        map,
        icon: "https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe|FFFF00",
        title: "Cafe",
      });

      // We get the map's default panorama and set up some defaults.
      // Note that we don't yet set it visible.
      panorama = map.getStreetView(); // TODO fix type
      panorama.setPosition(astorPlace);
      panorama.setPov(
        /** @type {google.maps.StreetViewPov} */ {
          heading: 265,
          pitch: 0,
        }
      );
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
  }, []);
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
