import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProjectListContainer from './containers/ProjectListContainer';
import ProjectInstanceContainer from './containers/ProjectInstanceContainer';
import TestComponent from './containers/TestComponent';
import DummyComponent from './containers/DummyComponent';

import SideMenu from './components/sideMenu/SideMenu';
import PageNotFound from './components/PageNotFound';
import Spinner from './components/Spinner';
import FeedbackMessage from './components/FeedbackMessage';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="main">
            <SideMenu />
            <Spinner />
            <FeedbackMessage />
            <Switch>
              <Route path="/" render={() => (<Redirect to="/projects" />)} exact />
              <Route path="/projects" component={ProjectListContainer} exact />
              <Route path="/project/:id" component={ProjectInstanceContainer} exact />
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