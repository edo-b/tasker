import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SideMenu from './containers/SideMenu';
import HomeComponent from './containers/HomeComponent';
import TestComponent from './containers/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="main">
            <SideMenu />
            <Switch>
              <Route path="/" component={HomeComponent} exact />
              <Route path="/test" component={TestComponent} exact />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;