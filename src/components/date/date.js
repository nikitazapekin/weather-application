import { useState, useEffect } from 'react';
import {Sun} from "./image.png"
function Date(){
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
    <span>
      <img src={Sun} alt="sun" className="sun" />
      {date.toLocaleTimeString()}
    </span>
  );
}

export default Date
//sank middleware