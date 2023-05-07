import { Navigation } from "../date/navigation/navigation"
import {Routes,Route, Link } from"react-router-dom"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Fons } from "../fons/fons";
import Fir from "./1.png"
import Sec from "./2.png"
import Third from "./3.png"
import Fiv from "./5.png"
import Six from "./6.png"
import "./wind.css"
const Wind=()=> {
    const {id, idd} = useParams();
    const [wind, setWind]=useState()
    const [data, setData]=useState()
    const dispatch = useDispatch();
    const stateData = useSelector((state) => state);
const stat=stateData.coords
const [city, setCity]=useState("")
const [country, setCountry]=useState("")
const [state, setState]=useState("")
console.log("stat"+stat)
console.log(id)
console.log(idd)


const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${id}+${idd}&key=f9629a9e6fd7493aac20c35043c7e411`;
fetch(geoUrl)
  .then(responses => responses.json())
  .then(data => {
    console.log(JSON.stringify(data))
    const city = data.results[0].components.city;
    const country = data.results[0].components.country;
    const state = data.results[0].components.state;
   // dispatch({type: "ADD_COORDS", latitude: id, longitude: idd, city: city, country: country, state: state})
   const stroke="";
  setCity(city)
  setCountry(country)
  setState(state)
  console.log(state)
  console.log(city)
  console.log(country)
  });  
useEffect(()=> {
async function test(){
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${id}&longitude=${idd}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  console.log("data"+JSON.stringify(weatherData))
  setData(weatherData)
  setWind(weatherData.hourly.windspeed_10m)
}
test()
}, [id, idd])

    async function fetchAsyncTodos() {
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${id}+${idd}&key=f9629a9e6fd7493aac20c35043c7e411`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      const city = geoData.results[0].components.city;
      
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${id}&longitude=${idd}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      console.log("data"+JSON.stringify(weatherData))
      setData(weatherData)
     setWind(weatherData.hourly.windspeed_10m)
    }
    useEffect(() => {
      fetchAsyncTodos();
    }, [id, idd]);
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
          const [arOfWind, setArOfWind]=useState()
const arrOfWeath=[]

useEffect(()=> {


if(wind!=undefined){
          for(let i=0; i<wind.length; i+=24){
         
            const resultArray=[]
            for(let j=i;  j < i+24 && j <wind.length; j++) {
              if (wind[j] >= 72) {
                resultArray.push('сильный ветер');
              } else if (wind[j] < 72 && wind[j]>22) {
                resultArray.push('средний ветер');
              } else if (wind[j] >=0 && wind[j]<=22) {
                resultArray.push('легкий ветер');
              } else {
                resultArray.push(null);
              }
            }
            const item=findMostFrequent(resultArray)
 arrOfWeath.push(item)
 
        } 
        console.log(wind)
    }
    setArOfWind(arrOfWeath) 
}, [wind, id, idd] )
    const [arrayOfMin, setArrayOfMin] = useState();
const [arrayOfMax, setArrayOfMax] = useState();
const [datas, setDatas] = useState();  



useEffect(() => {
  if (wind !== undefined) {
    const tempArray = [];
    const maxTempArray = [];
    const arrayOfDatas = [];

    for (let i = 0; i < wind.length; i += 24) {
      const currentData = data.hourly.time[i].slice(0, 10);
      arrayOfDatas.push(currentData);

      let currentMin = 100;

      for (let j = i; j < i + 24 && j < wind.length; j++) {
        if (wind[j] < currentMin) {
          currentMin = wind[j];
        }
      }

      tempArray.push(Math.round(currentMin));
    }

    setArrayOfMin(tempArray);
    setDatas(arrayOfDatas);

    for (let i = 0; i < wind.length; i += 24) {
      let currentMax = -100;

      for (let j = i; j < i + 24 && j < wind.length; j++) {
        if (wind[j] > currentMax) {
          currentMax = wind[j];
        }
      }

      maxTempArray.push(Math.round(currentMax));
    }

    setArrayOfMax(maxTempArray);
  }
}, [wind, data]);  


if (arrayOfMax !== undefined && arrayOfMin !== undefined) {
  console.log(arrayOfMax);
  console.log(arrayOfMin);
} 

const arrayOfImages=[Fir, Fiv, Six] 

return (
    <div> 
   

     <div class="container">
  <h2 class="title">
    <span class="title-word title-word-1">{state} </span>
    <span class="title-word title-word-2">{city} </span>
    <span class="title-word title-word-3">{country} </span>
    
  </h2>
</div>
      <Fons />
     {arrayOfMax !== undefined && (
       <div style={{position: "relative", top: "200px"}} className="tableWrapper1">
       <div className='tableTemperature1' >
     {/*   <div className='tableTemperature' style={{ top: "200px"}}> */}
          {arrayOfMax.map((item, index) => {
            let imageSrc;
            if(arOfWind!=undefined){
              if (arOfWind[index] === "сильный ветер" ) {
                imageSrc = arrayOfImages[1];
              } else if (arOfWind[index] === "средний ветер") {
                imageSrc = arrayOfImages[2];
              } else  {
                imageSrc = arrayOfImages[0];
              }  
            }
            return (
              <Link  style={{ textDecoration: 'none' }} to={`/currentwind/${id}/${idd}/${datas[index]}`}> 
              <a style={{textDecoration: "none"}} className='styleLink' href="#" key={index}>
                <span>
                  <div className='renderedCurrentCityTemperature'>
                  <span className="windSpeed"> {arrayOfMin[index]}-{arrayOfMax[index]} km/h <br /> <br /> {datas[index]} </span>
               {/*   <span className="windDate">    {datas[index]} </span> */} 
                    <img src={imageSrc} alt="logo" className="renderedCurrentCityTemperatureLogo" />
                    <div className="renderedCurrentCityTemperatureFon"></div>
                  </div>
                  <i></i>
                </span>
              </a>
              </Link>
            );
          })}
         </div>
        </div>
     
      )}
       <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  zIndex: "11111111111", height: "120px"  }}>
      <Navigation />
      </div>
    </div>
  );
        } 
   
export {Wind} 
