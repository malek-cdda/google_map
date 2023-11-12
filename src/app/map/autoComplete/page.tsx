"use client";

import AutoComplete from "@/components/autoComplete/autocomplete";
import CustomScript from "@/components/commonScript/CustomScript";
import React from "react";

const Home = () => {
  return (
    <div>
      <AutoComplete autoComplete={true} streetView={true} />
      <CustomScript apiKey="AIzaSyD-CWmVyAapUI5zhqL8zIj8Oa6a95UexVs" />
    </div>
  );
};

export default Home;
