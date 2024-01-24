export const markerData = [
  {
    position: { lat: 34.8791806, lng: -111.8265049 },
    title: "Boyanton Pass",
    price: "123k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Arizona",
  },
  {
    position: { lat: 38.8665433, lng: 86.1956316 },
    title: "Airport Mesa",
    price: "223k",
    img: "/next.svg",
    state: "California",
  },
  {
    position: { lat: 34.832149, lng: -111.7695277 },
    title: "Chapel of the Holy Cross",
    price: "444k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Krasnoyarsk Krai",
  },
  {
    position: { lat: 34.823736, lng: -111.8001857 },
    title: "Red Rock Crossing",
    price: "555k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "California",
  },
  {
    position: { lat: 34.800326, lng: -111.7665047 },
    title: "Bell Rock",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Arizona",
  },
  {
    position: { lat: 11.800326, lng: -140.7665047 },
    title: "Bell Rock",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "Arizona",
  },
  {
    position: { lat: 30.788872, lng: -82.019038 },
    title: "Bell Rock1",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 30.788872, lng: -83.019038 },
    title: "Bell Rock3",
    price: "66633k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 30.800326, lng: -81.7665047 },
    title: "Bell Rock2",
    price: "616k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 28.800326, lng: -81.7665047 },
    title: "Bell Rock3",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 27.800326, lng: -82.7665047 },
    title: "Bell Rock4",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 29.800326, lng: -83.7665047 },
    title: "Bell Rock443",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
  {
    position: { lat: 29.820326, lng: -83.8165047 },
    title: "Bell Rock44",
    price: "666k",
    img: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    state: "florida",
  },
];
// export function ZoomControl(controlDiv: any, map: any) {
//   // Creating divs & styles for custom zoom control
//   controlDiv.style.padding = "5px";

//   // Set CSS for the control wrapper
//   var controlWrapper = document.createElement("div");
//   controlWrapper.className =
//     "cursor-pointer border-1 text-center h-20 fixed bottom-1/2 right-10";
//   controlDiv.appendChild(controlWrapper);
//   // Set CSS for the zoomIn
//   var zoomInButton = document.createElement("div");
//   zoomInButton.style.width = "32px";
//   zoomInButton.style.height = "32px";
//   /* Change this to be the .png image you want to use */
//   zoomInButton.style.background = "green";
//   controlWrapper.appendChild(zoomInButton);

//   // Set CSS for the zoomOut
//   var zoomOutButton = document.createElement("div");
//   zoomOutButton.style.background = "red";
//   zoomOutButton.style.width = "32px";
//   zoomOutButton.style.height = "32px";
//   /* Change this to be the .png image you want to use */

//   controlWrapper.appendChild(zoomOutButton);

//   // Setup the click event listener - zoomIn
//   google.maps.event.addDomListener(zoomInButton, "click", function () {
//     map.setZoom(map.getZoom() + 1);
//   });

//   // Setup the click event listener - zoomOut
//   google.maps.event.addDomListener(zoomOutButton, "click", function () {
//     map.setZoom(map.getZoom() - 1);
//   });
// }

// component rendering
//  custom rendering system
export async function markerCustom(
  params: any,
  map: any,
  toggle: any,
  PinElement: any,
  infoWindow: any,
  toggles: any
) {
  // Create a polyline to connect the markers
  const polylineCoordinates = markerData.map((items) => {
    const { position, price, title, img } = items;

    // customer marker design for every user
    const beachFlagImg = document.createElement("img");
    beachFlagImg.src = `${img}`;
    beachFlagImg.className = "absolute top-0 w-25 h-25";
    const priceTag = document.createElement("div");
    priceTag.className =
      "bg-red-800 w-15 h-5 pt-1 rounded-full px-4 text-white relative";
    priceTag.textContent = price;
    priceTag.appendChild(beachFlagImg);
    //   pinelement set for change marker design
    const pinScaled = new PinElement({
      scale: 1.5,
      glyph: `${price}`,
      glyphColor: "green",
      background: "yellow",
    });
    const marker = new params({
      map,
      position,
      content: toggle ? pinScaled?.element : priceTag,
    });
    marker.addListener("click", (e: any) => {
      infoWindow.setContent(items.title);
      infoWindow.open(marker.map, marker);
    });
    return new google.maps.LatLng(position?.lat, position?.lng);
  });
  // line create with every marker
  const polyline = new google.maps.Polyline({
    path: polylineCoordinates,
    geodesic: true,
    strokeColor: "green", // Line color
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });

  // Set the map for the polyline
  if (toggles) {
    polyline.setMap(map);
  }
}

