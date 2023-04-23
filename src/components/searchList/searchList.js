import { store } from "../store/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
export const SearchList =()=> {
    const dispatch = useDispatch();
  const state = useSelector((state) => state);
  
    return( 
    <div className="searchList">
    feffe
    </div>
    )
}