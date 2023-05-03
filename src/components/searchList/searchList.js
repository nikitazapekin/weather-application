import { store } from "../store/store"
import {Routes,Route, Link } from"react-router-dom"
import "./searchList.css"
import { connect } from 'react-redux';
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Navigation } from "../date/navigation/navigation";
import Fir from "./1.png"
import Sec from "./2.png"
import Thir from "./3.png"
import Four from "./4.png"
import Fifth from "./5.png"
import Six from "./6.png"
import Sev from "./7.png"
import Nine from "./9.png"
import Ten from "./10.png"
import { Footer } from "../footer/footer";
import { Fons } from "../fons/fons";

 export const SearchList =(props)=> {
  const { counter, incrementCounter } = props;
  const {id} = useParams();
  const [state, setState]=useState()
  const [country, setCountry]=useState()
  const [city, setCity]=useState()
  const [stat, setStat]=useState('')
  const [county, setCounty]=useState('')
  const [data, setData]=useState()
  const [temp, setTemp]=useState([])
  const [newArr, setNewArr] = useState([]);
  const [date, setDate]=useState([])
  const [boolHeart, setBoolHeart]=useState(true)
const [arrayOfMin, setArrayOfMin]=useState([])
const [datas, setDatas]=useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [dataVisib, setDataVisib] =useState() 
const [arOfWeath, setArOfWeath]=useState()
const [latitude, setLatitude]=useState("")
const [longitude, setLongitude]=useState("")
//if(arrOfRain!=undefined && arrayOfProps!=undefined && arrayOfVis!=undefined &&data!=undefined && dataVisib!=undefined){
 // const [arrayOfProps, setArrayOfProps] =useState()
 const [arrOfRain, setArrayOfRain]=useState()
  const [arrayOfProps, setArrayOfProps]=useState()
  const [arrayOfVis, setArrayOfVis]=useState()
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state);
  const increment = () => {
    const item=1;
   dispatch({ type: "tt", item: item });
  // console.log(stateData)
  };
  useEffect(() => {
    // Установка значения boolHeart в true при изменении data
    setBoolHeart(true);
  }, [data]);
