import React from "react";
import FutureWeatherSection from "./FutureWeatherSection";
import WeatherHightlightSection from "./WeatherHightlightSection";

const MainContainer = () => {
  return (
    <main className="w-full flex flex-col justify-center items-center pt-14 pb-8">
      <FutureWeatherSection />
      <WeatherHightlightSection />
    </main>
  );
};

export default MainContainer;
