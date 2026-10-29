import React from "react";
import Hero from "../components/hero";
import LatestCollections from "../components/latestcollections";
import BestSeller from "../components/bestseller";
import Policy from "../components/policy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSeller />
      <Policy />
    </div>
  );
};

export default Home;
