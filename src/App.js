
import { useState, useEffect } from 'react';
import "./App.css"
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
//import { connect } from 'react-redux';
import { InputSearch } from './components/inputSearch/inputSearch';
import {Sun} from "./image.png"
import MyComponent from './components/test/test';

import {  useSearchParams } from 'react-router-dom';
import { Navigation } from './components/date/navigation/navigation';
import { Homepage } from './components/homepage/homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchList } from './components/searchList/searchList';
import { List } from './components/list/list';
import { useSelector, useDispatch } from "react-redux";
import { store } from './components/store/store';
import { CurrentHour } from './components/currentHour/currentHour';
import { SearchedHours } from './components/searchedHours/searchedHours';
import { Favourite } from './components/favourite/favourite';
import WeatherForecast from './components/testSearch/testSearch';
import { Wind } from './components/wind/wind';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { CurrentWind } from './components/currentWind/currentWind';
import { Pressure } from './components/pressure/pressure';
import PressureCurrent from './components/pressureCurrent/pressureCurrent';
import TestComp from './components/testComp/testComp';
import En from "./en.jpg"
import Ru from "./ru.jpg"
import i18n from 'i18next';

function App(){
  const state = useSelector((state) => state);
  const langg= state.stateOfLang
  console.log("langg" +langg)
  const dispatch = useDispatch();
const [city, setCity]=useState('')
const [langCheck, setLangCheck]=useState(false)
const [langImg, setLangImg]=useState(true)
const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
const toggleLanguage = (lang) => {
 // const newLanguage= currentLanguage===lang ? 'en' : 'ru'
  //const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
  if(lang==="ru"){
 dispatch({type: "EN"})
  setCurrentLanguage('en');
  i18n.changeLanguage('en');
  }
  else{
   dispatch({type: "RU"})
    setCurrentLanguage('ru');
    i18n.changeLanguage('ru');
  }
};
  useEffect(() => {
    function successCallback(position) {
     // setBoolCheck(false); 
      const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=f9629a9e6fd7493aac20c35043c7e411`;
      fetch(geoUrl)
        .then(responses => responses.json())
        .then(data => {
          const city = data.results[0].components.city;
       //console.log("city app"+city)
     setCity(city)
        });
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
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation не поддерживается вашим браузером");
   //   setBoolCheck(false); // hide the loading image
    }
  }, []);






  const id=22
  return(
    
    <div className="App">
 


<div>
     
    </div>
    <Suspense fallback={(<div>Loading</div>)}>
    <Routes >
  <Route path="/" element={ <Homepage id={id}/>} />
  <Route path="/favourite" element={ <Favourite />} />
  <Route path="/wind/:id/:idd" element={ <Wind />} />
 <Route path=":id" element={<SearchList />} /> 
 <Route path="/pressure/:id/:idd" element={<Pressure />} /> 
 <Route path="/test/:id" element={<List />} /> 
 <Route path="/pressurecurrent/:id/:idd/:iddd" element={<PressureCurrent />} /> 
 <Route path="/currentwind/:id/:idd/:iddd" element={<CurrentWind />} /> 
 <Route path="/current/:id/:idd" element={<CurrentHour />} /> 
 <Route path="/searched/country/:id/:idd/:iddd/:idddd" element={<SearchedHours />} /> 
</Routes>
</Suspense>




<div style={{zIndex:1111111111111111111111111, position: "absolute"}} className='selectLang'>
    

    {langImg === true ? (
<img src={Ru} alt="lang" onClick={() => {
 setLangCheck(true);

}} className="selectLangItem" />
) : (
<img src={En} alt="lang" onClick={() => {
 setLangCheck(true);

}} className="selectLangItem" />
)}



    {langCheck===true && (
   <div style={{zIndex: 1111111111111111111}} className="langBlock">
      <img src={Ru} alt="lang" onClick={()=>{
     setLangCheck(false)
     setLangImg(true)
     toggleLanguage("en")
    }} className='selectLangItem' />
     <img src={En} alt="lang" onClick={()=>{
     setLangCheck(false)
     setLangImg(false)
     toggleLanguage("ru")
    }} className='selectLangItem' />
   </div>
    )}
    </div>
  </div>
  )
}

//export default App;

function mapStateToProps(state) {
  return {
    counter: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCounter: () => dispatch({ type: 'ad' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//Перевод
//