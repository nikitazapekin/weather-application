import { useSelector, useDispatch } from "react-redux";
//import { fetchData, store } from "../store/store";
import { fetchData } from "../store/reducers";
import { store } from "../store/store";
const InputSearch=()=>{
   const dispatch = useDispatch();
    const state = useSelector((state) => state);
    
    const typedCountry=()=> {
        
    }
    return (
        <div className="inputSearch">
           <input type="text" placeholder="search..." className="inputSearchForm" onChange={()=> typedCountry()} />

        </div>
    ) 
}
export {InputSearch} 