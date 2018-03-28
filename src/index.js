import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import Header from './Header';
import Accept from './Accept';
import Login from './Login';
import Register from './Register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
var numberSMS = 3;
var numberMessageViber = 0;
var cost = 0.50;

ReactDOM.render(
  <BrowserRouter>
  	<App/>
  </BrowserRouter>,
   document.getElementById('root'));

registerServiceWorker();
