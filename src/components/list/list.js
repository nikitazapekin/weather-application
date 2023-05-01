/*import { useParams } from 'react-router-dom';
import "./list.css"
import { store } from '../store/store';
import { fetchData } from '../store/reducers';
import { useState } from 'react';
import { Navigation } from '../date/navigation/navigation';
import { useEffect } from 'react';
const List=()=> {
    const {id} = useParams();
    const [data, setData]= useState()
    useEffect(()=> {


    setTimeout(()=> {
        store.dispatch(fetchData(`${id}`)).then(() => {
            console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
            const countries = store.getState();
         
            const array=countries.reducer.data.results
            setData(array)
           
          });
         
    }, 100)
    //console.log(data)
}, [])
   console.log(data)
   function render(){
   if(data!=undefined){
 const rend=  data.map((item, index)=> {
    return <div className='renderedListItem'>{index+1}. {item.name} {item.country} {item.timezone}<div className='renderListItemFon'></div></div>
   })
   return rend
} 
return 0;
   }
    return (
        <div className='list'>
            <Navigation />
       <div className="resultsOfSearch">Results of search {id}: </div> 
{render()}
        </div>
    )
}
export {List} */





import { useParams } from 'react-router-dom';
import "./list.css"
import {Routes,Route, Link } from "react-router-dom"
import { store } from '../store/store';
import { fetchData } from '../store/reducers';
import { useState, useEffect } from 'react';
import { Navigation } from '../date/navigation/navigation';

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
            {index + 1}. {item.name} {item.country} {item.timezone}  {item.latitude} {item.longitude}
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
      <Navigation />
      <div className='resultsOfSearch'>Results of search {id}: </div>
      {render()}
    </div>
  );
};

export { List };
