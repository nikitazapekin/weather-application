
import { useState, useEffect } from 'react';
import "./App.css"
import { InputSearch } from './components/inputSearch/inputSearch';
import MyComponent from './components/test/test';
import { Navigation } from './components/date/navigation/navigation';
import { Homepage } from './components/homepage/homepage';
function App(){
  return <div className="App">
    
    <Homepage />
  </div>
}

export default App;
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