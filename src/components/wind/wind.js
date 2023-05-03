import { Navigation } from "../date/navigation/navigation"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
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
const [statt, setStatt]=useState("")
console.log("stat"+stat)
useEffect(()=> {
if(stat[3]!=undefined){
  setCountry(stat[3])
}
}, [stat[3]])
useEffect(()=> {
if(stat[2]!=undefined){
  setCity(stat[2])
}
}, [stat[2]])
useEffect(()=> {
if(stat[4]!=undefined){
  setStatt(stat[4])
}
}, [stat[4]])
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
  
 /*   useEffect(()=> {
    const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${id}+${idd}&key=f9629a9e6fd7493aac20c35043c7e411`;
       fetch(geoUrl)
         .then(responses => responses.json())
         .then(data => {
           const city = data.results[0].components.city;
         });
        

        
         async function fetchAsyncTodos() {// ,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${id}&longitude=${idd}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
    
            const response = await fetch(weatherUrl);
           
             const data = await response.json();
    console.log("data"+JSON.stringify(data))
    setData(data)
    setWind(data.hourly.windspeed_10m)
           }
           fetchAsyncTodos();
        }, [id, idd]) */
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
      <h1 className="windIn">wind in{statt} {city} {country} </h1>
     {arrayOfMax !== undefined && (
        <div className='tableTemperature' style={{ top: "200px"}}>
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
              <a style={{textDecoration: "none"}} className='styleLink' href="#" key={index}>
                <span>
                  <div className='renderedCurrentCityTemperature'>
                  <span className="windSpeed"> {arrayOfMin[index]}-{arrayOfMax[index]} km/h </span>
                  <span className="windDate">    {datas[index]} </span>
                    <img src={imageSrc} alt="logo" className="renderedCurrentCityTemperatureLogo" />
                    <div className="renderedCurrentCityTemperatureFon"></div>
                  </div>
                  <i></i>
                </span>
              </a>
            );
          })}
        </div>
      )}
      <Navigation />
    </div>
  );
        }
export {Wind}






/*

  {arrayOfMax !== undefined && (
        <div className='tableTemperature' style={{ top: "200px"}}>
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
              <a className='styleLink' href="#" key={index}>
                <span>
                  <div className='renderedCurrentCityTemperature'>
                    <img src={imageSrc} alt="logo" className="renderedCurrentCityTemperatureLogo" />
                    <div className="renderedCurrentCityTemperatureFon"></div>
                  </div>
                  <i></i>
                </span>
              </a>
            );
          })}
        </div>
      )}
      */