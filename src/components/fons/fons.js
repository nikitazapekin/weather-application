import G1 from "./1.webp"
import G2 from "./2.webp"
import G3 from "./3.webp"
import G4 from "./4.webp"
import G5 from "./5.webp"
import G7 from "./7.webp"
import G6 from "./6.gif"
import C1 from "./C1.gif"
import C2 from "./C2.gif"
import C3 from "./C3.gif"
import C4 from "./C4.gif"
import C5 from "./C5.gif"
import Q1 from "./q1.gif"
import Q2 from "./q2.gif"
import Q3 from "./q3.gif"
import Q4 from "./q4.gif"
import Q5 from "./q5.gif"
import "./fons.css"
import { useEffect } from "react"
import { useState } from "react"
/*
export const Fons=()=> {
    const [numb, setNumb]=useState()
    const arrayOfSunrise=[G1,G2, G3,G4, G7,G5,G6]
    const arrayOfNight=[C1, C2, C3, C4, C5]
    useEffect(()=> {

 
  const randomNumber = Math.floor(Math.random() * 5);
  setNumb(randomNumber)
}, numb )
    return (
        <div className="fons">
<img  onLoad={() => console.log(`Image  loaded successfully`)}
  onError={() => console.log(`Failed to load image `)} src={arrayOfNight[numb]} alt="fon" className="fonGif" />
        </div>
    )
} */

      export const Fons = () => {
        const [numb, setNumb] = useState(Math.floor(Math.random() * 5));
        console.log("numb"+numb)
        const arrayOfSunrise = [G1, G2, G3, G4, G7, G5, G6];
        const arrayOfNight = [C1, C2, C3, C4, C5];
        const arrayOfDay = [Q1, Q2, Q3, Q4, Q5];
        const [hours, setHours] = useState(new Date().getHours());
        const [finalArr, setFinalArr] = useState();
      
        useEffect(() => {
          const interval = setInterval(() => {
            setHours(new Date().getHours());
          }, 1000); // обновляем каждую секунду
          return () => clearInterval(interval);
        }, []);
      
        useEffect(() => {
          if (
            hours !== undefined &&
            arrayOfDay !== undefined &&
            arrayOfNight !== undefined &&
            arrayOfSunrise !== undefined
          ) {
            if (hours >= 5 && hours < 11) {
              setFinalArr(arrayOfSunrise);
            }
            if (hours >= 11 && hours < 20) {
              setFinalArr(arrayOfDay);
            }
            if (hours >= 20 && hours < 22) {
                setFinalArr(arrayOfSunrise);
              }
            if ((hours >= 22 && hours <= 23) || (hours >= 0 && hours < 5)) {
              setFinalArr(arrayOfNight);
            }
          }
        }, [hours]);
      
        return (
          <div className="fons">
            {numb !== undefined && finalArr !== undefined && (
          <img onLoad={() => console.log(`Image  loaded successfully`)}
  onError={() => console.log(`Failed to load image `)} src={finalArr[numb]} alt="dwdwwd" className="fonGif" />
  
            )}
          </div>
        );
      }; 
      
/* {numb !== undefined && finalArr !== undefined && (
    <img src={finalArr[numb]} alt="fon" className="fonGif" />
    )} */
//  {rren !== undefined && indexes !== undefined && data !== undefined && (
//{/*<img src={finalArr[numb]} alt="fon" className="fonGif" /> */}