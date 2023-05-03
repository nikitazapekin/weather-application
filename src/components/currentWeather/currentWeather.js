
import { useState, useEffect } from "react"
import {Routes,Route, Link } from"react-router-dom"
import "./currentWeather.css"
import Fir from "./1.png"
import Sec from "./2.png"
import Thir from "./3.png"
import Four from "./4.png"
import Fifth from "./5.png"
import Six from "./6.png"
import Sev from "./7.png"
import { Fons } from "../fons/fons"
export const CurrentWeather = (props) => {
  const { city, newArr, temp, date, data, dataVisib, getDate } = props
  const [arrayOfMin, setArrayOfMin] = useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [datas, setDatas]=useState([])
const [arrayOfVisib , setArrayOfVisib]=useState([])
useEffect(()=>{
if(dataVisib!=undefined){
const arrayOfVisibility=dataVisib.hourly.visibility
setArrayOfVisib(arrayOfVisibility)
}
}, [dataVisib])
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
  const [arrOfRain, setArrayOfRain]=useState()
  const [arrayOfProps, setArrayOfProps]=useState()
  const [arrayOfVis, setArrayOfVis]=useState()
  useEffect(()=> {
    if(data != undefined && dataVisib!=undefined) {
    setArrayOfRain(data.hourly.rain)
      setArrayOfVis(dataVisib.hourly.visibility)
      setArrayOfProps(data.hourly.precipitation_probability)
    }


  }, [data]); 
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
    console.log(resultArray)
  const item=findMostFrequent(resultArray)
 arrOfWeath.push(item)
  }
  setArOfWeath(arrOfWeath)
}
}, arOfWeath)
const arrayOfImages=[Fir, Sec, Thir, Four, Fifth, Six, Sev] 
//============================================
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
    const id=1
   const ttem=data.hourly.time
    const idd=datas[index]
  
 return <a onClick={()=>{
  getDate(datas[index])
 }}  style={{ textDecoration: 'none' }} className='styleLink1' href="#">
   <Link  style={{ textDecoration: 'none' }} to={`/current/${id}/${datas[index]}`}> 
  
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
  
  return (
    <div className="currentWeather">
      <Fons />
      <div className="todayIn">Today in {city} </div>
     <div className="tableTemperature">{renderItems}
     </div>
   
    </div>
  )
}