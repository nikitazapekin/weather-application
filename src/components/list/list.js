



import { useParams } from 'react-router-dom';
import "./list.css"
import Im from "./image.png"
import {Routes,Route, Link } from "react-router-dom"
import { store } from '../store/store';
import { fetchData } from '../store/reducers';
import { useState, useEffect } from 'react';
import { Navigation } from '../date/navigation/navigation';
import { Footer } from '../footer/footer';
import { Fons } from '../fons/fons';
const List = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    store.dispatch(fetchData(`${id}`)).then(() => {
      console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
      const countries = store.getState();
      const array = countries.reducer.data.results;
      setData(array);
    });
  }, [id]);
console.log(JSON.stringify(data))
  function render() {
    if (data.length > 0) {
      const rend = data.map((item, index) => {
        const arr=[]
        arr.push(item.latitude)
        arr.push(item.longitude)
        return (
            <Link style={{textDecoration: "none"}} to={`/${arr}`}>
          <div className='renderedListItem' key={index}>
            {index + 1}. {item.name} {item.country} {item.timezone} 
            <div className='renderListItemFon'></div>
          </div>
          </Link>
        );
      });
      return rend;
    }
    return null;
  }

  return (
    <div className='list'>
      <Fons />
      <Navigation />
    <div className="container" style={{position: "relative", top: "130px"}}>
  <h2 class="title">
    <span className="title-word title-word-1 title-word-55">Результат поиска {id}:</span>
  </h2>
</div>
    <div  style={{position: "relative", top: "200px"}}> 
    <img style={{position: "absolute"}} src={Im} alt="sun" className="animationSunnn" />
     {render()} </div>
    </div>
  );
};

export { List };
