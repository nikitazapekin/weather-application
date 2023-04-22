import axios from "axios";
import thunk from "redux-thunk";
  export const fetchData = (country) => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_REQUEST', country: country });
  
      try {
        const response = await axios.get(
      //    'https://api.openweathermap.org/data/2.5/weather?id=625143&appid=fc64e04f2a354206a57c0d4cf2ca7ea0'
      `https://geocoding-api.open-meteo.com/v1/search?name=${country}&count=100&language=en&format=json&hourly=temperature_2m&forecast_days=7&admin1_id=true&admin2_id=true&daily=true`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data, country: country });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };
  };
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
   export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, data: action.payload, country: action.country };
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };