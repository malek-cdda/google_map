export async function autoCompleteDeclare(
  markers: any[],
  map: any,
  infoWindows: any[],
  setAstors: any[],
  setPlaceIds: any[],
  inputs: any[]
) {
  const options = {
    fields: ["address_components", "geometry", "icon", "name", "place_id"],
    strictBounds: false,
  };

  // Loop through each input field
  inputs.forEach((input, index) => {
    // find place library  = autcomplete
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo("bounds", map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
      //   setPlaceIds(index, place?.place_id);
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        // window.alert("No details available for input: " + place.name + "'");
        return;
      }
      // console.log(place?.geometry?.location?.lat());
      markers[index].setPosition(place.geometry.location);
      map.setCenter(place.geometry.location);
      infoWindows[index].setContent(place?.name);
      infoWindows[index].setPosition(place.geometry.location);
      infoWindows[index].open(map);
      //   setAstors(index, { lat: map.getCenter().lat(), lng: map.getCenter().lng() });
    });
  });
}
