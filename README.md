Map
Api key: every function in the working process needs a google api key.
Map-view: Clicking the map view button, it show you map

      <script

src=Z`https://maps.googleapis.com/maps/api/js?key=your_api_key&callback=initMap&libraries=places&v=weekly`
defer></script>
Html :

<div
className={`h-[600px] w-full rounded-r-md ${
                !mapView && "hidden"
              } `}
id="map"></div>
In html code you must be set height in the map div. Most of the person miss it and they can not see map.
Js :
map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
center: new google.maps.LatLng(params.lat, params.lng),
zoom: 16,
mapId: "15431d2b469f209dsfdsfsde",
disableDefaultUI: true,
});
If you use raw js you can only call window.initmap function . map is a build in function in google map . lot of parameter in map function. First you need to set center latitude and longitude and mapId. Their is an interesting fact in mapId. Different mapid have different design set in google map. Here i use only four parameter. If you want to use every parameter , you want to see google map document. Link in the below
Google Map Api
But when you use it in any library and framework like react,next js, you need to use
useeffect function.
useEffect(() => {
async function initMap() {
window.initMap = initMap;
if (typeof google !== "undefined") { // when google is not undefined then initmap function is working
initMap();
}
}, []);

Now i want to describe my working process

AutoComplete Search
Search bar field add . you can write any letter in the search field , the search field suggests you automatically relevant address.

Code :
Html :
<input
            id="pac-input"
            className=" border    z-50 py-2 px-4 rounded-full  outline-none placeholder:text-black focus:rounded-b-none focus:rounded-t-2xl  2  w-full "
            type="text"
            placeholder="Search Google Maps"
          />

Js :
const input = document.getElementById("pac-input") as HTMLInputElement;
const options = {
fields: ["address_components", "geometry", "icon", "name", "place_id"],
strictBounds: false,
};
const autocomplete = new google.maps.places.Autocomplete(input, options);
autocomplete.bindTo("bounds", map);
autocomplete.addListener("place_changed", () => {
const place = autocomplete.getPlace();
if (!place?.geometry?.location) {
window.alert("wrong address");
return place;
}
marker.setPosition(place.geometry.location);
map.setCenter(place.geometry.location);
infoWindow.setContent(place?.name);
infoWindow.setPosition(place.geometry.location);
infoWindow.open(map);
});
}

1.First we need to get input field data. That is why we identify the input field and get value.
2.Get place information we set options . here i need place_id , address_component etc i use
3.Then, we need to call a built- in autocomplete method. Mainly it uses place prediction as user type into a text input field. 4. bindTo map is the result to the map viewpoint.
5.getPlace method give use place details ,
6.If we get not any place it return
7.finally i set marker position, map center,infowindow content and position
You can details get in this link

street-view: Clicking the street view button, it show you street-view

Html:

 <div
                    id="pano"
                    className="h-[600px] w-full rounded-l-md"></div>

Js:
const panorama = new google.maps.StreetViewPanorama(
document.getElementById("pano") as HTMLElement,
{
position: {lat:12312,lng:123213},
pov: {
heading: 34,
pitch: 10,
},
}
);
If you want to see a street view you need to call StreetViewPanorama using this method.

Moveable marker: Clicking the moveable button , the moveable marker is working
Js:
const draggableMarker = new AdvancedMarkerElement({
map,
position: astor,
gmpDraggable: true,
title: "This marker is draggable.",
});
draggableMarker.addListener("dragend", (event: any) => {
const positions = draggableMarker.position as google.maps.LatLng;
const lats: any = event?.latLng?.lat();
const lngs: any = event?.latLng?.lng();
let position = { lat: lats, lng: lngs };
getCodingForPlaceId(position, setPlaceId, setAstor);
infoWindow.close();
});
}
function getCodingForPlaceId(
position: any,
setPlaceId: any,
setAstor: any
) {
var geocoder = new google.maps.Geocoder();
geocoder.geocode({ location: position }, function (results: any, status) {
if (status === google.maps.GeocoderStatus.OK) {
setPlaceId(results[0]?.place_id);
setAstor(position);
} else {
window.alert("Geocoder failed due to: " + status);
}
});
}

Marker moveable function is working when any one AdvancemarkerElement- gmDraggable is true. But here I do something. When i drug anywhere in the map the latitude and longitude change and place address change, you can see it in ui.for get new address i use geocode.

Nearby search
Js:
const apiUrl = {apiKey}` `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1122500&type=${type}&keyword=${type}&key=${apiKey}`;
For nearby search i using this api.

Custom marker

Js
markerData.map((items) => {
const { position, price, title, img } = items;
// customer marker design for every user
const beachFlagImg = document.createElement("img");
beachFlagImg.src = `${img}`;
beachFlagImg.className = "absolute top-0 w-25 h-25";
const priceTag = document.createElement("div");
priceTag.className =
"bg-red-800 w-15 h-5 pt-1 rounded-full px-4 text-white relative";
priceTag.textContent = price;
priceTag.appendChild(beachFlagImg);
// pinelement set for change marker design
const pinScaled = new PinElement({
scale: 1.5,
glyph: `${price}`,
glyphColor: "green",
background: "yellow",
});
const marker = new Advancemarker({
map,
position,
content: pinScaled?.element,
});
For custom marker we nee some fakedb json data. Here markerdata is my fakejson.
PinElement : marker structure size set in pinElement. Then marker set in AdvancemarkerElement method,

Cluster
Js :
Cluster all process like a custom marker . if you need cluster only u call a function All marker set as parameter in markerCluster. MarkerCluster is a package google map suggest me, package is
npm i @googlemaps/markerclusterer

Fakejson data fetch:
js:

map.addListener("drag", (e: any) => {
circleArea(map, setCircle);
});

      map.addListener("zoom_changed", (e: any) => {
        circleArea(map, setCircle);
      });

Map drag property change map center . here i filter json for changing map center value and find data . the full code in the bellow :

import { propertyData } from "./propertyData";

export function circleArea(map: any, setCircle: any) {
interface City {
center: google.maps.LatLngLiteral;
population: number;
}
const ob = {
center: { lat: map?.center?.lat(), lng: map?.center?.lng() },
population: 2714856,
};
console.log(map?.center?.lat(), map?.center?.lng());
// Add the circle for this city to the map.
const circle = new google.maps.Circle({ // circle radius identity the product area
strokeColor: "transparent",
strokeOpacity: 0.8,
strokeWeight: 2,
fillColor: "transparent",
fillOpacity: 0.35,
map,
center: ob.center,
radius: Math.sqrt(ob.population) \* 60,
});

// Calculate the highest latitude and longitude
//latitude and longitude we need to move getBounds()
const circleBounds = circle.getBounds(); // getBounds give us latitude and longitude . it give use south east west north latitude and longitude
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
    console.log(price);
    marker.addListener("click", (e: any) => {
      infoWindow.setContent(markers(item));
      infoWindow.open(marker.map, marker);
    });
    return new google.maps.LatLng(position?.lat, position?.lng);

});
}
// this function work when any person click the marker in the map ,, other wise it not work
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

polyline code
// line create with every marker
// const polyline = new google.maps.Polyline({
// path: polylineCoordinates,
// geodesic: true,
// strokeColor: "green", // Line color
// strokeOpacity: 0.8,
// strokeWeight: 2,
// });

// polyline.setMap(map);
