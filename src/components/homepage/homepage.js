


import React, { useState, useEffect } from 'react';
import {Routes,Route, Link } from"react-router-dom"
import "./homepage.css";
import {  useSearchParams } from 'react-router-dom';
import { InputSearch } from '../inputSearch/inputSearch';
import MyComponent from '../test/test';
import { Navigation } from '../date/navigation/navigation';
import { CurrentWeather } from '../currentWeather/currentWeather';
//import translate from 'translate-google';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { SearchList } from '../searchList/searchList';
const Homepage = (props) => {
  const {id}=props
  const [city, setCity] = useState("");
  const [newArr, setNewArr] = useState([]);
  const [temp, setTemp]=useState([])
  const [date, setDate]=useState([])
  const [boolCheck, setBoolCheck] = useState(true); // initialize with true
const [data, setData]=useState()
const dispatch = useDispatch();
const state = useSelector((state) => state);
  useEffect(() => {
    function successCallback(position) {
      setBoolCheck(false); 
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
      fetch(geoUrl)
        .then(responses => responses.json())
        .then(data => {
          const city = data.results[0].components.city;
         // console.log(city)
          setCity(city)
        });
      
      async function fetchAsyncTodos() {// ,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m
       // const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,rain,showers,snowfall,precipitation&forecast_days=16`;
       const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
       const response = await fetch(weatherUrl);
        const data = await response.json();
        //console.log("data" +JSON.stringify(data))
        setData(data)


dispatch({type: "ADD", data})
        const arrayOfTemp = data.hourly.temperature_2m.map(item => item);
        const arrayOfTime = data.hourly.time.map(item => item);
       // const arrayOfRain=data.hourly.temperature_2m.rain.map(item=> item)
       // console("rain"+data.hourly.rain)
        const newArr = arrayOfTemp.concat(arrayOfTime);
        setTemp(arrayOfTemp)
        setDate(arrayOfTime)
        setNewArr(newArr);
      }
      fetchAsyncTodos();
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
      console.log(errorMessage);
      setBoolCheck(false); // hide the loading image
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
      setBoolCheck(false); // hide the loading image
    }
  }, []);




const len =newArr.length/2;
const finalRender=newArr.slice(0, len).map((item, index)=> {
return <div>{Math.round(item)} {newArr[index+len]}</div>
})
const style={
display: boolCheck ? "block" : "none" // show the loading image if boolCheck is true
}

  return (
    <div className="homepage">
       <img style={style} className='loadBar' src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif" alt="loading" />
      <Navigation id={id} />
      <Time />
      <img className='backgroundFon' src="https://media.giphy.com/media/xT0xeNf2csFIbeAxvq/giphy.gif" alt="fon" />
   {/*   {finalRender} */}
      <CurrentWeather data={data} temp={temp} date={date} newArr={newArr} city={city}  />
    {/* <SearchList newArr={newArr}/> */}
    </div>
  )
}

function Time() {
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
      <div className="day">{date.toLocaleDateString('en-US', {weekday: 'long'})}{' '}</div>
      <div className="date">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '}</div>
      <div className="time">{date.toLocaleTimeString()}</div>
      <div className="wrapperTime"></div>
    </div>
  );
}

export { Homepage }



//https://api.open-meteo.com/v1/forecast?latitude=53.93&longitude=30.36&hourly=temperature_2m,rain,showers