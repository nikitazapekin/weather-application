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
import "./fons.css"
import { useEffect } from "react"
import { useState } from "react"
export const Fons=()=> {
    const [numb, setNumb]=useState()
    const arrayOfSunrise=[G1,G2, G3,G4, G7,G5,G6]
    const arrayOfNight=[C1, C2, C3, C4, C5]
    useEffect(()=> {

 
  const randomNumber = Math.floor(Math.random() * 7);
  setNumb(randomNumber)
}, numb )
    return (
        <div className="fons">
<img src={arrayOfNight[numb]} alt="fon" className="fonGif" />
        </div>
    )
}