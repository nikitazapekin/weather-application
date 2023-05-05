import React, { useState } from 'react';
import "./burgerMenu.css"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const stateId=state.coords
  const latitude=stateId[0]
  const longitude =stateId[1]
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="burger-icon" onClick={toggleMenu}>
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
