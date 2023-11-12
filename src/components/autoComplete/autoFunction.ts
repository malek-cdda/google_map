// streetViewDeclare declarew street view function
export async function autoCompleteDeclare(
  marker: any,
  map: any,
  infoWindow: any,
  setError: any
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
    if (!place?.geometry?.location) {
      window.alert("wrong address");
      return place;
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
    nearBySearch(map, "");
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
  sv.getPanorama({ location: infoWindow.position, radius: 50 }).then(
    processSVData
  );
  map.addListener("click", (event: any) => {
    sv.getPanorama({ location: event.latLng, radius: 50 })
      .then((e) => {
        setError(true);
        processSVData;
      })
      .catch((e: any) =>
        // console.error("Street View data not found for this location.")
        {
          setError(false);
        }
      );
  });
}
// process street view data
async function processSVData({ data }: google.maps.StreetViewResponse) {
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
  //   map.addListener("click", () => {
  //     const markerPanoID = location.pano;
  //     // Set the Pano to use the passed panoID.
  //     panorama.setPano(markerPanoID as string);
  //     panorama.setPov({
  //       heading: 270,
  //       pitch: 0,
  //     });
  //     panorama.setVisible(true);
  //   });
}

// nearby search function
export async function nearBySearch(map: any, setNearBy: any) {
  let lat: number = map?.center?.lat();
  let lng: number = map?.center?.lng();

  var pyrmont = new google.maps.LatLng(lat, lng);
  var request: any = {
    location: pyrmont,
    radius: "15000",
    type: ["restaurant"],

    // keyword: ["hotel"],
  };
  map.setCenter(pyrmont);
  // console.log(map.getCenter);
  let service = new google.maps.places.PlacesService(map);
  function performSearch(request: any) {
    service.nearbySearch(request, callback);
  }

  function callback(results: any, status: any, pagination: any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      results.map((item: any) => {
        console.log(item.name);
      });
      //   setNearBy(results);
    }
    if (pagination.hasNextPage) {
      pagination.nextPage();
    }
  }
  performSearch(request);
}
