import { useParams } from 'react-router-dom';
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
export {List}