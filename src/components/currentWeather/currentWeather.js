
import { useState, useEffect } from "react"
import {Routes,Route, Link } from"react-router-dom"
import "./currentWeather.css"
export const CurrentWeather = (props) => {
  const { city, newArr, temp, date, data, dataVisib, getDate } = props
  const [arrayOfMin, setArrayOfMin] = useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [datas, setDatas]=useState([])
const [arrayOfVisib , setArrayOfVisib]=useState([])
//console.log(JSON.stringify(dataVisib))
//console.log("vvvis"+JSON.stringify(dataVisib))
useEffect(()=>{
if(dataVisib!=undefined){
const arrayOfVisibility=dataVisib.hourly.visibility
setArrayOfVisib(arrayOfVisibility)
//console.log("vv"+arrayOfVisib)
}
}, [dataVisib])
//console.log("vv"+arrayOfVisib)
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
 
    const idd=datas[index]
  
    
 return <a onClick={()=>{
  getDate(datas[index])
 }}  style={{ textDecoration: 'none' }} className='styleLink' href="#">
   <Link  style={{ textDecoration: 'none' }} to={`/current/${id}/${datas[index]}`}> 
        <span>
        <div className='renderedCurrentCityTemperature' key={index}><div className="renderedCurrentCityTemperatureFon">
    
          </div>
       
      <div className="ttty">  {arrayOfMin[index] }- {item}°</div>
       <div className="qw">  {datas[index]} </div> 


          </div>;
          <i></i></span>
          </Link> 
          </a> 
})
  
  return (
    <div className="currentWeather">
      <div className="todayIn">Today in {city} </div>
      <button onClick={()=> {
        getDate(1)
      }}>add</button>
     <div className="tableTemperature">{renderItems}
   
     </div>
   
    </div>
  )
}