
import { useState, useEffect } from "react"
import {Routes,Route, Link } from"react-router-dom"
import "./currentWeather.css"
export const CurrentWeather = (props) => {
  const { city, newArr, temp, date, data } = props
  const [arrayOfMin, setArrayOfMin] = useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [datas, setDatas]=useState([])
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
    const id=1
   // const idd=22
   const ttem=data.hourly.time
  // console.log("ttem"+ttem)
   /*const temper =ttem.filter((item, index)=> {
   if(item.slice(0,10)===datas[index]){
    return item.slice(0,8)
   }
   }) */
  // console.log(temper)
/*const el=ttem.map(element => {
  return ";"+element.slice(0,2)+";"
});
console.log("tt"+ttem) */
/*
const modifiedArray = ttem.map((element) => {
  return element.slice(0, -6);
});
 
// Поиск позиций элементов, равных "2023-05-11"
const indices = modifiedArray.reduce((accumulator, element, index) => {
 // if (element === "2023-05-11") {
  if (element === datas[index]) {
    accumulator.push(index);
  }
  return accumulator;
}, []);
 
console.log(indices); */
    const idd=datas[index]
   // console.log("idd"+idd)
    return <Link to={`/current/${id}/${datas[index]}`}><div className="renderedCurrentCityTemperature"><div className="testt">{arrayOfMin[index]}-{item }</div><br /> <div className="testt testtEl">{datas[index]}</div> <div className="renderedCurrentCityTemperatureFon"></div></div></Link>
  })
  
  return (
    <div className="currentWeather">
      <div className="todayIn">Today in {city} </div>
     <div className="tableTemperature">{renderItems}</div>
    </div>
  )
}