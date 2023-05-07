import "./loadBar.css"
import { useState } from "react"
export const loadBar=()=> {
    const style={
        display: boolCheck ? "block" : "none" // show the loading image if boolCheck is true
        }
    return (
      <div>
  <img
        style={style}
        className="loadBar"
        src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif"
        alt="loading"
      />
      </div>
    )
}