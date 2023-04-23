import "./navigation.css"
import { useSelector, useDispatch } from "react-redux";

//import { fetchData } from "../store/reducers";
import { fetchData } from "../../store/reducers";
//import { store } from "../store/store";
import { store } from "../../store/store";
import { useState } from "react";
import Logo from "./logo.png"
export const Navigation=()=> {
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
        return <div className="renderedCountry">{element.name} {element.timezone}</div>
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