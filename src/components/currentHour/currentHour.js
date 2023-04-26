import { useParams } from 'react-router-dom';
import { Navigation } from '../date/navigation/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
const CurrentHour =()=> {
    const {id, idd} = useParams();
    const [data, setData]=useState();
    const [indexes, setIndexes]=useState();
  
    useEffect(() => {
      function successCallback(position) {
        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
        fetch(geoUrl)
          .then(responses => responses.json())
          .then(data => {
            const city = data.results[0].components.city;
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
      }
    }, [data, idd]);
    
    const [rren, setRren] = useState();
    useEffect(() => {
      if (indexes !== undefined && data !== undefined) {
        const ll = indexes.length;
    //    const rend = data.hourly.temperature_2m.slice(indexes[0], indexes[ll - 1] - 1).map((item, index)=> {
        const rend = data.hourly.temperature_2m.slice(indexes[0], indexes[ll] ).map((item, index)=> {
          return item;
        });
        setRren(rend);
      }
    }, [indexes, data]);
/*return (
<div>
<Navigation />
{rren !== undefined && indexes!=undefined && data!=undefined && (
        <div>
          
          rren.map((item, index) => {
         //   setCurrentHour(prev=> prev+1)
            return <div key={index}>temperature {item} date {idd}: </div>;
})
}
    
</div>
) */
return (
  <div>
    <Navigation />
    {rren !== undefined && indexes !== undefined && data !== undefined && (
      <div>
        {rren.map((item, index) => {
        
          return <div key={index}>temperature {item} date {idd}:</div>;
        })}
      </div>
    )}
  </div>
);

        }
  export {CurrentHour} 




  {/*(
    <div>
      <Navigation />
      {id}
      {JSON.stringify(idd)}
      {rren !== undefined && indexes!=undefined && data!=undefined && (
        <div>
          {useEffect(()=> {
          rren.map((item, index) => {
         //   setCurrentHour(prev=> prev+1)
            return <div key={index}>temperature {item} date {idd}: </div>;
          })
        }, [])
    }
        </div>
      )}
    </div>
  );  */}