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
import En from "./eng.jpg"
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
    return(
        <nav className="navigation">
        <Link to="/"> <div className="navItem"> <img src={Logo} alt="logo" className="logoOfWebPage" />  </div> </Link>
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


<div class="ccd" onClick={()=> {    //searchCountries

//  if(country!=null){
  console.log(country)
  const currentLocation = window.location;
  setTimeout(()=>{
currentLocation.reload()

}, 10)}}><a href="#" class="ddott"><span className="trStyle">search</span></a></div>
            {/* 
<Link to={`/test/${country}`}>
  <button className="bttr tick" onClick={()=> {    //searchCountries

  //  if(country!=null){
    console.log(country)
    const currentLocation = window.location;
    setTimeout(()=>{
currentLocation.reload()
 
}, 10)
  //  }
}} >search</button></Link> */}
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
}