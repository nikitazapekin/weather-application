import { store } from "../store/store"
import {Routes,Route, Link } from"react-router-dom"
import "./searchList.css"
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

export const SearchList =()=> {
  const {id} = useParams();
  const [country, setCountry]=useState('')
  const [stat, setStat]=useState('')
  const [county, setCounty]=useState('')
  const [data, setData]=useState()
  const [temp, setTemp]=useState([])
  const [newArr, setNewArr] = useState([]);
  const [date, setDate]=useState([])
const [arrayOfMin, setArrayOfMin]=useState([])
const [datas, setDatas]=useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [dataVisib, setDataVisib] =useState() 
const [arOfWeath, setArOfWeath]=useState()
//if(arrOfRain!=undefined && arrayOfProps!=undefined && arrayOfVis!=undefined &&data!=undefined && dataVisib!=undefined){
 // const [arrayOfProps, setArrayOfProps] =useState()
 const [arrOfRain, setArrayOfRain]=useState()
  const [arrayOfProps, setArrayOfProps]=useState()
  const [arrayOfVis, setArrayOfVis]=useState()
useEffect(()=>{
 if(id!=undefined){
 const str = id;
const parts = str.split(',');
const latitude = parts[0]; 
const longitude = parts[1]; 
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




//const 
if(data!=undefined && dataVisib!=undefined) {
setArrayOfRain(data.hourly.rain)
//console.log("=============================================")
//console.log(data.hourly.rain)
setArrayOfVis(dataVisib.hourly.visibility)
setArrayOfProps(data.hourly.precipitation_probability)
//console.log(data.hourly.precipitation_probability)
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
 // console.log("getted"+arOfWeath)
  setArOfWeath(arrOfWeath)
  }

}, [temp, arOfWeath])
useEffect(()=> {
if(arOfWeath!=undefined){
  console.log(arOfWeath)
}
}, arOfWeath)
/*
const [arOfWeath, setArOfWeath]=useState()
useEffect(()=> {
if(arrOfRain!=undefined && arrayOfProps!=undefined && arrayOfVis!=undefined &&data!=undefined && dataVisib!=undefined){
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
//}, arOfWeath)
}, arOfWeath)
//}, [arOfWeath]) */



/*
const [arOfWeath, setArOfWeath] = useState();

useEffect(() => {
  if (
    arrOfRain !== undefined &&
    arrayOfProps !== undefined &&
    arrayOfVis !== undefined &&
    data !== undefined &&
    dataVisib !== undefined
  ) {
    const arrOfWeath = [];
    for (let i = 0; i < data.hourly.rain.length; i += 24) {
      const resultArray = [];
      for (
        let j = i;
        j < i + 24 && j < data.hourly.rain.length;
        j++
      ) {
        if (arrOfRain[j] >= 0.3) {
          resultArray.push("дождь");
        } else if (arrayOfVis[j] < 1000) {
          resultArray.push("туман");
        } else if (arrayOfProps[j] > 1) {
          resultArray.push("осадки");
        } else {
          resultArray.push("солнечно");
        }
      }
      const item = findMostFrequent(resultArray);
      arrOfWeath.push(item);
    }
    setArOfWeath(arrOfWeath);
  }
}, [data]);
*/





/*

const arrayOfImages=[Fir, Sec, Thir, Four, Fifth, Six, Sev] 
const [arrOfRain, setArrayOfRain]=useState()
  const [arrayOfProps, setArrayOfProps]=useState()
  const [arrayOfVis, setArrayOfVis]=useState()
  useEffect(()=> {
    if(data != undefined && dataVisib!=undefined) {
    setArrayOfRain(data.hourly.rain)
      setArrayOfVis(dataVisib.hourly.visibility)
      setArrayOfProps(data.hourly.precipitation_probability)
    }
  //}, [data]); 
  }, data)
  if(arOfWeath!=undefined){
    console.log(arOfWeath)
  }
 */
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
return <a onClick={()=>{
 
 }}  style={{ textDecoration: 'none' }} className='styleLink1' href="#">
   <Link  style={{ textDecoration: 'none' }} to={`/current/${id}/${datas[index]}`}> 
        <span>
        <div className='renderedCurrentCityTemperature' key={index}><div className="renderedCurrentCityTemperatureFon">
          </div>
      <div className="ttty">  {arrayOfMin[index] }- {item}°</div>
       <div className="qw">  {datas[index]} </div> 
       <img style={{zIndex: "1000"}} src={imageSrc} alt="logo" className="renderedCurrentCityWeatherLogo" /> 
          </div>;
          <i></i></span>
          </Link> 
          </a> 
})
    return( 
    <div className="searchList">
      <Navigation />
  <div className="selectedCountry"> {country}, {stat}, {county} </div>
  <div className="tableTemperature">{renderItems}</div>
<button style={{zIndex: "100000", width: "200px", height: "300px", position: "relative", top: "1400px"}} onClick={()=> {
  console.log("current"+arOfWeath)
 // console.log(arOfWeath)
}}>show ar</button>
    </div>
    )
}