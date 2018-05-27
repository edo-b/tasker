import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SideMenu from './containers/SideMenu';
import ProjectsList from './containers/ProjectsList';
import TestComponent from './containers/TestComponent';
import DummyComponent from './containers/DummyComponent';
import PageNotFound from './components/PageNotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="main">
            <SideMenu />
            <Switch>
              <Route path="/" render={() => (<Redirect to="/projects" />)} exact />
              <Route path="/projects" component={ProjectsList} exact />
              <Route path="/test" component={TestComponent} exact />
              <Route path="/dummy" component={DummyComponent} exact />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;