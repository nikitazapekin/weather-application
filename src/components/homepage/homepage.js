import { useState, useEffect } from 'react';
import "./homepage.css"
import { InputSearch } from '../inputSearch/inputSearch';
import MyComponent from '../test/test';
import { Navigation } from '../date/navigation/navigation';
const Homepage=()=> {
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation не поддерживается вашим браузером");
  }
  
  function successCallback(position) {
    console.log(`Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`);
  }
  
  function errorCallback(error) {
    let errorMessage = "";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "Пользователь отказался предоставить местоположение";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Местоположение недоступно";
        break;
      case error.TIMEOUT:
        errorMessage = "Таймаут при запросе местоположения";
        break;
      default:
        errorMessage = "Произошла неизвестная ошибка";
    }
    console.log(errorMessage);
  }
    return (
        <div className="homepage">
          <Navigation />
  <Time /> 
  <img className='backgroundFon' src="https://media.giphy.com/media/xT0xeNf2csFIbeAxvq/giphy.gif" alt="fon" />
 

        </div>
    )
}

function Time(){
    const [date, setDate] = useState(new Date());
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
     
     <div className='Time'>
   <div className="day"> {date.toLocaleDateString('en-US', {weekday: 'long'})}{' '} </div>
   <div className="date">   {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '} </div>
    <div className="time">{date.toLocaleTimeString()}</div> 
    <div className="wrapperTime"></div>
  </div>
  
    );
  } 
  export {Homepage}