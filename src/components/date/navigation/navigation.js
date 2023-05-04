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
import Log from "./image.png"
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
  
  return (
    <nav className="navigation">
   
      <Link to="/">
        <div className="navItem">
          <img src={Log} alt="logo" className="logoOfWebPage" />
        </div>
      </Link>
      <div className="navItem">
      <div className="inputSearch">
        <input
          type="text"
          placeholder="search..."
          className="inputSearchForm"
          onChange={handleInput}
          value={country}
        />
 <Link to={country.length ? `/test/${country}` : '#'}>
  <button
    className="button-85"
    role="button"
    disabled={!country.length}
  >
 Search</button>
 </Link>
      </div>
      {renderedElements}
      </div>
      <div className="navItem">
      <Link style={{textDecoration: "none"}} to="/favourite">  <p className="textNav">Favourite</p></Link>
      </div>
      <div className="navItem">
      <Link style={{textDecoration: "none"}} to={`/pressure/${latitude}/${longitude}`}> <p className="textNav">Pressure</p></Link> 
      </div>
      <div className="navItem">
       <Link style={{textDecoration: "none"}} to={`/wind/${latitude}/${longitude}`}> <p className="textNav">Wind</p> </Link>
      </div>
      <div className="langSelection">
        <div className="langCheck">
          <img src={En} alt="lang" className="imgSelectionItem" />
        </div>
       
      </div>
    
      <div className="fonNavigation"></div>
      
    </nav>
  );
};




