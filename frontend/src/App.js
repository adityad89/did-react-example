import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
           <Route exact path='/' component={SignIn}/>
           <Route exact path='/Home' component={Home}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

