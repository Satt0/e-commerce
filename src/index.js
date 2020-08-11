import React from 'react';
import ReactDOM from 'react-dom';
import store from './Components/store/store'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import API from './API'
import cookie from 'react-cookies';
if(cookie.load('id'))
{
  store.dispatch({type:'logIn',payload:cookie.load('id')})
}

API.getAll().then(res=>{
  store.dispatch({type:'updateItem',payload:res})
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
