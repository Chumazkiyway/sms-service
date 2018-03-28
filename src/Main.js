import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Accept from './Accept';
import Send from './Send';


class Main extends Component {
  render() {
    return (
      <div>
	    <Switch>
	      <Route exact path='/' component={Login}/>
	      <Route path='/register' component={Register}/>
	      <Route path='/accept' component={Accept}/>
	      <Route path='/send' component={Send}/>
	    </Switch>
	  </div>
    );
  }
}

export default Main;
