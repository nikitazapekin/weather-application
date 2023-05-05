import React, { useState } from 'react';
import "./burgerMenu.css"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const stateId=state.coords
  const latitude=stateId[0]
  const longitude =stateId[1]
  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
      });
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="burger-icon icon nav-icon-3" onClick={()=>{
        toggleMenu()
        }}>
        <span></span>
        <span></span>
        <span></span>



  </button> 
   
      <nav className={`burger-menu ${isOpen ? 'burger-menu-open' : ''}`}>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/favourite">Избранное</Link>
          </li>
          <li>
            <Link to={`/pressure/${latitude}/${longitude}`}>Давление</Link>
          </li>
          <li>
            <Link to={`/wind/${latitude}/${longitude}`}>Ветер</Link>
          </li>
        </ul>
  </nav> 
    </div>
  );
};

export default BurgerMenu;
