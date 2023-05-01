import { Navigation } from "../date/navigation/navigation"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
const Favourite=()=> {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const elems = state.fav;
    console.log(elems)
    return (
        <div className="favourite">
           <Navigation />
           <div style={{position: "relative", top: "200px"}}>{elems}</div>
        </div>
    )
}
export {Favourite}