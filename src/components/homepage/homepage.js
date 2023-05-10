


import React, { useState, useEffect } from 'react';
import {Routes,Route, Link } from"react-router-dom"

import Sunn from "./image.png"
import Palz from "./palz.png"
import "./homepage.css";
import {  useSearchParams } from 'react-router-dom';
import { InputSearch } from '../inputSearch/inputSearch';
import MyComponent from '../test/test';
import { Navigation } from '../date/navigation/navigation';
import { CurrentWeather } from '../currentWeather/currentWeather';
//import translate from 'translate-google';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { connect } from 'react-redux';
import { SearchList } from '../searchList/searchList';
//import { Footer } from '../footer/footer';
import { Footer } from '../footer/footer';
import Sld from '../slider/slider';
import { Fons } from '../fons/fons';
import { useTranslation } from 'react-i18next';
const Homepage = (props) => {
  const { t } = useTranslation();
  const {id}=props
  const [city, setCity] = useState("");
  const [newArr, setNewArr] = useState([]);
  const [temp, setTemp]=useState([])
  const [date, setDate]=useState([])
  const [boolCheck, setBoolCheck] = useState(true); // initialize with true
const [data, setData]=useState()
const [dataVisib, setDataVisib]=useState()
const dispatch = useDispatch();
const state = useSelector((state) => state);
const [getCurrentDate, setGetCurrentDate]=useState("")
const langg= state.stateOfLang
const [timezone, setTimezone]=useState("")
console.log("langg from home"+ langg)
const getDate=(event)=> {
setGetCurrentDate(event)
}
const [currentTiming, setCurrentTiming]=useState("")
const timing=(event)=> {
setCurrentTiming(event)
}

  useEffect(() => {
    function successCallback(position) {
      setBoolCheck(false); 
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
   const latitude=position.coords.latitude
   const longitude=position.coords.longitude
 dispatch({type: "ADD_COORDS", latitude: latitude, longitude: longitude})
      fetch(geoUrl)
        .then(responses => responses.json())
        .then(data => {
          const city = data.results[0].components.city;
         // console.log(city)
       //  console.log(data)
         const timez=data.results[0].annotations.timezone.name
       //  console.log(timez)
       setTimezone(timez)
          setCity(city)
          dispatch({type: "ADD_COORDS", latitude: latitude, longitude: longitude, city: city})
        });
      
      async function fetchAsyncTodos() {// ,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m
       // const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,rain,showers,snowfall,precipitation&forecast_days=16`;
       const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
       const visibUrl=`https://api.open-meteo.com/v1/gfs?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,visibility&forecast_days=16`
       const response = await fetch(weatherUrl);
       const responseVisib= await fetch(visibUrl)
        const data = await response.json();
        const dataVisib = await responseVisib.json();
        //console.log("data" +JSON.stringify(data))
        setData(data)
setDataVisib(dataVisib)

dispatch({type: "ADD", data})
        const arrayOfTemp = data.hourly.temperature_2m.map(item => item);
        const arrayOfTime = data.hourly.time.map(item => item);
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
//=============================================
function findMostFrequent(arr) {
  let maxCount = 0;
  let mostFrequent;

  for (let i = 0; i < arr.length; i++) {
    let count = 0;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        count++;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      mostFrequent = arr[i];
    }
  }

  return mostFrequent;
}





useEffect(() => {
  if (data !== undefined) {

  } 
}, [data]);

const [arrOfRain, setArrayOfRain]=useState()
const [arrayOfProps, setArrayOfProps]=useState()
const [arrayOfVisib, setArrayOfVisib]=useState()
useEffect(()=> {
  if(data != undefined && dataVisib!=undefined) {
    console.log("data" +JSON.stringify(data))
  //  setArrayOfRain(data.horly.rain)
  setArrayOfRain(data.hourly.rain)
    setArrayOfVisib(dataVisib.hourly.visibility)
    setArrayOfProps(data.hourly.precipitation_probability)
  }
}, [data]);
//console.log("data"+JSON.stringify(data))
  return (
    <div className="homepage">
      <Fons />
      <img
        style={style}
        className="loadBar"
        src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"
        alt="loading"
      />
      {/*<Footer />  */}
      <div   style={{ zIndex: "1", marginTop: "50px" }}>
        <Time timing={timing} />
  </div>  
  
<div class="sketchy1">{t('homepage.welcome')}
  <img src={Palz} alt="palz" className="palz" />
  </div>

 
{data!=undefined && (


      <CurrentWeather
      timezone={timezone}
        getDate={getDate}
        dataVisib={dataVisib}
        data={data}
        temp={temp}
        date={date}
        newArr={newArr}
        city={city}
  /> 
  )}
     
     <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  zIndex: "11111111111", height: "120px"  }}>
        <Navigation id={id} />
</div> 






    </div>
  );
  
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
    <div style={{zIndex: "0"}} className='Time'>
     <img src={Sunn} alt="sun" className="sun" />  
     <div className="day">{date.toLocaleDateString('ru-RU', {weekday: 'long'})}{' '}</div>
      <div className="date">{date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}{' '}</div> 
    
      <div className="time">{date.toLocaleTimeString()}</div>
      <div className="wrapperTime"></div>
    </div>
  );
}

export { Homepage }



//https://api.open-meteo.com/v1/forecast?latitude=53.93&longitude=30.36&hourly=temperature_2m,rain,showers