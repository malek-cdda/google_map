export function dragAble(
  map: any,
  infoWindow: any,
  AdvancedMarkerElement: any,
  setPlaceId: any,
  setAstor: any,
  astor: any
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
    // const lats: any = event?.latLng?.lat();
    // const lngs: any = event?.latLng?.lng();
    const lats: any = event?.latLng?.lat();
    const lngs: any = event?.latLng?.lng();
    let position = { lat: lats, lng: lngs };
    getCodingForPlaceId(position, setPlaceId, setAstor);
    //   streetView(map, pro, setProduct);
    infoWindow.close();
  });
}

export function getCodingForPlaceId(
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