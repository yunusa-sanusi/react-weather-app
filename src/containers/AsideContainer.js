import React from "react";
import { useGlobalContext } from "../context";
import { MdLocationPin } from "react-icons/md";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { BsDot } from "react-icons/bs";

const AsideContainer = () => {
  const { weatherData, location, unit, formatDate } = useGlobalContext();
  const { current } = weatherData;
  const formattedDate = formatDate(current.dt, weatherData.timezone_offset);
  const { state, country } = location;

  return (
    <aside className="h-screen w-full md:w-[28.688rem] md:h-auto flex flex-col justify-center items-center current-weather-container">
      <div className="weather-icon-container">
        <img
          src={`http://openweathermap.org/img/w/${current.weather[0].icon}.png`}
          alt={`${current.weather[0].main} icon`}
          className="weather-icon"
        />
      </div>
      <div className="weather-info flex my-14">
        <h1 className="text-5xl mr-0 pr-0">{current.temp}</h1>
        {unit === "metric" ? (
          <WiCelsius size={35} className="ml-0 pr-0" />
        ) : (
          <WiFahrenheit size={35} className="ml-0 pr-0" />
        )}
      </div>

      <p className="text-4xl text-lightBlueOne mb-14">
        {current.weather[0].main}
      </p>

      <p className="text-lg text-lightBlueTwo flex justify-center items-center mb-5">
        Today <BsDot /> {formattedDate}
      </p>

      <p className="flex text-lg jusitfy-center items-center text-lightBlueTwo">
        <MdLocationPin /> {state}, {country}
      </p>
    </aside>
  );
};

export default AsideContainer;
