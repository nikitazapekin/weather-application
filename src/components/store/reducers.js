import axios from "axios";
import thunk from "redux-thunk";
  export const fetchData = () => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_REQUEST' });
  
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?id=625143&appid=fc64e04f2a354206a57c0d4cf2ca7ea0'
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
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
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };