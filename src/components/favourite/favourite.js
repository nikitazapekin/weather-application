import { Navigation } from "../date/navigation/navigation"
import {Routes,Route, Link } from"react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { favCities } from "../store/reducers";
import "./favourite.css"
const Favourite=()=> {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const elems = state.fav;
   // const arr=[elems[0], elems[1]]
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
           <Link style={{textDecoration: "none"}} to={`/${arr}`}>
          <div>
         
          {index+1}.
        { newArrCity[index].map(item=>{ if(item!=undefined){
          return item+" "   
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
         <h1 className="listOfFav" style={{position: "relative", top: "100px"}}>List of favourite cities:</h1>
           <div style={{position: "relative", top: "200px"}}>{rendEl}</div>
           <Navigation />
        </div>
    )
}
export {Favourite}

/*
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