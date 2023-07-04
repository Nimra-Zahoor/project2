import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Signup from './components/Authentication/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Authentication/Login';
import PageNotFound from './PageNotFound';
import Posts from './components/Posts/Posts';
function App() {

  return (

    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/login' Component={Login}/>
        <Route exact path="/" Component={Signup} />
        <Route exact path="/posts" Component={Posts}/>
        <Route exact path='*' Component={PageNotFound}/>

       
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
