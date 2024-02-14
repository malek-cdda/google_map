//   ?!autocomplete search place code function
export const handleAddedSearchField = async ({
  map,
  add,
  placeNames,
  setPlaceNames,
  indexNumber,
}: {
  map: google.maps.Map;
  add: number[];
  placeNames: any;
  setPlaceNames: any;
  indexNumber: any;
}) => {
  console.log(indexNumber, "indexNumber");
  let autocompleteInstances: any[] = [];
  // track id input field
  const inputs = document.getElementsByClassName("searchInput") as any;

  add.map((_, index) => {
    const input = document.getElementsByClassName("searchInput")[
      index
    ] as HTMLInputElement;
    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.bindTo("bounds", map);
    autocompleteInstances.push(autocomplete);
  });
  async function autocompletePlace(input: any, index: any) {
    return new Promise((resolve, reject) => {
      autocompleteInstances[index].addListener("place_changed", async () => {
        const place = autocompleteInstances[index].getPlace();
        if (!place.geometry) {
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        resolve(place?.formatted_address);
      });
    });
  }
  const len = document.getElementsByClassName("searchInput").length;
  const inputFields = document.getElementsByClassName("searchInput");
  for (let i: number = 0; i < len; i++) {
    // autocompletePlace(input);
    autocompletePlace(inputFields[i], i).then((data) => {
      console.log(data, "data");
      console.log(indexNumber, "indexNumber");
      const updatedPlaceNames = [...placeNames]; // Create a copy of placeNames
      updatedPlaceNames[indexNumber] = data;
      // document.getElementById(`multi-${indexNumber}`).value = data;
      setPlaceNames(updatedPlaceNames);
    });
  }
  // placeNames.map((item, index) => {
  //   const routeValue = document.getElementById(`multi-${index}`) as any;
  //   console.log(item, "item");
  //   console.log(document.querySelectorAll(".searchInput"), "searchInput");
  //   routeValue.value = item;
  // });
  return placeNames;
  // displayDistance();
};
//   ?! displayDistance route function code here
export function displayDistance(
  map: google.maps.Map | null,
  placeNames: string[]
) {
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

  function displayRoute(
    origin: any,
    destination: any,
    service: any,
    display: any
  ) {
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
      .then((result: any) => {
        display.setDirections(result);
      })
      .catch((e: any) => {
        // alert("Could not display directions due to: " + e);
      });
  }

  function computeTotalDistance(result: any) {
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
// ?!drag and drop section code here and changing value here
export function dragDrop(
  e: any,
  id: any,
  add: any,
  setAdd: any,
  placeNames: any,
  setPlaceNames: any
) {
  const draggedItemId = e.dataTransfer.getData("text/plain");
  const draggedItem: any = add.find((item: any) => item == draggedItemId);
  const droppedItem: any = add.find((item: any) => item == id);
  const draggedItemIndex = add.indexOf(draggedItem);
  const droppedItemIndex = add.indexOf(droppedItem);
  let newList = [...add];
  newList[draggedItemIndex] = droppedItem;
  newList[droppedItemIndex] = draggedItem;
  setAdd(newList);
  const temp = placeNames[draggedItemIndex];
  console.log(temp);
  placeNames[draggedItemIndex] = placeNames[droppedItemIndex];
  placeNames[droppedItemIndex] = temp;
  let value1 = document.getElementById(`multi-${draggedItemIndex}`) as any;
  let value2 = document.getElementById(`multi-${droppedItemIndex}`) as any;
  // value2.value = placeNames[droppedItemIndex];
  // value1.value = temp;
  const updatePlaceName = [...placeNames];
  setPlaceNames(updatePlaceName);
  updatePlaceName.map((item, index) => {
    const routeValue = document.getElementById(`multi-${index}`) as any;
    console.log(item, "item");
    console.log(document.querySelectorAll(".searchInput"), "searchInput");
    routeValue.value = item;
  });
}
// ?! delete any search field code here
export const handleDeleteSearchField = (
  index: number,
  setPlaceNames: any,
  placeNames: string[],
  setAdd: React.Dispatch<React.SetStateAction<number[]>>,
  add: number[]
) => {
  const newPlaceNames = [...placeNames];
  newPlaceNames.splice(index, 1);
  setPlaceNames(newPlaceNames);
  const newAdd = [...add];
  newAdd.splice(index, 1);
  setAdd(newAdd);
};
