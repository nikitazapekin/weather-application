import axios from "axios";
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
//import { createStore } from 'redux';
import { createStore, applyMiddleware } from 'redux';

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
  export const dataForSearchList=(state=[], action)=>{
      switch(action.type){
        case "ADD": {
         state=action.data 
          console.log("state"+state)
          return state
        }
        default: {
          return state;
        }
      }
  } 

 export const fav=(state=[], action)=> {
  switch (action.type){
    case "ADD_TO_FAV":{
      //const arr=[action.latitude, action.longitude]
     // state=state[...state, action.latitude, action.longitude]
     state.push(action.latitude)
     state.push(action.longitude)
    // state.push(1)
    // state.push(arr)
     console.log(state)
     return state
    }
    case "REMOVE_FROM_FAV":{
    //  const arr=[action.latitude, action.longitude]
     // state=state[...state, action.latitude, action.longitude]
   //  state.push(arr)
   state=state.filter((item, index)=> item!=action.latitude)
   state=state.filter((item, index)=> item!=action.longitude)
     console.log(state)
     return state
    }
    default: {
      return state
    }
  }
 /* state = [...state, action.item];
  console.log(state)
return state */
 }



  /*
  import { combineReducers } from 'redux';
  import thunk from "redux-thunk";
  import { createStore, applyMiddleware } from 'redux';
  import axios from "axios";
  
  const fetchData = (country) => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_REQUEST', country: country });
  
      try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${country}&count=100&language=en&format=json&hourly=temperature_2m&forecast_days=7&admin1_id=true&admin2_id=true&daily=true`);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data, country: country });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };
  };
  export {fetchData}
  const dataInitialState = [];
  const dataForSearchList = (state = dataInitialState, action) => {
    switch (action.type) {
      case "ADD": {
        state = action.data;
        console.log("state" + state)
        return state;
      }
      default: {
        return state;
      }
    }
  }
  export {dataForSearchList}
  const weatherInitialState = {
    data: [],
    loading: false,
    error: null,
    country: null
  };
  
  const weatherReducer = (state = weatherInitialState, action) => {
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
  
  const rootReducer = combineReducers({
    weather: weatherReducer,
    dataForSearchList: dataForSearchList
  });
  
  const store = createStore(rootReducer, applyMiddleware(thunk));
  console.log(store.getState());
  
  export default store; */