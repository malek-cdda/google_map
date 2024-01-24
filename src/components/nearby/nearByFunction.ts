export async function placeFetch(placeId: string, setPlaceData: any) {
  fetch(`http://localhost:3000/api/placeapi?placeId=${placeId}`)
    .then((response) => response.json())
    .then((data) => {
      setPlaceData(data.result.result);
    });
}
