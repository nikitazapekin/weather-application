import { useState, useEffect } from 'react';
//import { InputSearch } from './components/inputSearch/inputSearch';
//import MyComponent from './components/test/test';
import { InputSearch } from '../inputSearch/inputSearch';
import MyComponent from '../test/test';
//import { Navigation } from './components/date/navigation/navigation';
const Homepage=()=> {
    return (
        <div className="homepage">
  <Time /> 
  effe
 
   <MyComponent /> 

  <InputSearch />
        </div>
    )
}

function Time(){
    const [date, setDate] = useState(new Date());
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
     
     <div className='Time'>
   <div className="day"> {date.toLocaleDateString('en-US', {weekday: 'long'})}{' '} </div>
   <div className="date">   {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}{' '} </div>
    <div className="time">{date.toLocaleTimeString()}</div> 
    <div className="wrapperTime"></div>
  </div>
  
    );
  } 
  export {Homepage}