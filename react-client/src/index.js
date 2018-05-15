import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Accept from './Accept';
import Send from './Send';
import Undefined from './Undefined';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
var menu = ['Send','Accept'];
ReactDOM.render(
  <Router>
  	<div>
  		<Header headerName="SMS Gateway" listMenu={menu}/>
  		<Switch>
	      <Route exact path='/' render={(props) => <Home/>} />
	      <Route path='/login' render={(props) => <Login/>}/>
	      <Route path='/register' render={(props) => <Register/>}/>
	      <Route path='/accept' render={(props) => <Accept/>}/>
	      <Route path='/send' render={(props) => <Send/>}/>
        <Route component={Undefined}/>
	    </Switch>
  	</div>
  </Router>,
   document.getElementById('root'));

registerServiceWorker();
