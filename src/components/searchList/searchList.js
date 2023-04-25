import { store } from "../store/store"
import "./searchList.css"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Navigation } from "../date/navigation/navigation";
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
    const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(id)
useEffect(()=>{
 if(id!=undefined){
 const str = id;
const parts = str.split(',');
const latitude = parts[0]; 
const longitude = parts[1]; 
 const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
fetch(url)
  .then(response => response.json())
  .then(data => {
   console.log("current "+JSON.stringify(data))
   // setCountry(data.address.city)
   setCountry(data.address.city)
  setStat(data.address.state)
  setStat(data.address.county)
  })
  .catch(error => {
    console.error('Error:', error);
  });






  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
  fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
  // console.log(data)
   setData(data)
  // const temperatureValues = data.hourly.temperature_2m;
const arrayOfTemp = data.hourly.temperature_2m.map(item => item);
const arrayOfTime = data.hourly.time.map(item => item);
console.log(arrayOfTemp)
console.log(arrayOfTime)
// const arrayOfRain=data.hourly.temperature_2m.rain.map(item=> item)
// console("rain"+data.hourly.rain)
const newArrr = arrayOfTemp.concat(arrayOfTime);
setTemp(arrayOfTemp)
setDate(arrayOfTime)
setNewArr(newArrr);
   // setCountry(data.address.city)
  })
  .catch(error => {
    console.error('Error:', error);
  }); 

}
}, [])




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

}, [temp])



const renderMin = arrayOfMin.map(item => {
  return <div>{item}</div>
})
const renderMax = arrayOfMax.map(item => {
  return <div>{item}</div>
})
const renderItems=renderMax.map((item, index)=> {
  return <div className="renderedCurrentCityTemperature"><div className="testt">{arrayOfMin[index]}-{item }</div><br /> <div className="testt testtEl">{datas[index]}</div> <div className="renderedCurrentCityTemperatureFon"></div></div>
})


console.log("data"+JSON.stringify(data))
/*
const len =newArr.length/2;
const finalRender=newArr.slice(0, len).map((item, index)=> {
return <div>{Math.round(item)} {newArr[index+len]}</div>
//return <div className="renderedCurrentCityTemperature"><div className="testt">{arrayOfMin[index]}-{item }</div><br /> <div className="testt testtEl">{datas[index]}</div> <div className="renderedCurrentCityTemperatureFon"></div></div>
})  */
    return( 
    <div className="searchList">
      <Navigation />
  <div className="selectedCountry"> {country}, {stat}, {county} </div>
  <div className="tableTemperature">{renderItems}</div>
 {/* {finalRender}  */}
{/* <div className="tableTemperature">{finalRender}</div> */}
    </div>
    )
}