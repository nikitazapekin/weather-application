import { useDispatch } from 'react-redux';
//import { fetchData } from './redux/actions';
import { fetchData } from '../store/reducers';
//import { fetchData } from '../store/store';
import { store } from '../store/store';
function MyComponent() {
  const dispatch = useDispatch();

  const handleClick = () => {
   // dispatch(fetchData());
   store.dispatch(fetchData()).then(() => {
    console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
  });
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      sxsxs
    </div>
  );
}

export default MyComponent; 


/*
const MyComponent=()=> {

}
export {MyComponent} */