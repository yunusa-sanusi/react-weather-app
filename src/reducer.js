export const initialState = {
  lat: 0.0,
  lon: 0.0,
  weatherData: {},
  location: { state: '', country: '' },
  loading: true,
  unit: 'metric',
};

export const ACTION_TYPES = {
  SET_WEATHER_DATA: 'SET_WEATHER_DATA',
  SET_LOCATION_NAME: 'SET_LOCATION_NAME',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_UNIT: 'SET_UNIT',
};

export const weatherReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_WEATHER_DATA:
      return { ...state, weatherData: payload.weatherData };
    case ACTION_TYPES.SET_LOCATION_NAME:
      return { ...state, location: payload.location, loading: payload.loading };
    case ACTION_TYPES.SET_CURRENT_LOCATION:
      return { ...state, lat: payload.lat, lon: payload.lon };
    case ACTION_TYPES.SET_UNIT:
      return { ...state, unit: payload.unit };
    default:
      return state;
  }
};
