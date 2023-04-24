import { store } from "../store/store"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
export const SearchList =()=> {
  const {id} = useParams();
  const [country, setCountry]=useState('')
  const [data, setData]=useState()
    const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(id)
useEffect(()=>{
 if(id!=undefined){
 const str = id;
const parts = str.split(',');
const latitude = parts[0]; 
const longitude = parts[1]; 
 const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
fetch(url)
  .then(response => response.json())
  .then(data => {
   
    setCountry(data.address.city)
  })
  .catch(error => {
    console.error('Error:', error);
  });






  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,cloudcover_low,cloudcover_high,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m&forecast_days=16`;
  fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
   console.log(data)
   setData(data)
   // setCountry(data.address.city)
  })
  .catch(error => {
    console.error('Error:', error);
  }); 

}
}, [])



    return( 
    <div className="searchList">
    feffe
    {country}
    </div>
    )
}