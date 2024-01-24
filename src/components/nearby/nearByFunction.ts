export async function placeFetch(placeId: string, setPlaceData: any) {
  fetch(`/api/placeapi?placeId=${placeId}`)
    .then((response) => response.json())
    .then((data) => {
      setPlaceData(data.result.result);
    });
}
