
import { useState, useEffect } from 'react';
import "./App.css"
import { InputSearch } from './components/inputSearch/inputSearch';
import MyComponent from './components/test/test';
function App(){
  return <div className="App">
   <Time /> 
  effe
 
   <MyComponent /> 

  <InputSearch />
  </div>
}



function Time(){
  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
   
   <div className='Time'>
 <div className="day"> {date.toLocaleDateString('en-US', {weekday: 'long'})}{' '} </div>
 <div className="date">   {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '} </div>
  <div className="time">{date.toLocaleTimeString()}</div> 
  <div className="wrapperTime"></div>
</div>

  );
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