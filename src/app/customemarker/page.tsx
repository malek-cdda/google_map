"use client";
import Marker from "@/components/custommarker/marker"; // Fix the casing of the import statement
import React from "react";
let apiKey = process.env.NEXT_PUBLIC_API_KEY;
const Home = () => {
  return (
    <div>
      <Marker apiKey={apiKey} marker={true} />
    </div>
  );
};

export default Home;
