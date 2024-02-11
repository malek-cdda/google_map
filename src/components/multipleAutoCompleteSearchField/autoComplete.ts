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
export async function markerDraggable(
  setMarkerLatLng: any,
  markerLatLng: any[],
  map: any,
  PinElement: any,
  AdvancedMarkerElement: any,
  infoWindow: any,
  newPlaceNames: any[],
  setPlaceNames: any,
  setDraggablePlace: any
) {
  const polylineCoordinates =
    markerLatLng &&
    markerLatLng.map((item, index) => {
      const pinScaled =
        PinElement &&
        new PinElement({
          scale: 1.5,
          glyph: `${index}`,
          glyphColor: "black",
          background: "green",
        });
      console.log(pinScaled, "pinScaled");
      const draggableMarker =
        map &&
        AdvancedMarkerElement &&
        new AdvancedMarkerElement({
          map,
          position: item,
          gmpDraggable: true,
          title: "This marker is draggable.",
          content: pinScaled?.element,
        });
      draggableMarker?.addListener("dragend", (event: any) => {
        setMarkerLatLng((prev: any) => {
          const newMarkerLatLng = [...prev];
          newMarkerLatLng[index] = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          return newMarkerLatLng;
        });

        infoWindow.close();
      });
      // draggableMarker?.addListener("dragend", (event: any) => {
      //   setMarkerLatLng((prev: any) => {
      //     const newMarkerLatLng = [...prev];
      //     newMarkerLatLng[index] = {
      //       lat: event.latLng.lat(),
      //       lng: event.latLng.lng(),
      //     };
      //     return newMarkerLatLng;
      //   });
      // getCodingForPlaceChange(
      //   {
      //     lat: event.latLng.lat(),
      //     lng: event.latLng.lng(),
      //   },
      //   index,
      //   newPlaceNames,
      //   setPlaceNames,
      //   setDraggablePlace
      // );
      // infoWindow.close();
    });
  // console.log(item, "item");
  // return new google.maps.LatLng(item?.lat, item?.lng);
  // });
  // const polyline = new google.maps.Polyline({
  //   path: polylineCoordinates,
  //   geodesic: true,
  //   strokeColor: "green", // Line color
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  // });
  // polyline.setMap(map);
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

// multiple direction service function

export function directionCalculate(map: any, markerLatLng: any[]) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  (document.getElementById("submit") as HTMLElement).addEventListener(
    "click",
    () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    }
  );

  function calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const waypts: google.maps.DirectionsWaypoint[] = [];
    const checkboxArray = document.getElementById(
      "waypoints"
    ) as HTMLSelectElement;

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: (checkboxArray[i] as HTMLOptionElement).value,
          stopover: true,
        });
      }
    }

    directionsService
      .route({
        origin: (document.getElementById("start") as HTMLInputElement).value,
        destination: (document.getElementById("end") as HTMLInputElement).value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);

        const route = response.routes[0];
        const summaryPanel = document.getElementById(
          "directions-panel"
        ) as HTMLElement;

        summaryPanel.innerHTML = "";

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;

          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }
}
