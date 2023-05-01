
import { useParams } from 'react-router-dom';
import { Navigation } from '../date/navigation/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fons } from '../fons/fons';
import Fir from "./1.png"
import Sec from "./2.png"
import Thir from "./3.png"
import Four from "./4.png"
import Fifth from "./5.png"
import Six from "./6.png"
import Sev from "./7.png"
import "./searchedHours.css"
export const SearchedHours =()=> {
    const {id, idd, iddd, idddd} = useParams();
    const [data, setData]=useState();
    const [indexes, setIndexes]=useState();
const [city, setCity]=useState('')
const [dataVisib, setDataVisib]=useState()
const [currentDate, setCurrentDate]=useState()
const [state, setState]=useState()
const [country, setCountry]=useState()
  
/*
async function fetchAsyncTodos() {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${id}&longitude=${idd}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    console.log(data)
   setData(data);
  }
  fetchAsyncTodos();
async function vis() {// ,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m
  
    const visibUrl=`https://api.open-meteo.com/v1/gfs?latitude=${id}&longitude=${idd}&hourly=temperature_2m,visibility&forecast_days=16`
   
    const responseVisib= await fetch(visibUrl)
     const dataVisib = await responseVisib.json()
 setDataVisib(dataVisib.hourly.visibility)
  }
  vis()
  const [state, setState]=useState()
  const [country, setCountry]=useState()
  const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${id}+${idd}&key=f9629a9e6fd7493aac20c35043c7e411`;
        fetch(geoUrl)
          .then(responses => responses.json())
          .then(data => {
            const city = data.results[0].components.city;
            const country = data.results[0].components.country;
            const state = data.results[0].components.state;
           const stroke="";
          // stroke+=data.results[0].components.city+data.results[0].components.state+data.results[0].components.country
          console.log(stroke)
          setCity(city)
          setCountry(country)
          setState(state)
          });  */








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
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
                const response = await fetch(weatherUrl);
                const data = await response.json();
                setData(data);
              }
              fetchAsyncTodos();
      
      
      
      
              async function vis() {// ,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m
                // const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,rain,showers,snowfall,precipitation&forecast_days=16`;
              ;
                const visibUrl=`https://api.open-meteo.com/v1/gfs?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,visibility&forecast_days=16`
               
                const responseVisib= await fetch(visibUrl)
                 const dataVisib = await responseVisib.json()
                // console.log("vis"+dataVisib)
                setDataVisib(dataVisib.hourly.visibility)
              }
              vis()
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
         //======================================================

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
useEffect(() => {
  if (indexes !== undefined && data !== undefined) {
    const ll = indexes.length;
    setLll(ll)
    const rendPresProp=data.hourly.precipitation_probability.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    }); 
    const rendVis=dataVisib.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
      return item;
    });

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
    
    console.log("rendVis"+rendVis)
    console.log("rain"+rendRain)
    console.log("pressure"+rendPresProp)
    const resultArray=[]
    for (let i = 0; i < 24; i++) {
      if (rendRain[i] >= 0.3) {
        resultArray.push('дождь');
      } else if (rendVis[i] < 1000) {
        resultArray.push('туман');
      } else if (rendPresProp[i] > 1) {
        resultArray.push('осадки');
      } else {
        resultArray.push('солнечно');
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
console.log(finalArr) 
const arrayOfImages=[Fir, Sec, Thir, Four, Fifth, Six, Sev]
const [stateImage, setStateImage]=useState()
        return (
          <div>
          {/*  <Navigation /> */}
            <h1 className="weatherFor" style={{position: "relative", top:"100px"}}> {city} {state} {country}</h1> 
          <div style={{position: "relative", top:"100px"}}> {idddd} </div> 
         {rren !== undefined && indexes !== undefined && data !== undefined && (
              <div className='tableTemperature' style={{ top: "200px"}}>
                {rren.map((item, index) => {
                  let imageSrc;
                  if (finalArr[index] === "солнечно" ) {
                    imageSrc = arrayOfImages[3];
                  } else if (finalArr[index] === "туман") {
                    imageSrc = arrayOfImages[0];
                  } else if (finalArr[index] === "дождь") {
                    imageSrc = arrayOfImages[6];
                  } else if (finalArr[index] === "осадки") {
                    imageSrc = arrayOfImages[0];
                  }
                  return (
                    <a className='styleLink' href="#" key={index}>
                      <span>
                        <div className='renderedCurrentCityTemperature'>
                          <div className="centT">{item}°</div>
                          <div className="centTT">{iddd}<br />{nums[index]}:00</div>
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

    
 