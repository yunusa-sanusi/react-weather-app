import React, { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { daysOfWeek, monthsOfYear } from "./monthDay";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState({ state: "", country: "" });
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("metric");

  const getWeatherData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      return (
        <div className="w-full h-screen flex jusitfy-center items-center loading">
          <h1 className="text-lg">Couldn't fetch data</h1>
        </div>
      );
    }
  };

  const getLocationName = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const locationData = data[0];
      setLocation({ state: locationData.state, country: locationData.country });
      setLoading(false);
    } catch (error) {
      setLocation({ state: "", country: "" });
    }
  };

  const convertTempUnit = (tempUnit) => {
    return setUnit(tempUnit);
  };

  const formatDate = (opwFormat, timezoneOffset) => {
    const date = new Date(opwFormat * 1000 + timezoneOffset * 1000);
    const dayCount = date.getDate();
    const day = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    return `${day}, ${dayCount} ${month}`;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unit}`;

    const locationNameApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    getWeatherData(weatherApiUrl);
    getLocationName(locationNameApiUrl);
  }, [lat, lon, unit]);

  if (loading) {
    return (
      <div className="w-full h-screen flex jusitfy-center items-center loading">
        <ClipLoader color={"#E7E7EB"} loading={loading} size={100} />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{ location, unit, weatherData, convertTempUnit, formatDate }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
