import "./navigation.css"
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {Routes,Route, Link } from"react-router-dom"
import { fetchData } from "../../store/reducers";
import {  useSearchParams } from 'react-router-dom';
import { store } from "../../store/store";
import { useState } from "react";
import Logo from "./logo.png"
import { useEffect } from "react";
import En from "./eng.jpg"
import Rus from "./rus.jpg"
import Log from "./image.png"
import BurgerMenu from "../../burgerMenu/burgerMenu";
export const Navigation = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const stateId=state.coords
  const latitude=stateId[0]
  const longitude =stateId[1]
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
const [langCheck, setLangCheck]=useState(false)
  const handleInput = useCallback((event) => {
    const value = event.target.value;
    setCountry(value);

    const results = countryData.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearchResults(results.slice(0, 10));
  }, [countryData]);

  const fetchCountryData = (country) => {
    dispatch(fetchData(country)).then(() => {
      const countries = store.getState();
      const array = countries.reducer.data.results;
      const newData = array.slice(0, 10);
      setCountryData(newData);
      setSearchResults(newData);
    });
  };

  useEffect(() => {
    if (country) {
      const timeoutId = setTimeout(() => {
        fetchCountryData(country);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [country, countryData]);

  const renderedElements = country.length > 0 && searchResults.map((element) => {
    const countryId = element.country_id;
    const latitude = element.latitude;
    const longitude = element.longitude;
    const arr = [];
    arr.push(latitude);
    arr.push(longitude);
    return (
      <Link style={{textDecoration: "none"}} to={`/${arr}`}>
        <div onClick={()=> {
           dispatch({type: "ADD_COORDS", latitude: latitude, longitude: longitude, city: 0, country: 0, state: 0})
          setCountry("");
        }} className="renderedCountry">
          {element.name} {element.timezone} {element.country}
        </div>
      </Link>
    );
  });
  const styles={
  display:  langCheck===true ?  "block" : "none"
  }
  return (
    <nav className="navigation">
   
      <Link to="/">
        <div className="navItem">
          <img src={Log} alt="logo" className="logoOfWebPage" />
        </div>
      </Link>
      <div className="navItem navItemSearch">
      <div className="inputSearch">
        <input
          type="text"
          placeholder="найти..."
          className="inputSearchForm"
          onChange={handleInput}
          value={country}
        />
 <Link to={country.length ? `/test/${country}` : '#'}>
  <div style={{position: "relative"}}>
  <button
  style={{paddingBottom: "10px"}} 
    className="button-85"
    role="button"
    disabled={!country.length}
  >
<span style={{lineHeight: "0px",  marginBottom: "-10px"}} className="btnSearchText"> Найти</span></button></div>
 </Link>

      </div>
      {renderedElements} 
      </div>
    



      <div className="navItem txtx">
      <Link style={{textDecoration: "none"}} to="/favourite">  <p className="textNav">Избранное</p></Link>
      </div>
      <div className="navItem txtx">
    {/* <Link style={{textDecoration: "none"}} to={`/pressure/${latitude}/${longitude}`}> <p className="textNav ">Давление</p></Link>  */}
    {latitude && longitude ? (
  <Link style={{textDecoration: "none"}} to={`/pressure/${latitude}/${longitude}`}>
    <p className="textNav">Давление</p>
  </Link>
) : (
  <p className="textNav">Давление</p>
)}
      </div>
      <div className="navItem txtx">
     {/*  <Link style={{textDecoration: "none"}} to={`/wind/${latitude}/${longitude}`}> <p className="textNav ">Ветер</p> </Link> */}
     {latitude && longitude ? (
  <Link style={{textDecoration: "none"}} to={`/wind/${latitude}/${longitude}`}>
    <p className="textNav">Ветер</p>
  </Link>
) : (
  <p className="textNav ">Ветер</p>
)}
      </div>

<div className="burger">
<BurgerMenu />
</div>
      <div className="fonNavigation"></div>
    
    </nav>
  );
};




