
  import { useState, useEffect } from 'react';
import "./homepage.css"
import { InputSearch } from '../inputSearch/inputSearch';
import MyComponent from '../test/test';
import { Navigation } from '../date/navigation/navigation';
import { CurrentWeather } from '../currentWeather/currentWeather';

const Homepage = () => {
 const [city, setCity ]=useState("")
const [newArr, setNewArr]=useState([])
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
    }
    function successCallback(position) {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`)
      .then(responses => responses.json())
      .then(data => {
      const city = data.results[0].components.city;
      const encodedCity = encodeURIComponent(city);
      fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodedCity}`)
        .then(response => response.json())
        .then(data => {
          const translation = data[0][0][0];
          console.log(`Your city: ${translation}`);
          setCity(translation);


        })
      })
      async function fetchAsyncTodos() {
    
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m`);
        const data = await response.json();
        const arrayOfTemp = data.hourly.temperature_2m.map(item => item);
        const arrayOfTime = data.hourly.time.map(item => item);
        const newArr=arrayOfTemp.concat(arrayOfTime)
        setNewArr(newArr)
      }
      fetchAsyncTodos();
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
  }, []);
console.log(newArr)
const len =newArr.length/2;
console.log(len)
const finalRender=newArr.slice(0, len).map((item, index)=> {
  return <div>{Math.round(item)}    {newArr[index+len]}</div>
})
  return (
    <div className="homepage">
      <Navigation />
      <Time />
      <img className='backgroundFon' src="https://media.giphy.com/media/xT0xeNf2csFIbeAxvq/giphy.gif" alt="fon" />
      {finalRender}
      <CurrentWeather newArr={newArr} city={city}/>
    </div>
  )
}

function Time() {
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
      <div className="day">{date.toLocaleDateString('en-US', {weekday: 'long'})}{' '}</div>
      <div className="date">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '}</div>
      <div className="time">{date.toLocaleTimeString()}</div>
      <div className="wrapperTime"></div>
    </div>
  );
}

export { Homepage }