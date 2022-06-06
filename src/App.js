import React from "react";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { useGlobalContext } from "./context";
import AsideContainer from "./containers/AsideContainer";
import MainContainer from "./containers/MainContainer";

function App() {
  const { convertTempUnit } = useGlobalContext();
  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <div className="temp-converter absolute top-[1rem] left-[1rem] md:left-[84%]">
        <button
          className="p-1 rounded-full bg-veryLightBlue mr-3"
          onClick={() => convertTempUnit("metric")}
        >
          <WiCelsius size={30} color="#110E3C" className="text-bold" />
        </button>
        <button
          className="p-1 rounded-full bg-lightBlue"
          onClick={() => convertTempUnit("imperial")}
        >
          <WiFahrenheit size={30} color="#E7E7EB" className="text-bold" />
        </button>
      </div>
      <AsideContainer />
      <MainContainer />
    </div>
  );
}

export default App;
