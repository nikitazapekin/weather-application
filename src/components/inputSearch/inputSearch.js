import { useSelector, useDispatch } from "react-redux";
import {Routes,Route, Link } from"react-router-dom"
import "./inputSearch.css"
import { fetchData } from "../store/reducers";
import { store } from "../store/store";
import { useState } from "react";
import {  useSearchParams } from 'react-router-dom';
const InputSearch=()=>{
   const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [country, setCountry] =useState("")
    const [countryData, setCountryData] =useState([])
    const typedCountry=(country)=> {
    
        setTimeout(()=> {
           // console.log(1)
          
            store.dispatch(fetchData(`${country}`)).then(() => {
                console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
                const countries = store.getState();
              //  setCountryData(countries)
                const array=countries.reducer.data.results
                setCountryData([])
           /*     array.slice(0, 10).forEach((element) => {
                    // выполнить код для каждого элемента
                    setCountryData([...countryData, element ])
                    //console.log(element);
                  }); */
                  const newData = array.slice(0, 10); // создаем массив с новыми данными

  setCountryData(prevState => [...prevState, ...newData]); // обновляем состояние одним вызовом setCountryData

              });
             
        }, 100)
      

    
    }
    const renderedElements =countryData.map(element=> {
      console.log(11)
    //   return <Link to={`/${id}`}><div className="renderedCountry">{element.name} {element.timezone}</div> </Link>
    })
    return (
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
    ) 
}
export {InputSearch} 