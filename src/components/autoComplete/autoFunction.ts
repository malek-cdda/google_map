// streetViewDeclare declarew street view function
export async function autoCompleteDeclare(
  marker: any,
  map: any,
  infoWindow: any,
  setError: any,
  setNearBy: any
) {
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const options = {
    fields: ["address_components", "geometry", "icon", "name", "place_id"],
    strictBounds: false,
  };
  // find place library  = autcomplete
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    // not found any latitude lngongitude then return it
    setNearBy([]);
    if (!place?.geometry?.location) {
      window.alert("wrong address");
      return;
    }
    // set marker position
    marker.setPosition(place.geometry.location);
    // set map center
    map.setCenter(place.geometry.location);
    infoWindow.setPosition(place.geometry.location);
    infoWindow.setContent(place?.name);
    // display show data
    infoWindow.open(map);
    // search place street find function call
    streetViewDeclare(map, infoWindow, setError);
    nearBySearch(map, setNearBy);
  });
  return { infoWindow, marker, map };
}

// street view function
export async function streetViewDeclare(
  map: any,
  infoWindow: any,
  setError: any
) {
  const sv = new google.maps.StreetViewService();
  sv.getPanorama({ location: infoWindow.position, radius: 50 })
    .then((e) => {
      processSVData(e);
      setError(true);
    })
    .catch((e: any) => {
      setError(false);
    });
  // map.addListener("click", (event: any) => {
  //   console.log(event.latLng);
  //   sv.getPanorama({ location: event.latLng, radius: 50 })
  //     .then((e) => {
  //       map.setCenter(event.latLng);
  //       processSVData(e);
  //       setError(true);
  //     })
  //     .catch((e: any) => {
  //       setError(false);
  //     });
  // });
}
// process street view data
async function processSVData({ data }: google.maps.StreetViewResponse) {
  console.log(data);
  let panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano") as HTMLElement
  );
  const location = data.location!;
  panorama.setPano(location.pano as string);
  panorama.setPov({
    heading: 270,
    pitch: 0,
  });
  panorama.setVisible(true);
}

// nearby search function
export async function nearBySearch(map: any, setNearBy: any) {
  let lat: number = map?.center?.lat();
  let lng: number = map?.center?.lng();

  var pyrmont = new google.maps.LatLng(lat, lng);
  var request: any = {
    location: pyrmont,
    radius: "1000",
    // types: ["restaurants"],
    keyword: ["restaurant"],
  };
  map.setCenter(pyrmont);
  // console.log(map.getCenter);
  let service = new google.maps.places.PlacesService(map);
  function performSearch(request: any) {
    service.nearbySearch(request, callback);
  }

  function callback(results: any, status: any, pagination: any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setNearBy((prev: any) => [...prev, ...results]);
    }
    if (pagination.hasNextPage) {
      pagination.nextPage();
    }
  }
  performSearch(request);
}
