export function dragAble(
  map: any,
  infoWindow: any,
  AdvancedMarkerElement: any,
  setPlaceId: any,
  setAstor: any,
  astor: any,
  setPlaceName: any
) {
  console.log(astor);
  const draggableMarker = new AdvancedMarkerElement({
    map,
    position: astor,
    gmpDraggable: true,
    title: "This marker is draggable.",
  });
  //   draggableMarker.setPosition(astor);
  draggableMarker.addListener("dragend", (event: any) => {
    const positions = draggableMarker.position as google.maps.LatLng;
    const lats: any = event?.latLng?.lat();
    const lngs: any = event?.latLng?.lng();
    let position = { lat: lats, lng: lngs };
    getCodingForPlaceId(position, setPlaceId, setAstor, setPlaceName);
    //   streetView(map, pro, setProduct);
    infoWindow.close();
  });
}

export function getCodingForPlaceId(
  position: any,
  setPlaceId: any,
  setAstor: any,
  setPlaceName: any
) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: position }, function (results: any, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // document
      //   .getElementById("pac-input")
      //   ?.setAttribute("value", results[0]?.formatted_address);
      setPlaceName(results[0]?.formatted_address);
      setPlaceId(results[0]?.place_id);
      setAstor(position);
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
