/*import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // подключаем middleware thunk
import { combineReducers } from 'redux';
// Это действие (action) будет вызывать асинхронный запрос к серверу
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_REQUEST' });

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?id=625143&appid=fc64e04f2a354206a57c0d4cf2ca7ea0'
      );
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  };
};

// reducer.js
const initialState = {
  data: [],
  loading: false,
  error: null,
};

 const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
 const rootReducer = combineReducers({
    reducer: reducer
  });
 export const store = createStore(rootReducer, applyMiddleware(thunk), window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()); // применяем middleware thunk
//console.log(store.getState());

store.dispatch(fetchData()).then(() => {
  console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
});

*/




import { useSelector, useDispatch } from 'react-redux'
//import { createStore } from "redux"
import { createStore, applyMiddleware } from "redux";
import { StrictMode, useState, useRef, useEffect, memo } from 'react'
import { Provider } from "react-redux"
import { combineReducers } from 'redux';

import { todoReducer } from './reducers';
import { reducer } from './reducers';
import { fetchData } from './reducers';
import thunk from 'redux-thunk';
export const rootReducer = combineReducers({

 reducer: reducer
});

//export const store = createStore(rootReducer, window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION());
export const store = createStore(rootReducer, applyMiddleware(thunk));

/*
store.dispatch(fetchData()).then(() => {
  console.log(JSON.stringify(store.getState())); // выводим измененное состояние после завершения запроса
}); */