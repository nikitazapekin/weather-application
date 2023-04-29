


import React, { useState, useEffect } from 'react';
import {Routes,Route, Link } from"react-router-dom"
import { Fons } from '../fons/fons';
import Sunn from "./image.png"
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
import { Footer } from '../footer/footer';

const Homepage = (props) => {
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
    console.log(JSON.stringify(data));
    for (let i = 0; i < data.length; i += 24) {
      console.log(data[i]);
      const arrayOfVis = [];
      const arrayOfRain = [];
      const arrayOfProps = [];
      const resultArray = [];
      for (let j = i; j < i + 24 && j < data.length; j++) {
        arrayOfProps.push(data.hourly.precipitation_probability[j]);
        arrayOfRain.push(data.hourly.rain[j]);
        arrayOfVis.push(data.hourly.visibility[j]);
        console.log(data.hourly.visibility[j])
      }
      for (let z = 0; z < arrayOfRain.length; z++) {
        if (arrayOfRain[z] >= 0.3) {
          resultArray.push("дождь");
        } else if (arrayOfVis[z] < 1000) {
          resultArray.push("туман");
        } else if (arrayOfProps[z] > 1) {
          resultArray.push("осадки");
        } else {
          resultArray.push("солнечно");
        }
      }
      console.log(resultArray);
    }
  }
}, [data]);
/*
useEffect(()=> {

if(data!=undefined){
  console.log(JSON.stringify(data))
for (let i = 0; i < data.length; i+=24) {
  console.log(data[i])
  const arrayOfVis=[]
  const arrayOfRain=[]
  const arrayOfProps=[]
    for (let j = i; j < i+24 && j < data.length; j++) {
 arrayOfProps.push(data.hourly.precipitation_probability[j])
 arrayOfRain.push(data.hourly.rain[j])
 arrayOfVis.push(data.hourly.visibility[j])
    }
  const resultArray=[]
  for (let z = 0; z < 24; i++) {
    if (arrayOfRain[z] >= 0.3) {
      resultArray.push('дождь');
    } else if (arrayOfVis[z] < 1000) {
      resultArray.push('туман');
    } else if (arrayOfProps[z] > 1) {
      resultArray.push('осадки');
    } else {
      resultArray.push('солнечно');
    }
  }
  console.log(resultArray)
  }
}
}, [data]) */
useEffect(()=> {
  if(data != undefined) {
 //   console.log(JSON.stringify(data))
    const ttem = data.hourly.time;
    const modifiedArray = ttem.map((element) => {
      return element.slice(0, -6);
    });
    for (let i = 0; i < data.length; i+=24) {
  const arrayOfVis=[]
  const arrayOfRain=[]
  const arrayOfProps=[]
    for (let j = i; j < i+24 && j < data.length; j++) {
 arrayOfProps.push(data.hourly.precipitation_probability[j])
 arrayOfRain.push(data.hourly.rain[j])
 arrayOfVis.push(data.hourly.visibility[j])
    }
  const resultArray=[]
  for (let z = 0; z < 24; i++) {
    if (arrayOfRain[z] >= 0.3) {
      resultArray.push('дождь');
    } else if (arrayOfVis[z] < 1000) {
      resultArray.push('туман');
    } else if (arrayOfProps[z] > 1) {
      resultArray.push('осадки');
    } else {
      resultArray.push('солнечно');
    }
  }
  console.log(resultArray)
  }
//setCurrentDate(idd)
 /*   const indices = modifiedArray.reduce((accumulator, element, index) => {
      if (element === idd) {
        accumulator.push(index);
      }
      return accumulator;
    }, []); */
   // setIndexes(indices);
    //console.log(indices)
   // console.log(JSON.stringify(data))
  }
}, [data]);
/*
const rendPresProp=data.hourly.precipitation_probability.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
  return item;
}); 
const rendVis=dataVisib.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
  return item;
});

const rendShowers=data.hourly.showers.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
  return item;
});
const cloudcover_low=data.hourly.cloudcover_low.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
  return item;
});

const rendRain=data.hourly.rain.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
  return item;
});
console.log(rendVis) */
//==========================================

  return (
    <div className="homepage">
      <Fons />
     <img style={style} className='loadBar' src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif" alt="loading" /> 
      <Navigation id={id} />
      <Time timing={timing} /> 
 {/* <Date timing={timing} /> */}
      <CurrentWeather getDate={getDate} dataVisib={dataVisib} data={data} temp={temp} date={date} newArr={newArr} city={city}  />
  <button className='testBtn' onClick={()=> {
    console.log(currentTiming)
  }}>show state</button>
      {Footer}
   
    </div>
  )
}
//import {Sunn} from "./image.png"
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
     <img src={Sunn} alt="sun" className="sun" />  
      <div className="day">{date.toLocaleDateString('en-US', {weekday: 'long'})}{' '}</div>
      <div className="date">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '}</div>
      <div className="time">{date.toLocaleTimeString()}</div>
      <div className="wrapperTime"></div>
    </div>
  );
}

export { Homepage }



//https://api.open-meteo.com/v1/forecast?latitude=53.93&longitude=30.36&hourly=temperature_2m,rain,showers