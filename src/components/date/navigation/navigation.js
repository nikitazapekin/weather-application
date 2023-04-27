import "./navigation.css"
import { useSelector, useDispatch } from "react-redux";
import {Routes,Route, Link } from"react-router-dom"
import { fetchData } from "../../store/reducers";
import {  useSearchParams } from 'react-router-dom';
import { store } from "../../store/store";
import { useState } from "react";
import Logo from "./logo.png"
import { useEffect } from "react";
import En from "./eng.jpg"
/*
export const Navigation=(props)=> {
    const {id}= props
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [country, setCountry] =useState("")
    const [countryData, setCountryData] =useState([])
    const typedCountry=(country)=> { 
        setTimeout(()=> {
            console.log(1)
            store.dispatch(fetchData(`${country}`)).then(() => {
                console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
                const countries = store.getState();
             
                const array=countries.reducer.data.results
                setCountryData([])
                  const newData = array.slice(0, 10); // создаем массив с новыми данными
  setCountryData(prevState => [...prevState, ...newData]); // обновляем состояние одним вызовом setCountryData
              });
             
        }, 100)
    }
    const [ell, setEll]=useState("")
    const renderedElements =countryData.map(element=> {
        const countryId=element.country_id
      const latitude=element.latitude
      const longitude=element.longitude
      const arr=[]
      arr.push(latitude)
      arr.push(longitude)
      return  <Link to={`/${arr}`}><div className="renderedCountry">{element.name} {element.timezone}</div></Link>
    })
    const handleInput = (event) => {
    };
    return(
        <nav className="navigation">
        <Link to="/"> <div className="navItem"> <img src={Logo} alt="logo" className="logoOfWebPage" />  </div> </Link>
            <div className="inputSearch">
           <input type="text"  placeholder="search..." className="inputSearchForm"// onChange={handleInput}
           onChange={(e) =>{
             setCountry(e.target.value)
            handleInput()
           }  
            }  
                        value={country}
            onBlur={() =>{ //console.log(country)
                typedCountry(country)
            }
            }
            />
<div class="ccd" onClick={()=> {    //searchCountries
  const currentLocation = window.location;
  setTimeout(()=>{
currentLocation.reload()
}, 10)}}><a href="#" class="ddott"><span className="trStyle">search</span></a></div>
{renderedElements}
        </div>
            <div className="navItem"><p className="textNav">Favourite</p></div>
            <div className="navItem"><p className="textNav">Pressure</p></div>
            <div className="navItem"><p className="textNav">Wind</p></div>
            <div className="langSelection">
                <div className="langCheck">
                <img src={En} alt="lang" className="imgSelectionItem" />
                </div>
            </div>          
           <div className="fonNavigation"></div> 
        </nav>
    )
} */






export const Navigation = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleInput = (event) => {
    const value = event.target.value;
    setCountry(value);

    const results = countryData.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearchResults(results.slice(0, 10));
  };

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
  }, [country]);

  const renderedElements = searchResults.map((element) => {
    const countryId = element.country_id;
    const latitude = element.latitude;
    const longitude = element.longitude;
    const arr = [];
    arr.push(latitude);
    arr.push(longitude);
    return (
      <Link style={{textDecoration: "none"}} to={`/${arr}`}>
        <div className="renderedCountry">
          {element.name} {element.timezone}
        </div>
      </Link>
    );
  });

  return (
    <nav className="navigation">
      <Link to="/">
        <div className="navItem">
          <img src={Logo} alt="logo" className="logoOfWebPage" />
        </div>
      </Link>
      <div className="inputSearch">
        <input
          type="text"
          placeholder="search..."
          className="inputSearchForm"
          onChange={handleInput}
          value={country}
        />
        {renderedElements}
        <div
          class="ccd"
          onClick={() => {
            const currentLocation = window.location;
            setTimeout(() => {
              currentLocation.reload();
            }, 10);
          }}
        >
          </div>
      
        {/*  <Link style={{width: "60px"}} href="#" class="ddott">
            <span className="trStyle">search</span>
        </Link> */}
      {/*  <Link href="#" className="ddott">
  <span className="trStyle" onClick={(e) => { e.stopPropagation(); }}>search</span>
      </Link> */}
       
      {/*  {renderedElements} */}
      </div>
      <div className="navItem">
        <Link to="/"><button>search</button></Link>
      </div>
      <div className="navItem">
        <p className="textNav">Favourite</p>
      </div>
      <div className="navItem">
        <p className="textNav">Pressure</p>
      </div>
      <div className="navItem">
        <p className="textNav">Wind</p>
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






/*
const WeatherForecast = () => {
  const [latitude, setLatitude] = useState(53.91);
  const [longitude, setLongitude] = useState(27.56);
  const [data, setData] = useState({});
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [latitude, longitude]);

  const handleInput = (event) => {
    const value = event.target.value.toLowerCase();
    const tempMatches = data.hourly?.time?.filter(temp => temp.toLowerCase().startsWith(value));
    setMatches(tempMatches?.slice(0, 10) || []);
  };

  return (
    <div>
      <form>
        <input type="text" onChange={handleInput} />
        <ul>
          {matches.map((match, index) => (
            <li key={index}>{match}</li>
          ))}
        </ul>
      </form>
    </div>
  );
};
*/