"use client";
import Marker from "@/components/custommarker/marker";
import React from "react";
let apiKey = "AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs";
const Home = () => {
  return (
    <div>
      <Marker apiKey={apiKey} marker={true} />
    </div>
  );
};

export default Home;
