import { markerData } from "./../marker/data";
export async function markerCustom(
  AdvanceElement: any,
  map: any,
  PinElement: any,
  infoWindow: any
) {
  // Create a polyline to connect the markers
  map.setCenter(markerData[0]?.position);
  const polylineCoordinates = markerData.map((items) => {
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
    //   pinelement set for change marker design
    const pinScaled = new PinElement({
      scale: 1.5,
      glyph: `${price}`,
      glyphColor: "green",
      background: "yellow",
    });
    const marker = new AdvanceElement({
      map,
      position,
      content: pinScaled?.element,
    });
    marker.addListener("click", (e: any) => {
      infoWindow.setContent(items.title);
      infoWindow.open(marker.map, marker);
    });
    return new google.maps.LatLng(position?.lat, position?.lng);
  });
  // line create with every marker
  const polyline = new google.maps.Polyline({
    path: polylineCoordinates,
    geodesic: true,
    strokeColor: "green", // Line color
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });
  polyline.setMap(map);
}
