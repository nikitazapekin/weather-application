import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { Navigation } from "../date/navigation/navigation";
import { Fons } from "../fons/fons";
import Fir from "./4.png"
import Sec from "./5.png"
import Third from "./6.png"
const PressureCurrent =()=> {
    const {id, idd, iddd} =useParams()
    const [indexes, setIndexes]=useState();
const [city, setCity]=useState('')
const [currentDate, setCurrentDate]=useState()
const [state, setState]=useState()
const [country, setCountry]=useState()
const [data, setData]=useState()
const [wind, setWind]=useState()

  







useEffect(() => {
    function successCallback(position) {
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
      fetch(geoUrl)
        .then(responses => responses.json())
        .then(data => {
          const city = data.results[0].components.city;
          setCity(city)
         
        });
      
      async function fetchAsyncTodos() {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,pressure_msl&forecast_days=16`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        setData(data);
        setWind(data.hourly.pressure_msl)
      }
      fetchAsyncTodos();




   
     
    }

    function errorCallback(error) {
      let errorMessage = "";
      switch(error.code) {
        default:
          errorMessage = "Произошла неизвестная ошибка";
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
    }
  }, []);

  
useEffect(()=> {
    if(data!=undefined){
    console.log(JSON.stringify(data))
    }
    }, [data])




    

useEffect(()=> {
    if(data != undefined) {
   //   console.log(JSON.stringify(data))
      const ttem = data.hourly.time;
      const modifiedArray = ttem.map((element) => {
        return element.slice(0, -6);
      });
  setCurrentDate(iddd)
      const indices = modifiedArray.reduce((accumulator, element, index) => {
        if (element === iddd) {
          accumulator.push(index);
        }
        return accumulator;
      }, []);
      setIndexes(indices);
      //console.log(indices)
     // console.log(JSON.stringify(data))
    }
  }, [data, iddd]);
  if(indexes!=undefined){
    console.log(indexes)
  }

  const [rren, setRren] = useState();
const  [lll, setLll]=useState()
const nums=[0,  1,  2,  3,  4,  5,  6,  7,8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const [cloudCoverLow, setCloudCoverLow]=useState([])
const [finalArr, setFinalArr]=useState()
const [speed, setSpeed]=useState()



useEffect(() => {
  if (indexes !== undefined && data !== undefined) {
    const ll = indexes.length;
    setLll(ll)
    const rendPresProp=data.hourly.precipitation_probability.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    }); 
 
const rendSpeed=data.hourly.pressure_msl.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
    return item;
  }); 
  setSpeed(rendSpeed)
    const rendShowers=data.hourly.showers.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });
    const cloudcover_low=data.hourly.cloudcover_low.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });
    console.log(cloudcover_low)
    setCloudCoverLow(cloudcover_low)
    const rendRain=data.hourly.rain.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });
    const rendPres=data.hourly.precipitation.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });
    
   // console.log("rendVis"+rendVis)
    console.log("rain"+rendRain)
    console.log("pressure"+rendPresProp)
    const resultArray=[]
    for (let i = 0; i < 24; i++) {
      if (rendSpeed[i] >= 1020.25) {
        resultArray.push('сильный ветер');
      }  else if (wind[i] < 1020.25 && wind[i]>1013.25) {
        resultArray.push('средний ветер');
      }  
      else  {
        resultArray.push('легкий ветер');
      } 
    }
   // console.log("resArray"+resultArray)
setFinalArr(resultArray)
    const rend = data.hourly.temperature_2m.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });
    setRren(rend);
  }
}, [indexes, data]);
const arrayOfImages=[Fir, Sec, Third]





return (
    <div className="pressureCurrent">
{/*<h1>{city} {state} {country}</h1> */}
<div class="container">
  <h2 class="title">
    <span class="title-word title-word-1">{city} </span>
    <span class="title-word title-word-2">{state} </span>
    <span class="title-word title-word-3">{country} </span>
    
  </h2>
</div>
<Fons />
<Navigation />
{rren !== undefined && indexes !== undefined && data !== undefined && speed!=undefined && (
    <div className="tableWrapper1">
  
              <div style={{position: "absolute", top: "200px"}} className='tableTemperature1'>
                {rren.map((item, index) => {
                  let imageSrc;
                  if (finalArr[index] === "сильный ветер" ) {
                    imageSrc = arrayOfImages[1];
                  } else if (finalArr[index] === "средний ветер") {
                    imageSrc = arrayOfImages[2];
                  } else   {
                    imageSrc = arrayOfImages[0];
                  } 
                  return (
                    <a className='styleLink' href="#" key={index}>
                      <span>
                        <div className='renderedCurrentCityTemperature'>
                          <div className="centT">{speed[index]}</div>
                          <div className="centTT">{nums[index]}:00</div>
                          <img src={imageSrc} alt="logo" className="renderedCurrentCityTemperatureLogo" />
                          <div className="renderedCurrentCityTemperatureFon"></div>
                        </div>
                        <i></i>
                      </span>
                    </a>
                  );
                })}
              </div>
              </div>
            )}
    </div>
)
}
export default PressureCurrent;
/*
{rren !== undefined && indexes !== undefined && data !== undefined && speed!=undefined && (
              <div className='tableTemperature'>
                {rren.map((item, index) => {
                  let imageSrc;
                  if (finalArr[index] === "сильный ветер" ) {
                    imageSrc = arrayOfImages[1];
                  } else if (finalArr[index] === "средний ветер") {
                    imageSrc = arrayOfImages[2];
                  } else   {
                    imageSrc = arrayOfImages[0];
                  } 
                  return (
                    <a className='styleLink' href="#" key={index}>
                      <span>
                        <div className='renderedCurrentCityTemperature'>
                          <div className="centT">{speed[index]}</div>
                          <div className="centTT">{nums[index]}:00</div>
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