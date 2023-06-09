
import { useSelector, useDispatch } from 'react-redux'
//import { createStore } from "redux"
import { createStore, applyMiddleware } from "redux";
import { StrictMode, useState, useRef, useEffect, memo } from 'react'
import { Provider } from "react-redux"
import { combineReducers } from 'redux';

import { todoReducer } from './reducers';
import { reducer } from './reducers';
import { fetchData } from './reducers';
import { dataForSearchList } from './reducers';
import { fav } from './reducers';
import { favCities } from './reducers';
import { coords } from './reducers';
import { stateOfLang } from './reducers';
import { enTimezone } from './reducers';
import thunk from 'redux-thunk';
export const rootReducer = combineReducers({

 reducer: reducer,
 dataForSearchList: dataForSearchList,
 fav:fav,
 favCities:favCities,
 coords: coords,
 stateOfLang:  stateOfLang,
 enTimezone: enTimezone
});

//export const store = createStore(rootReducer, window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION());
export const store = createStore(rootReducer, applyMiddleware(thunk));

/*
store.dispatch(fetchData()).then(() => {
  console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
}); */