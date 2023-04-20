





import { useState, useEffect } from 'react';
import "./App.css"
function App(){
  return <div className="App">
    <Time />
  </div>
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
export default App;

//https://www.figma.com/file/QzR65XLC5oQrsDTn3kFVN7/WEATHER-APP-(Community)?node-id=0%3A1&t=W7NUznGq5AoaQX3R-1
