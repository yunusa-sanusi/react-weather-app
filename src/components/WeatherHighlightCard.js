import React from "react";
import { useGlobalContext } from "../context";

const WeatherHighlightCard = () => {
  const { weatherData } = useGlobalContext();
  const { current } = weatherData;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="bg-darkBlue w-[17rem] md:w-[20.5rem] h-[10.75rem] md:h-[12.75rem] flex flex-col justify-center items-center">
        <h3 className="text-base font-medium">Wind status</h3>
        <h2 className="text-bold text-[2.5rem] md:text-[4rem]">
          {current.wind_speed} mph
        </h2>
      </article>
      <article className="bg-darkBlue w-[17rem] md:w-[20.5rem] h-[10.75rem] md:h-[12.75rem] flex flex-col justify-center items-center">
        <h3 className="text-base font-medium">Humidity</h3>
        <h2 className="text-bold text-[2.5rem] md:text-[4rem]">
          {current.humidity}%
        </h2>
      </article>
      <article className="bg-darkBlue w-[17rem] md:w-[20.5rem] h-[10.75rem] md:h-[8.75rem] flex flex-col justify-center items-center">
        <h3 className="text-base font-medium">Visibility</h3>
        <h2 className="text-bold text-[2.5rem] md:text-[3.5rem]">
          {current.visibility} mph
        </h2>
      </article>
      <article className="bg-darkBlue w-[17rem] md:w-[20.5rem] h-[10.75rem] md:h-[8.75rem] flex flex-col justify-center items-center">
        <h3 className="text-base font-medium">Air Pressure</h3>
        <h2 className="text-bold text-[2.5rem] md:text-[3.5rem]">
          {current.pressure} mb
        </h2>
      </article>
    </div>
  );
};

export default WeatherHighlightCard;
