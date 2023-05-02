import "./footer.css"
import { useEffect } from "react";
import { useState } from "react";
const Footer =()=> {
    const [footerHeight, setFooterHeight] = useState(0);
    const footerStyle = {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#f5f5f5",
        color: "#333",
        textAlign: "center",
      /*  padding: "20px", */
     height: "30px",
        marginTop: `-${footerHeight}px`

      };
  useEffect(() => {
    setFooterHeight(document.getElementById("footer").offsetHeight);
  }, []);
    return(
        <footer id="footer" style={footerStyle}>
        footer
      </footer>
    )
}
export {Footer}