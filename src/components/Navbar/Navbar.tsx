"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathName = usePathname();
  const data = [
    {
      name: "Auto Complete Field",
      path: "/autoCompleteField",
    },
    {
      name: "NearBy",
      path: "/nearby",
    },
    {
      name: "custommarker",
      path: "/customemarker",
    },
    {
      name: "boundary",
      path: "/boundary",
    },
    {
      name: "cluster",
      path: "/cluster",
    },
    {
      name: "OwnProperty",
      path: "/ownProperty",
    },
    // {
    //   name: "all in one",
    //   path: "/map/marker/simple",
    // },
  ];
  return (
    <div>
      <div className="flex justify-center text-bold my-7 border  container mx-auto rounded-md shadow-md capitalize">
        {data.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`hover:underline hover:bg-blue-300 rounded-lg px-5 py-2 text-indigo-600 text-lg font-bold mx-2 ${
              pathName === item.path ? "bg-blue-300" : ""
            }`}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
