import Image from "next/image";

export const NearbyCard = ({ item, haversine, astor }: any) => {
  const distance = haversine.haversineDistance(
    [astor.lat, astor.lng],
    [item.geometry.location.lat, item.geometry.location.lng]
  );
  return (
    <div className="flex justify-between items-center border rounded-md     gap-3">
      <div className="py-2 px-3 space-y-2">
        <span className="text-sm font-bold">name {item?.name}</span>
        <div className="   ">
          <span className="text-sm font-bold ">{item.rating} </span>
          <span className="text-sm  ">rating </span>
          <span className="text-sm font-bold  ">
            ({item?.user_ratings_total}) total_rate_person
          </span>
          <br />
          <span className="text-sm   "> distance: {distance.toFixed(3)} m</span>
        </div>
        <span className="text-sm  ">{item?.vicinity}</span>
      </div>
      <div>
        <Image
          alt="loading"
          width={1000}
          height={1000}
          className="h-[150px] w-[150px]  object-cover rounded-md border"
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
            item?.photos?.length && item?.photos[0]?.photo_reference
          }&key=${process.env.NEXT_PUBLIC_API_KEY}`}
        />
      </div>
    </div>
  );
};
