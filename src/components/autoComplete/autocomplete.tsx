import React, { useEffect, useState } from "react";
import { autoCompleteDeclare, streetViewDeclare } from "./autoFunction";

import { infoWindowDeclare, mapDeclare, markerDeclare } from "../map/map";

const AutoComplete = ({ autoComplete, streetView }: any) => {
  // autoCompleteDeclare()
  const [error, setError] = useState<any>(true);
  async function initMap() {
    const { map } = await mapDeclare("");
    const { infoWindow } = await infoWindowDeclare(map);
    const { marker } = await markerDeclare(map);

    streetView && autoCompleteDeclare(marker, map, infoWindow, setError);

    streetView && streetViewDeclare(map, infoWindow, setError);
  }
  useEffect(() => {
    window.initMap = initMap;
    if (typeof google !== "undefined") {
      initMap();
    }
  }, [streetView, autoComplete, setError, error]);
  return (
    <div className="container mx-auto">
      <div className={`  grid  ${!error ? "grid-cols-1" : "grid-cols-2"}`}>
        <div>
          {streetView && (
            <> {error && <div id="pano" className="h-[500px] w-full"></div>} </>
          )}
        </div>
        <div className="relative">
          {autoComplete && (
            <input
              id="pac-input"
              className="controls   absolute top-1/2 left-1/2 transform -translate-x-1/2 z-50 w-1/2  px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  "
              type="text"
              placeholder="Search Box"
            />
          )}
          <div className="h-[500px]" id="map"></div>
        </div>
      </div>
    </div>
  );
};

export default AutoComplete;
