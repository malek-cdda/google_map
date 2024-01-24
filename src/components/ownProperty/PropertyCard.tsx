import Image from "next/image";
import React from "react";

const PropertyCard = ({ item }: any) => {
  return (
    <div className="  gap-5  rounded-md ">
      <Image
        src={item?.img}
        alt="Picture of the author"
        width={500}
        height={500}
        className="rounded-md  h-[300px] border object-cover w-full"
      />

      <div className=" flex flex-col justify-around p-3">
        <div className="flex flex-col">
          <span className="font-bold">BDT{item?.price}Thousand</span>
          <div className="flex gap-5">
            <span>{item?.propertyType}</span>
            <span>{item?.area}</span>
          </div>
          {/* <span>Area : {item?.areaDetails}</span> */}
          <span>Area : {item?.location}</span>
        </div>
        <div className="flex items-center justify-between ">
          {/* <div className="flex gap-4">
            <button className="bg-gray-200 text-green-700 rounded-xl px-5 py-2  ">
              Appointment
            </button>
            <button className="bg-gray-200 text-green-700 rounded-xl px-5 py-2 ">
              Appointment
            </button>
          </div> */}
          <button className="bg-gray-200 text-green-700  rounded-xl px-5 py-2 ">
            Manage by pyreactor
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
