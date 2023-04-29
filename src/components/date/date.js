import { useState, useEffect } from 'react';
import {Sun} from "./image.png"
function Date(props){
  const [date, setDate] = useState(new Date());
  const {timing}=props
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
   
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  timing(2)
  return (
    <span>
      {/*<img src={Sun} alt="sun" className="sun" /> */}
      {date.toLocaleTimeString()}
    </span>
  );
}

export default Date
//sank middleware