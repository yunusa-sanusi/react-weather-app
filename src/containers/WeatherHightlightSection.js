import React from "react";
import WeatherHighlightCard from "../components/WeatherHighlightCard";

const WeatherHightlightSection = () => {
  return (
    <section>
      <h2 className="font-bold text-2xl self-start">Today's Highlight</h2>
      <div className="weather-highlight-container my-5">
        <WeatherHighlightCard />
      </div>
    </section>
  );
};

export default WeatherHightlightSection;
