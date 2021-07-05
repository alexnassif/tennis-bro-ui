import logo from './logo.svg';
import './App.css';
import Users from './components/user/Users'; 
import Chat from './Chat';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Users}/>
        <Route exact path="/chat" component={Chat}/>
      </Switch>
    </Router>
  );
}

export default App;
