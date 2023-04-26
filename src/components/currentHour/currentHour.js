import { useParams } from 'react-router-dom';
import { Navigation } from '../date/navigation/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fons } from '../fons/fons';
import "./currentHour.css"
const CurrentHour =()=> {
    const {id, idd} = useParams();
    const [data, setData]=useState();
    const [indexes, setIndexes]=useState();
const [city, setCity]=useState('')
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
  const [currentDate, setCurrentDate] =useState()
  //const [currentHour, setCurrentHour] =useState(0)
    useEffect(()=> {
      if(data != undefined) {
        const ttem = data.hourly.time;
        const modifiedArray = ttem.map((element) => {
          return element.slice(0, -6);
        });
    setCurrentDate(idd)
        const indices = modifiedArray.reduce((accumulator, element, index) => {
          if (element === idd) {
            accumulator.push(index);
          }
          return accumulator;
        }, []);
        setIndexes(indices);
        //console.log(indices)
        console.log(JSON.stringify(data))
      }
    }, [data, idd]);
    
    const [rren, setRren] = useState();
    const  [lll, setLll]=useState()
    const nums=[0,  1,  2,  3,  4,  5,  6,  7,8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
   
    useEffect(() => {
      if (indexes !== undefined && data !== undefined) {
        const ll = indexes.length;
        setLll(ll)
        const rend = data.hourly.temperature_2m.slice(indexes[0], indexes[23]+1 ).map((item, index)=> {
          return item;
        });
        setRren(rend);
      }
    }, [indexes, data]);

return (
  <div>
    <Navigation />
    <Fons />
    <h1 className="weatherFor">{idd} in {city}</h1>
    {rren !== undefined && indexes !== undefined && data !== undefined && (
      <div className='tableTemperature'>
       {rren.map((item, index) => {
       
         // return <div className='renderedCurrentCityTemperature' key={index}><div className="centT"> {item}° </div> <div className="centTT"> {idd}<br />{nums[index]}:00</div> <div className="renderedCurrentCityTemperatureFon"></div></div>;
       return  <a className='styleLink' href="#">
        <span>
        <div className='renderedCurrentCityTemperature' key={index}><div className="centT"> {item}° </div> <div className="centTT"> {idd}<br />{nums[index]}:00</div> <div className="renderedCurrentCityTemperatureFon"></div></div>;
          <i></i></span></a>
       
       })}
      </div>
      )} 
  </div>
);

        }
  export {CurrentHour} 


//https://www.figma.com/file/xWnDJDfzA2TQkLmK8BE3rE/Frosted-Glass-Weather-Icons-(Community)?node-id=7-8&t=evu6xy5rjN52CTmW-0
