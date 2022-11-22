import React, { useEffect, useContext, useReducer } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { initialState, ACTION_TYPES, weatherReducer } from './reducer';

import { daysOfWeek, monthsOfYear } from './monthDay';

const AppContext = React.createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { weatherData, loading, location, lat, lon, unit } = state;

  const getWeatherData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: ACTION_TYPES.SET_WEATHER_DATA,
        payload: { weatherData: data },
      });
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
      dispatch({
        type: ACTION_TYPES.SET_LOCATION_NAME,
        payload: {
          location: {
            state: locationData.state,
            country: locationData.country,
          },
          loading: false,
        },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.SET_LOCATION_NAME,
        payload: { location: { state: '', country: '' }, loading: false },
      });
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      dispatch({
        type: ACTION_TYPES.SET_CURRENT_LOCATION,
        payload: { lat, lon },
      });
    });
  };

  const convertTempUnit = (tempUnit) => {
    dispatch({ type: ACTION_TYPES.SET_UNIT, payload: { unit: tempUnit } });
  };

  const formatDate = (opwFormat, timezoneOffset) => {
    const date = new Date(opwFormat * 1000 + timezoneOffset * 1000);
    const dayCount = date.getDate();
    const day = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    return `${day}, ${dayCount} ${month}`;
  };

  useEffect(() => {
    getCurrentLocation();

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unit}`;

    const locationNameApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    getWeatherData(weatherApiUrl);
    getLocationName(locationNameApiUrl);
  }, [lat, lon, unit]);

  if (loading) {
    return (
      <div className="w-full h-screen flex jusitfy-center items-center loading">
        <ClipLoader color={'#E7E7EB'} loading={loading} size={100} />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        location,
        unit,
        weatherData,
        convertTempUnit,
        formatDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
