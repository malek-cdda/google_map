import { propertyData } from "./propertyData";
export function mapFullArea(map: any, setCircle: any) {
  console.log(map);

  // Get the bounds of the visible region
  const bounds = map.getBounds();
  console.log(bounds, "bounds");
  if (bounds) {
    // Get the southwest and northeast coordinates
    const southwest = bounds.getSouthWest();
    const northeast = bounds.getNorthEast();
    setCircle({
      highestLatitude: northeast.toJSON().lat,
      lowestLatitude: southwest.toJSON().lat,
      highestLongitude: northeast.toJSON().lng,
      lowestLongitude: southwest.toJSON().lng,
    });
  } else {
    console.error("Unable to get map bounds.");
  }
}
export function circleArea(map: any, setCircle: any) {
  interface City {
    center: google.maps.LatLngLiteral;
    population: number;
  }
  const ob = {
    center: { lat: map?.center?.lat(), lng: map?.center?.lng() },
    population: 2714856,
  };
  console.log(ob);
  // Add the circle for this city to the map.
  const circle = new google.maps.Circle({
    strokeColor: "transparent",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "transparent",
    fillOpacity: 0.35,
    map,
    center: ob.center,
    radius: Math.sqrt(ob.population) * 60,
  });
  //latitude and longitude we need to move getBounds()
  const circleBounds = circle.getBounds();
  const northEast = circleBounds?.getNorthEast();
  const southWest = circleBounds?.getSouthWest();
  const highestLatitude = northEast?.lat();
  const highestLongitude = northEast?.lng();
  const lowestLatitude = southWest?.lat();
  const lowestLongitude = southWest?.lng();
  setCircle({
    highestLatitude,
    highestLongitude,
    lowestLatitude,
    lowestLongitude,
  });
}
// product data for marker show here
export async function markerCustom(
  AdvancedMarkerElement: any,
  map: any,
  propertyData: any,
  PinElement: any,
  infoWindow: any
) {
  // Create a polyline to connect the markers
  propertyData.map((item: any) => {
    const { position, price, title, img, propertyName } = item;
    const priceTag = document.createElement("div");
    priceTag.className =
      "bg-red-800 w-10 h-5 flex justify-center items-center rounded-full text-white font-bold ";
    priceTag.textContent = price;
    const marker = new AdvancedMarkerElement({
      map,
      position,
      content: priceTag,
    });

    marker.addListener("click", (e: any) => {
      infoWindow.setContent(markers(item));
      infoWindow.open(marker.map, marker);
    });
    return new google.maps.LatLng(position?.lat, position?.lng);
  });
}
function markers(item: any) {
  return `<div style="display: flex; gap: 1rem;">
  <div style="   ">
    <img
      src="${item?.img}"
      alt="Picture of the author"
       
      style="border: 1px solid #e5e7eb; border-radius: 0.375rem; object-fit: cover; width: 100%; height: 100px;"
    />
    <div style="margin-top: 1.5rem; display: flex; flex-direction: column;">
      <span style="font-weight: bold;">BDT${item?.price}Thousand</span>
      <div style="display: flex; gap: 0.5rem;">
        <span>${item?.propertyType}</span>
        <span>${item?.area}</span>
      </div>
      <span>Area : ${item?.location}</span>
    </div>
    <button style="background-color: #edf2f7; color: #4a5568; border-radius: 0.75rem; padding: 0.5rem 1.25rem; margin-top: 1.5rem;" class="rounded-xl">
      Manage by pyreactor
    </button>
  </div>

  <!-- Add more items here if needed -->

</div>

`;
}
