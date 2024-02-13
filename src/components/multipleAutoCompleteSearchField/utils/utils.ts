//   ?!autocomplete search place code function
export const handleAddedSearchField = async (
  map: google.maps.Map,
  add: number[],
  placeNames: any,
  setPlaceNames: any
) => {
  const data = add.map((_, index) => {
    const input: any = document.getElementsByClassName("searchInput")[index];
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", async () => {
      const place: any = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
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
  placeNames[draggedItemIndex] = placeNames[droppedItemIndex];
  placeNames[droppedItemIndex] = temp;
  const updatePlaceName = [...placeNames];
  setPlaceNames(updatePlaceName);
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
