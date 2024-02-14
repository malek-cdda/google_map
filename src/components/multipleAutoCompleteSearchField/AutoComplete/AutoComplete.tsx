import {
  infoWindowDeclare,
  mapDeclare,
  markerDeclare,
} from "@/components/mapFunction/map";
import React, { memo, use, useEffect, useState } from "react";
import {
  displayDistance,
  dragDrop,
  handleAddedSearchField,
  handleDeleteSearchField,
} from "../utils/utils";
import { customScript } from "@/components/hooks/script";
const AutoComplete = () => {
  const [astor, setAstor] = useState({ lat: 40.7128, lng: -74.006 });
  const [placeNames, setPlaceNames] = useState(Array(1).fill(""));
  const [map, setMap] = useState<any>(null);
  const [add, setAdd] = useState([0]);
  const [indexNumber, setIndexNumber] = useState<any>(null);
  useEffect(() => {
    const script = customScript();
    script.onload = initializeMap;
    return () => {
      document.head.removeChild(script);
    };
  }, [placeNames]);
  // ?!initialize map function
  const initializeMap = async () => {
    const { map } = await mapDeclare(astor);
    setMap(map);
  };
  // ?!autocomplete search place code function
  useEffect(() => {
    // try to make a marker in the function
    if (map && indexNumber !== null) {
      handleAddedSearchField({
        map,
        add,
        placeNames,
        setPlaceNames,
        indexNumber,
      });
    }
  }, [map, add, placeNames, setPlaceNames, indexNumber]);
  // ?! distance marker draggable for place and route changing system function
  useEffect(() => {
    if (map) {
      displayDistance(map, placeNames);
    }
  }, [placeNames, map]);
  // drag function code here
  function dragStart(e: any, id: any) {
    e.dataTransfer.setData("text/plain", id);
  }
  function dragEnter(e: any) {
    e.preventDefault();
  }
  function dragOver(e: any) {
    e.preventDefault();
  }
  // ?!drag and drop function code here
  function dragDrops(e: any, id: any) {
    dragDrop(e, id, add, setAdd, placeNames, setPlaceNames);
  }
  // ?!delete function code here
  const handleDelete = (index: number) => {
    handleDeleteSearchField(index, setPlaceNames, placeNames, setAdd, add);
  };
  useEffect(() => {
    placeNames.map((item, index) => {
      const routeValue = document.getElementById(`multi-${index}`) as any;
      routeValue.value = item;
    });
  }, [placeNames, map]);
  return (
    <div className="container mx-auto">
      {/* <div id="panel"></div> */}
      <div id="map" className="  h-[400px]  "></div>
      <div className="flex w-full justify-between gap-3 ">
        <div className="w-full">
          <div className="flex items-center flex-col w-full">
            {add.map((item, index) => (
              <div
                key={item}
                className="draggable w-full flex items-center"
                draggable="true"
                onDragStart={(e) => dragStart(e, item)}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDrop={(e) => dragDrops(e, item)}>
                <input
                  id={`multi-${index}`}
                  type="text"
                  placeholder={"search for place" + String(item + 1)}
                  className={`searchInput controls border-2 border-gray-500 w-full h-10 mb-2 rounded-full px-3 py-2 duration-300 ease-linear transform transition-all focus:rounded-none focus:rounded-t-xl  `}
                  onFocus={(e) => {
                    setIndexNumber(item);
                  }}
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
        </div>
        <button
          className="bg-blue-700 py-2 px-7 rounded-full text-white w-32 h-12 my-2"
          onClick={(e) => {
            // setAdd(add + 1);
            setAdd([...add, add.length]);
          }}>
          + Add{" "}
        </button>
      </div>
      <div className="flex flex-col my-5"></div>
    </div>
  );
};

export default AutoComplete;
