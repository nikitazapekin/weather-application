import { Navigation } from "../date/navigation/navigation"
import {Routes,Route, Link } from"react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { favCities } from "../store/reducers";
import { useTranslation } from 'react-i18next';
import { Fons } from "../fons/fons";
import "./favourite.css"
const Favourite=()=> {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const state = useSelector((state) => state);
    const elems = state.fav;
 const timezone=state.enTimezone
 //console.log(timezone)
 const langg= state.stateOfLang
    const elemsCity=state.favCities
    console.log(elems)
    console.log(elemsCity)
   const  newArrCity =elemsCity.reduce((acc, el, i) => {
        if (i % 3 === 0) {
          acc.push([el]);
        } else {
          acc[acc.length - 1].push(el);
        }
        return acc;
      }, []);
    


      const  newArrCityCoords =elems.reduce((acc, el, i) => {
        if (i % 2 === 0) {
          acc.push([el]);
        } else {
          acc[acc.length - 1].push(el);
        }
        return acc;
      }, []);
      console.log("0"+newArrCity[0])
      console.log("1"+newArrCity[1])
   const  newArr = elems.slice(0, elems.length / 2);
const rendEl=(newArr).map((item, index)=> {
//const arr=[elems[index], elems[index+1]]
const arr=[newArrCityCoords[index][0], newArrCityCoords[index][1]]
const latitude=newArrCityCoords[index][0]
const longitude=newArrCityCoords[index][1]
const city=newArrCity[0]
const state=newArrCity[1]
const country=newArrCity[2]
    return(
    
      
         <div className="favCityItem">
           <Link style={{textDecoration: "none", color: "#fff"}} to={`/${arr}`}>
          <div>
         
          {index+1}.

        { langg===true ? newArrCity[index].map((item, index)=>{ if(item!=undefined){
          return item+" "   
        }}) : newArrCity[index].map(item=>{ if(item!=undefined){
          return timezone[index]+" "   
        }}) }
        


        <div className="favCityItemFon"></div>
        </div>
        </Link> 
        <div onClick={()=> {
            dispatch({type: "REMOVE_FROM_FAV", latitude: latitude, longitude: longitude, city: city, country: country, state: state})
            dispatch({type: "REMOVE_FROM_FAV_CITY",  city: city, country: country, state: state})
        }} class="cl-btn-7"></div>
          </div>
    
    )
})
    return (
        <div className="favourite">
          <Fons />

        <div class="container">
  <h2 class="title">
    <span class="title-word title-word-1">{t('favourite.list')} </span>
    <span class="title-word title-word-2">{t('favourite.favourite')} </span>
    <span class="title-word title-word-3">{t('favourite.cities')} </span>
    
  </h2>
</div>
           <div style={{position: "relative", top: "200px"}}>{rendEl}</div>
           <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  zIndex: "11111111111", height: "120px"  }}>
           <Navigation />
           </div>
        </div>
    )
}
export {Favourite}

/*
 {langg ===true  && ( 
    <div>
    <span class="title-word title-word-1">{state} </span>
    <span class="title-word title-word-2">{city} </span>
    <span class="title-word title-word-3">{country} </span>
    </div>
    )}
    {langg===false && timezone!=undefined && (
   <span class="title-word title-word-1">{timezone} </span> 
 )}





  <Link style={{textDecoration: "none"}} to={`/${arr}`}> 
         <div className="favCityItem">{index+1}.
        { newArrCity[index].map(item=>{ if(item!=undefined){
          return item+" "   
        }}) }
        

<div class="cl-btn-7"></div>
        <div className="favCityItemFon"></div>
          </div>
      </Link> 
      */