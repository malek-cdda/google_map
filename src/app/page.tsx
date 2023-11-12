"use client";

import CustomScript from "@/components/commonScript/CustomScript";
import MapGoogle from "@/components/googleMap/GoogleMap";

import { useState, useEffect } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState<any>("");
  const [checkApiKey, setCheckApiKey] = useState<any>(
    "" || localStorage.getItem("apiKey")
  );
  const [toggle, setToggle] = useState(false);
  console.log(localStorage.getItem("apiKey"));
  const handleSubmitApiKey = (e: any) => {
    setCheckApiKey(apiKey);
    localStorage.setItem("apiKey", apiKey);
  };

  useEffect(() => {
    if (checkApiKey) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [toggle, checkApiKey]);
  return (
    <main>
      {!toggle && (
        <div className="flex justify-center items-center h-screen ">
          {/* provide api key from user  */}
          <input
            placeholder="provide your apikey"
            className="border-2 text-black  shadow-md px-5 py-4 focus:none outline-none rounded-md w-1/2 placeholder-black placeholder:text-lg placeholder:capitalize"
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
          />
          <button
            onClick={(e) => handleSubmitApiKey(e)}
            className="border-2 text-black  shadow-md px-7 py-4 focus:none outline-none rounded-md placeholder-black   capitalize mx-3 hover:bg-gray-200 font-bold">
            Submit
          </button>
        </div>
      )}
      <MapGoogle />
      <CustomScript apiKey={checkApiKey} />
    </main>
  );
}
