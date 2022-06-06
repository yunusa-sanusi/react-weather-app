import React from "react";
import WeatherCard from "../components/WeatherCard";
import { useGlobalContext } from "../context";

const FutureWeatherSection = () => {
  const { weatherData } = useGlobalContext();
  const fiveDaysData = weatherData.daily.slice(1, 6);
  return (
    <section className="grid grid-cols-2 gap-8 md:grid-cols-5 jusitfy-items-center items-center my-6">
      {fiveDaysData.map((data, index) => {
        return (
          <WeatherCard
            key={data.dt}
            {...data}
            timezoneOffset={weatherData.timezone_offset}
            index={index}
          />
        );
      })}
    </section>
  );
};

export default FutureWeatherSection;
