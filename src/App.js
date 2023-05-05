
import { useState, useEffect } from 'react';
import "./App.css"
//import { connect } from 'react-redux';
import { InputSearch } from './components/inputSearch/inputSearch';
import {Sun} from "./image.png"
import MyComponent from './components/test/test';
import {  useSearchParams } from 'react-router-dom';
import { Navigation } from './components/date/navigation/navigation';
import { Homepage } from './components/homepage/homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchList } from './components/searchList/searchList';
import { List } from './components/list/list';
import { CurrentHour } from './components/currentHour/currentHour';
import { SearchedHours } from './components/searchedHours/searchedHours';
import { Favourite } from './components/favourite/favourite';
import WeatherForecast from './components/testSearch/testSearch';
import { Wind } from './components/wind/wind';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { CurrentWind } from './components/currentWind/currentWind';
import { Pressure } from './components/pressure/pressure';
import PressureCurrent from './components/pressureCurrent/pressureCurrent';
import TestComp from './components/testComp/testComp';
//import "./i18n"
import i18n from 'i18next';

function App(){
 
const [city, setCity]=useState('')



/*
document.body.style.overflow = 'hidden'
document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=> {
        document.querySelector('.fon').style.display = 'none';
        document.body.style.overflow = ''
    },1000)
}) */
  useEffect(() => {
    function successCallback(position) {
     // setBoolCheck(false); 
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
      fetch(geoUrl)
        .then(responses => responses.json())
        .then(data => {
          const city = data.results[0].components.city;
       //console.log("city app"+city)
     setCity(city)
        });
    }

    function errorCallback(error) {
      let errorMessage = "";
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Пользователь отказался предоставить местоположение";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Местоположение недоступно";
          break;
        case error.TIMEOUT:
          errorMessage = "Таймаут при запросе местоположения";
          break;
        default:
          errorMessage = "Произошла неизвестная ошибка";
      }
    //  console.log(errorMessage);
    //  setBoolCheck(false); // hide the loading image
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
   //   setBoolCheck(false); // hide the loading image
    }
  }, []);






  const id=22
  return(
    
    <div className="App">
    <div className='tttttt'></div>
  
<div>
     
    </div>
    <Routes >
  <Route path="/" element={ <Homepage id={id}/>} />
  <Route path="/favourite" element={ <Favourite />} />
  <Route path="/wind/:id/:idd" element={ <Wind />} />
 <Route path=":id" element={<SearchList />} /> 
 <Route path="/pressure/:id/:idd" element={<Pressure />} /> 
 <Route path="/test/:id" element={<List />} /> 
 <Route path="/pressurecurrent/:id/:idd/:iddd" element={<PressureCurrent />} /> 
 <Route path="/currentwind/:id/:idd/:iddd" element={<CurrentWind />} /> 
 <Route path="/current/:id/:idd" element={<CurrentHour />} /> 
 <Route path="/searched/country/:id/:idd/:iddd/:idddd" element={<SearchedHours />} /> 
</Routes>


  </div>
  )
}

//export default App;

function mapStateToProps(state) {
  return {
    counter: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCounter: () => dispatch({ type: 'ad' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=fc64e04f2a354206a57c0d4cf2ca7ea0');

//https://www.figma.com/file/QzR65XLC5oQrsDTn3kFVN7/WEATHER-APP-(Community)?node-id=0%3A1&t=W7NUznGq5AoaQX3R-1
//open meteo
//https://api.open-meteo.com/v1/forecast?latitude=53.89&longitude=27.56&hourly=temperature_2m&forecast_days=16
//https://api.open-meteo.com/v1/forecast?latitude=53.89&longitude=27.56&hourly=temperature_2m&forecast_days=7&country=minsk


//https://open-meteo.com/en/docs/geocoding-api
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json&hourly=temperature_2m&forecast_days=7
//https://geocoding-api.open-meteo.com/v1/search?name=Vitebsk&count=10&language=en&format=json&hourly=temperature_2m&forecast_days=7&admin1_id=true





//https://geocoding-api.open-meteo.com/v1/search?name=Brest&count=10&language=en&format=json&hourly=temperature_2m&forecast_days=7&admin1_id=true&admin2_id=true&daily=true



//https://api.open-meteo.com/v1/forecast?latitude=48.39&longitude=-4.48&hourly=temperature_2m

//https://geocoding-api.open-meteo.com/v1/search?name=Brest&count=10&language=en&format=json&hourly=temperature_2m&forecast_days=7&admin1_id=true&admin2_id=true&daily=true