export async function autoCompleteDeclare(
  //   markers: any[],
  map: any,

  newPlaceNames: any[],
  setPlaceNames: any,
  inputs: any[],
  markerLatLng: any[],
  setMarkerLatLng: any
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

  inputs?.forEach((input: any, index: any) => {
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
      const place: any = autocomplete.getPlace();
      console.log(place);
      if (!place.geometry || !place.geometry.location) {
        return;
      }
      //   const newPlaceIds = [...placeIds];
      //   const newPlaceNames = [...placeNames];
      //   newPlaceIds[index] = place.place_id;
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
    });
  });
}