useEffect(()=>{
 if(id!=undefined){
 const str = id;
const parts = str.split(',');
const latitude = parts[0]; 
setLatitude(latitude)
const longitude = parts[1]; 
setLongitude(longitude)

 const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
 const visibUrl=`https://api.open-meteo.com/v1/gfs?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,visibility&forecast_days=16`
fetch(url)
  .then(response => response.json())
  .then(data => {
   setCountry(data.address.city)
  setStat(data.address.state)
  setStat(data.address.county)
  })
  .catch(error => {
    console.error('Error:', error);
  }); 
 
  const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
        fetch(geoUrl)
          .then(responses => responses.json())
          .then(data => {
            const city = data.results[0].components.city;
            const country = data.results[0].components.country;
            const state = data.results[0].components.state;
           // dispatch({type: "ADD_COORDS", latitude: latitude, longitude: longitude, city: city, country: country, state: state})
           const stroke="";
          setCity(city)
          setCountry(country)
          setState(state)
          }); 
  fetch(visibUrl)
  .then(response => response.json())
  .then(data => {
 setDataVisib(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
  fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
   setData(data)
const arrayOfTemp = data.hourly.temperature_2m.map(item => item);
const arrayOfTime = data.hourly.time.map(item => item);
const newArrr = arrayOfTemp.concat(arrayOfTime);
setTemp(arrayOfTemp)
setDate(arrayOfTime)
setNewArr(newArrr);
  })
  .catch(error => {
    console.error('Error:', error);
  }); 
}
}, [id])
useEffect(() => {
  const tempArray = []
  const maxTempArray=[]
  const arrayOfDatas=[]
  for (let i = 0; i < temp.length; i+=24) {
      const currentData=date[i].slice(0,10)
      arrayOfDatas.push(currentData)
    let currentMin = 100

    for (let j = i; j < i+24 && j < temp.length; j++) {
      if (temp[j] < currentMin) {
        currentMin = temp[j]
      }
    }
    tempArray.push(Math.round(currentMin))
  }
  setArrayOfMin(tempArray)
setDatas(arrayOfDatas)
  for (let i = 0; i < temp.length; i+=24) {
      let currentMax = -100
      for (let j = i; j < i+24 && j < temp.length; j++) {
        if (temp[j] > currentMax) {
          currentMax = temp[j]
        }
      }
      maxTempArray.push(Math.round(currentMax))
    }

setArrayOfMax(maxTempArray)

if(data!=undefined && dataVisib!=undefined) {
setArrayOfRain(data.hourly.rain)
setArrayOfVis(dataVisib.hourly.visibility)
setArrayOfProps(data.hourly.precipitation_probability)
}
if(arrOfRain!=undefined && arrayOfProps!=undefined && arrayOfVis!=undefined && data!=undefined && dataVisib!=undefined){
  const arrOfWeath=[]
  for(let i=0; i<data.hourly.rain.length; i+=24){
    const resultArray=[]
    for(let j=i;  j < i+24 && j < data.hourly.rain.length; j++) {
      if (arrOfRain[j] >= 0.3) {
        resultArray.push('дождь');
      } else if (arrayOfVis[j] < 1000) {
        resultArray.push('туман');
      } else if (arrayOfProps[j] > 1) {
        resultArray.push('осадки');
      } else {
        resultArray.push('солнечно');
      }
    }
  const item=findMostFrequent(resultArray)
  arrOfWeath.push(item)
  }
  setArOfWeath(arrOfWeath)
  }

}, [temp, arOfWeath])
const findMostFrequent = (arr) => {
  const obj = {};
  let max = 0;
  let result = '';

  for (const item of arr) {
    obj[item] = obj[item] ? obj[item] + 1 : 1;
    if (obj[item] > max) {
      max = obj[item];
      result = item;
    }
  }

  return result;
};

useEffect(() => {
  if (data && arrOfRain !== undefined && arrayOfVis !== undefined && arrayOfProps !== undefined) {
    const arrOfWeath = [];
    for (let i = 0; i < data.hourly.rain.length; i += 24) {
      const resultArray = [];
      for (let j = i; j < i + 24 && j < data.hourly.rain.length; j++) {
        if (arrOfRain[j] >= 0.3) {
          resultArray.push('дождь');
        } else if (arrayOfVis[j] < 1000) {
          resultArray.push('туман');
        } else if (arrayOfProps[j] > 1) {
          resultArray.push('осадки');
        } else {
          resultArray.push('солнечно');
        }
      }
      const item = findMostFrequent(resultArray);
      arrOfWeath.push(item);
    }
    setArOfWeath(arrOfWeath);
  }
}, [data, arrOfRain, arrayOfVis, arrayOfProps, setArOfWeath]);


 const arrayOfImages=[Fir, Sec, Thir, Four, Fifth, Six, Sev] 
const renderMin = arrayOfMin.map(item => {
  return <div>{item}</div>
})
const renderMax = arrayOfMax.map(item => {
  return <div>{item}</div>
})
const renderItems=renderMax.map((item, index)=> {
  let imageSrc;
  if(arOfWeath!=undefined){
  if (arOfWeath[index] === "солнечно" ) {
    imageSrc = arrayOfImages[3];
  } else if (arOfWeath[index] === "туман") {
    imageSrc = arrayOfImages[0];
  } else if (arOfWeath[index] === "дождь") {
    imageSrc = arrayOfImages[6];
  } else if (arOfWeath[index] === "осадки") {
    imageSrc = arrayOfImages[0];
  } 
  } 
 
  const cities=[]
  if(city!=undefined && country!=undefined && state!=undefined){
if(city!=null){
  cities.push(city)
}
if(country!=null){
  cities.push(city)
}
if(state!=null){
cities.push(state)
}
console.log(cities)
  }


return <a onClick={()=>{
 
 }}  style={{ textDecoration: 'none' }} className='styleLink1' href="#">
  <Link style={{ textDecoration: 'none' }} to={`/searched/country/${latitude}/${longitude}/${datas[index]}/${city ? city : (state ? state : country)}`}>
        <span>
        <div className='renderedCurrentCityTemperature' key={index}><div className="renderedCurrentCityTemperatureFon">
          </div>
      <div className="ttty">  {arrayOfMin[index] }- {item}°</div>
       <div className="qw">  {datas[index]} </div> 
       <img style={{zIndex: "1000"}} src={imageSrc} alt="logo" className="renderedCurrentCityWeatherLogo" /> 
          </div><span style={{opacity: "0"}}>;</span>
          <i></i></span>
          </Link> 
          </a> 
})
    return( 
    <div className="searchList">
      <Fons />
    {/*  <Navigation /> */}
  {/*  <h1>Counter: {count}</h1> */}
      <button  style={{position: "relative", top: "100px"}} onClick={increment}>Increment</button>
    <div style={{position:"relative", top: "100px"}}>
  <div className="selectedCountry">  {city} {state} {country} </div>
  <div className="tableTemperature">{renderItems}</div>
  <div className="addToFavourite"></div>
</div>
<div className="addToFavouriteWrapper" onClick={()=> {
  if(boolHeart===false){
    setBoolHeart(true)
    dispatch({type: "REMOVE_FROM_FAV", latitude: latitude, longitude: longitude, city: city, country: country, state: state})
    dispatch({type: "REMOVE_FROM_FAV_CITY",  city: city, country: country, state: state})
  }
  else{
    setBoolHeart(false)
    dispatch({type: "ADD_TO_FAV", latitude: latitude, longitude: longitude, city: city, country: country, state: state})
    dispatch({type: "ADD_TO_FAV_CITY",  city: city, country: country, state: state})
   
  }
 
 
}}>
<img src={boolHeart ? Nine : Ten} alt="logo" className="addToFavourite" /> 

</div>
<Footer />
   <Navigation />
    </div>
    )
}
export default SearchList;
