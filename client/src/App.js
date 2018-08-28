import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import ProjectListContainer from './containers/ProjectListContainer';
import ProjectInstanceContainer from './containers/ProjectInstanceContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import DummyComponent from './containers/DummyComponent';

import SideMenu from './components/sideMenu/SideMenu';
import PageNotFound from './components/PageNotFound';
import Spinner from './components/Spinner';
import FeedbackMessage from './components/FeedbackMessage';
import { checkSession } from './services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkSession() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
  )} />
)

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
              <PrivateRoute path="/projects" component={ProjectListContainer} exact />
              <PrivateRoute path="/project/:id" component={ProjectInstanceContainer} exact />
              <Route path="/login" component={LoginContainer} exact />
              <Route path="/register" component={RegisterContainer} exact />
              <PrivateRoute exact path="/private" component={DummyComponent} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;