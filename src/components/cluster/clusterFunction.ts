import { markerData } from "../marker/data";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

export async function clusterCustom(
  params: any,
  map: any,
  PinElement: any,
  infoWindow: any
) {
  // Create a polyline to connect the markers

  map.setCenter(markerData[0].position);
  const markers: any = markerData.map((items) => {
    const { position, price, title, img } = items;
    // customer marker design for every user
    const pinGlyph = new google.maps.marker.PinElement({
      glyph: "s",
      glyphColor: "white",
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      content: pinGlyph.element,
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      infoWindow.setContent(position.lat + ", " + position.lng);
      infoWindow.open(map, marker);
    });
    return marker;
  });
  // line creat
  new MarkerClusterer({ markers, map });
}
