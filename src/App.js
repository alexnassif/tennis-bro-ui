
import './App.css';
import Users from './components/user/Users'; 
import LoginPage from './components/user/Login';
import Chat from "./components/chat/ChatBox";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import Registration from './components/user/Registration';
import DialogList from './components/chat/DialogList';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Users}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/register" component={Registration}/>
        <Route path='/chat-list' component={DialogList}/>
      </Switch>
    </Router>
  );
}

export default App;
