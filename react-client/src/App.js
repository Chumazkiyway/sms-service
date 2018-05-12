import React, { Component } from 'react';

import Header from './Header';
import Main from './Main'
var menu = ['Login','Register','Send','Accept'];

class App extends Component {
  render() {
    return (
      <div>
        <Header listMenu={menu} headerName="SMS Gateway"/>
        <Main/>
      </div>
    );
  }
}

export default App;
