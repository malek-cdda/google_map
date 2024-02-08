export async function autoCompleteDeclare(
  //   markers: any[],
  map: any,
  infoWindow: any,
  newPlaceNames: any[],
  setPlaceNames: any,
  inputs: any[],
  markerLatLng: any[],
  setMarkerLatLng: any,
  setAstor: any
) {
  const options = {
    fields: [
      "address_components",
      "geometry",
      "icon",
      "name",
      "place_id",
      "formatted_address",
    ],
    strictBounds: false,
  };
  console.log(inputs, "inputs");
  inputs?.forEach((input: any, index: any) => {
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
      const place: any = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      if (place.formatted_address) {
      }
      console.log(place.geometry.location.lat(), place.geometry.location.lng());
      setMarkerLatLng((prev: any) => {
        const newMarkerLatLng = [...prev];
        newMarkerLatLng[index] = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        return newMarkerLatLng;
      });
      newPlaceNames[index] = place?.formatted_address;
      //   setPlaceIds(newPlaceIds);
      setPlaceNames(newPlaceNames);
      if (place.geometry.location) {
        map.setCenter(place.geometry.location);
        infoWindow.setContent(place?.formatted_address);
        infoWindow.setPosition(place.geometry.location);
        infoWindow.open(map);
        setAstor({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
      }
    });
  });
}
// ?!marker draggable for place and route changing system function
export function markerDraggable(
  markerLatLng: any[],
  map: any,
  infoWindow: any,
  AdvancedMarkerElement: any,
  newPlaceNames: any[],
  setPlaceNames: any,
  setDraggablePlace: any
) {
  const polylineCoordinates = markerLatLng.map((item, index) => {
    console.log(index, "index");
    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: item,
      gmpDraggable: true,
      title: "This marker is draggable.",
    });
    //   draggableMarker.setPosition(astor);
    draggableMarker.addListener("dragend", (event: any) => {
      //   console.log(event.latLng.lat(), event.latLng.lng());
      //   console.log(index, "index of marker");
      getCodingForPlaceChange(
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        index,
        newPlaceNames,
        setPlaceNames,
        setDraggablePlace
      );
      infoWindow.close();
    });
    console.log(item, "item");
    return new google.maps.LatLng(item?.lat, item?.lng);
  });
  const polyline = new google.maps.Polyline({
    path: polylineCoordinates,
    geodesic: true,
    strokeColor: "green", // Line color
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });
  polyline.setMap(map);
}

//?! marker change for change placeid and address using geocode
export function getCodingForPlaceChange(
  position: any,
  index: any,
  newPlaceNames: any,
  setPlaceNames: any,
  setDraggablePlace: any
) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: position }, function (results: any, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // input.setAttribute("value", results[0]?.formatted_address);
      // setPlaceName(results[0]?.formatted_address);
      // setPlaceId(results[0]?.place_id);
      // setAstor(position);
      //   console.log(
      //     results[0]?.formatted_address,
      //     "results[0]?.formatted_address"
      //   );
      newPlaceNames[index] = results[0]?.formatted_address;
      console.log(newPlaceNames, "newPlaceNames");
      //   setPlaceIds(newPlaceIds);
      setDraggablePlace(results[0]?.formatted_address);
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
  setPlaceNames(newPlaceNames);
  console.log(newPlaceNames, "newPlaceNames");
}
