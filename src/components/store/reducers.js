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
  export const stateOfLang=(state=true, action)=>{
    switch(action.type){
      case "EN": {
      state=false
      console.log("En"+state)
        return state
      }
      case "RU": {
        state=true
        console.log("RU"+state)
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
     state.push(action.latitude)
     state.push(action.longitude)
     console.log(state)
    state = state.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    
     return state 

    }
    case "REMOVE_FROM_FAV":{
   state=state.filter((item, index)=> item!=action.latitude)
   state=state.filter((item, index)=> item!=action.longitude)
     console.log(state)
     return state
    }
    default: {
      return state
    }
  }
 }
export const coords=(state=[], action)=>{
switch (action.type){
  case "ADD_COORDS": {
    const latitude=action.latitude
    const longitude=action.longitude
    state=[]
    
    state.push(latitude)
    state.push(longitude)
    if(action.state!=undefined){
      state.push(action.state)
    }
    if(action.country!=undefined){
      state.push(action.country)
    }
    if(action.city!=undefined){
      state.push(action.city)
    }
  console.log("COOORSDDDDDS"+state)
return state
  }
  default: {
    return state
  }
}
}

 export const favCities=(state=[], action)=> {
  switch (action.type){
    case "ADD_TO_FAV_CITY": {
state.push(action.city)
state.push(action.state)
state.push(action.country)
//state.push(action.timezone)
console.log(state)
state = state.filter((value, index, self) => {
  return self.indexOf(value) === index;
});

return state
    }
    case "REMOVE_FROM_FAV_CITY": {
      state=state.filter((item, index)=> item!=action.city)
      state=state.filter((item, index)=> item!=action.country)
      state=state.filter((item, index)=> item!=action.state)
   //   state=state.filter((item, index)=> item!=action.timezone)
      console.log(state)
      return state
    }
    default: {
      return state
    }
  }
 }
 export const enTimezone=(state=[], action)=>{
switch(action.type){
  case "ADD_EN_TIMEZONE": {
    state.push(action.timezone)
    return state
  }
  case "REM_EN_TIMEZONE": {
    state=state.filter((item, index)=> item!=action.timezone)
    return state
  }
  default: {
return state
  }
}
 }