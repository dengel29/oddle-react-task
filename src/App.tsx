import React from 'react';
import './App.css';
import Cockpit from './components/Cockpit/Cockpit'
import {BrowserRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import UserProfile from './components/UserProfile/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Cockpit}/>
        <Route path="/:login" exact component={UserProfile}/>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
