import React from "react";
import { useGlobalContext } from "../context";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";

const WeatherCard = ({ dt, temp, weather, timezoneOffset, index }) => {
  const { unit, formatDate } = useGlobalContext();
  const formattedDate = formatDate(dt, timezoneOffset);

  return (
    <>
      <article className="bg-darkBlue w-[7.5rem] h-44 flex flex-col justify-center items-center">
        <p className="text-base">{index ? formattedDate : "Tomorrow"}</p>
        <div className="icon-container w-[3.528rem] h-[3.875rem]">
          <img
            src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
            alt={weather[0].main}
            className="w-full h-full"
          />
        </div>
        <div className="temp-container">
          <p className="text-base flex">
            {temp.max}{" "}
            {unit === "metric" ? (
              <WiCelsius size={24} />
            ) : (
              <WiFahrenheit size={24} />
            )}
          </p>
          <p className="text-base text-lightBlueOne flex">
            {temp.min}{" "}
            {unit === "metric" ? (
              <WiCelsius size={24} />
            ) : (
              <WiFahrenheit size={24} />
            )}
          </p>
        </div>
      </article>
    </>
  );
};

export default WeatherCard;
