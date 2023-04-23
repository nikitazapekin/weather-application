
import { useState, useEffect } from "react"
import "./currentWeather.css"
export const CurrentWeather = (props) => {
  const { city, newArr, temp, date, data } = props
  const [arrayOfMin, setArrayOfMin] = useState([])
const [arrayOfMax, setArrayOfMax]=useState([])
const [datas, setDatas]=useState([])
//const rain=data.hourly.rain
//const showers=data.hourly.showers
//const snowfall=data.hourly.snowfall
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
  //console.log(datas)
  return (
    <div className="currentWeather">
      <div className="todayIn">Today in {city} </div>
     <div className="tableTemperature">{renderItems}</div>
     <button className="test" onClick={()=> {
        console.log(data)
        console.log(data.hourly.rain)
        console.log(data.hourly.showers)
        console.log(data.hourly.snowfall)
     }}>data</button>
    </div>
  )
}