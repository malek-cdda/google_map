export function dragAble(
  map: any,
  infoWindow: any,
  AdvancedMarkerElement: any,
  setPlaceData: any,
  setAstor: any,
  astor: any,
  input: any
) {
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
    getCodingForPlaceId(position, setPlaceData, setAstor, input);
    //   streetView(map, pro, setProduct);
    infoWindow.close();
  });
}

export function getCodingForPlaceId(
  position: any,
  setPlaceData: any,
  setAstor: any,

  input: any
) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: position }, function (results: any, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      // input.setAttribute("value", results[0]?.formatted_address);
      console.log();

      setPlaceData({
        address: results[0]?.address_components,
        formatted_address: results[0]?.formatted_address,
        position: {
          lat: results[0]?.geometry?.location.lat(),
          lng: results[0]?.geometry?.location.lng(),
        },
      });
      setAstor(position);
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