// zoom in out control click
export async function findProperty(
  value: any,
  setState: any,
  map: any,
  infoWindow: any,
  setNearBy: any
) {
  map.addListener(value, (e: any) => {
    // nearBySearch(map, setNearBy);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: map?.center?.lat(), lng: map?.center?.lng() } },
      (results: any, status) => {
        const addressComponents = results[0].address_components;
        for (const component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            const state = component.long_name;
            nearBySearch(map, setNearBy);
            setState(state);
          }
        }
      }
    );
  });
}

// auto search to find place
export const placeFind = (
  map: any,
  autocomplete: any,
  infowindow: any,
  marker: any,
  setState: any
) => {
  const place = autocomplete.getPlace();

  if (!place?.geometry?.location) {
    window.alert("wrong address");
    return place;
  }
  const addressComponents = place.address_components;
  for (const component of addressComponents) {
    if (component.types.includes("administrative_area_level_1")) {
      const state = component.long_name;
      setState(state);
    }
  }
  marker.setPosition(place?.geometry?.location);
  return {
    lat: place?.geometry?.location.lat(),
    lng: place?.geometry?.location.lng(),
  };
};

// neerby search function
export async function nearBySearch(map: any, setNearBy: any) {
  let lat: number = map?.center?.lat();
  let lng: number = map?.center?.lng();

  var pyrmont = new google.maps.LatLng(lat, lng);
  var request: any = {
    location: pyrmont,
    radius: "500",
    // type: ["hospital", "school", "restaurant"],
    keyword: ["restaurant"],
  };
  map.setCenter(pyrmont);

  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  function callback(results: any, status: any) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      setNearBy(results);
    }
  }
}

export async function streetView(map: any, product: any, setError: any) {
  const sv = new google.maps.StreetViewService();
  sv.getPanorama({ location: product.position, radius: 50 }).then(
    processSVData
  );
  map.addListener("click", (event: any) => {
    sv.getPanorama({ location: event.latLng, radius: 50 })
      .then(processSVData)
      .catch((e: any) =>
        // console.error("Street View data not found for this location.")
        {
          // setError(false);
          // window.alert("Street View data not found for this location.");
        }
      );
  });
  function processSVData({ data }: google.maps.StreetViewResponse) {
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
    map.addListener("click", () => {
      const markerPanoID = location.pano;
      // Set the Pano to use the passed panoID.
      panorama.setPano(markerPanoID as string);
      panorama.setPov({
        heading: 270,
        pitch: 0,
      });
      panorama.setVisible(true);
    });
  }
}

// dragble function
export function dragAble(
  map: any,
  infoWindow: any,
  setProduct: any,
  AdvancedMarkerElement: any
) {
  const draggableMarker = new AdvancedMarkerElement({
    map,
    position: { lat: 31.900326, lng: -83.9665047 },
    gmpDraggable: true,
    title: "This marker is draggable.",
  });
  draggableMarker.addListener("dragend", (event: any) => {
    const positions = draggableMarker.position as google.maps.LatLng;
    const lats: any = positions.lat;
    const lngs: any = positions.lng;
    let pro = { position: { lat: lats, lng: lngs } };

    streetView(map, pro, setProduct);
    infoWindow.close();
  });
}
// nearby latitude longtude  property find
// export function nearbyLatLng(map: any, setNearBy: any) {}
// decalre circle area custom boundary
export function circleArea(map: any, setCircle: any) {
  interface City {
    center: google.maps.LatLngLiteral;
    population: number;
  }
  const ob = {
    center: { lat: map?.center?.lat(), lng: map?.center?.lng() },
    population: 2714856,
  };

  // Add the circle for this city to the map.
  const cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: ob.center,
    radius: Math.sqrt(ob.population) * 60,
  });
  const circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: ob.center,
    radius: Math.sqrt(ob.population) * 60,
  });

  // Calculate the highest latitude and longitude
  //latitude and longitude we need to move getBounds()
  const circleBounds = circle.getBounds();
  const northEast = circleBounds?.getNorthEast();
  const southWest = circleBounds?.getSouthWest();
  const highestLatitude = northEast?.lat();
  const highestLongitude = northEast?.lng();
  const lowestLatitude = southWest?.lat();
  const lowestLongitude = southWest?.lng();

  setCircle({
    highestLatitude,
    highestLongitude,
    lowestLatitude,
    lowestLongitude,
  });
}
