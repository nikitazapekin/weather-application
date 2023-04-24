import "./navigation.css"
import { useSelector, useDispatch } from "react-redux";
import {Routes,Route, Link } from"react-router-dom"
//import { fetchData } from "../store/reducers";
import { fetchData } from "../../store/reducers";
//import { store } from "../store/store";
import {  useSearchParams } from 'react-router-dom';
import { store } from "../../store/store";
import { useState } from "react";
import Logo from "./logo.png"
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
    const renderedElements =countryData.map(element=> {
        const countryId=element.country_id
        //return  <Link to={`/${id}`}><div className="renderedCountry">{element.name} {element.timezone}</div></Link>
      //  return  <Link to={`/${element.name}/${element.timezone}`}><div className="renderedCountry">{element.name} {element.timezone}</div></Link>
      //return  <Link to={`/${countryId}`}><div className="renderedCountry">{element.name} {element.timezone}</div></Link>
      const latitude=element.latitude
      const longitude=element.longitude
      const arr=[]
      arr.push(latitude)
      arr.push(longitude)
      return  <Link to={`/${arr}`}><div className="renderedCountry">{element.name} {element.timezone}</div></Link>
    })
    return(
        <nav className="navigation">
            <div className="navItem"><img src={Logo} alt="logo" className="logoOfWebPage" /></div>
            <div className="inputSearch">
           <input type="text"  placeholder="search..." className="inputSearchForm" 
           onChange={(e) =>{
             setCountry(e.target.value)
            
          //   typedCountry()
           }
            }
            value={country}
            onBlur={() =>{ //console.log(country)
                typedCountry(country)
            }
            }
            />
<button className="searchCountries">search</button>
{renderedElements}
        </div>
            <div className="navItem"><p className="textNav">Favourite</p></div>
            <div className="navItem"><p className="textNav">Pressure</p></div>
            <div className="navItem"><p className="textNav">Wind</p></div>
            <div className="fonNavigation"></div>


        </nav>
    )
}