import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Signup from './components/Authentication/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Authentication/Login';
import PageNotFound from './PageNotFound';
import Posts from './components/Posts/Posts';
import CreatePosts from './components/Posts/CreatePosts';
import Edit from './components/Edit/Edit';

function App() {
  const [User, setUser] = useState({ id: 0, name: '', email: '', password: '' ,logged_in : false});

  return (
      
    <div className="App">
    <Router>
    <Routes>
    <Route exact path="/" element={<Signup user={User} />} />

     <Route exact path="/login" element={<Login user={User} />} />
     <Route exact path="/posts" element={<Posts user={User} />} />
     <Route exact path="/createPost" element={<CreatePosts user={User} />} />
     <Route exact path="/edit" element={<Edit user={User} />} />
     <Route path="*" element={<PageNotFound />} />
  </Routes>
    </Router>
      
    </div>
  );
}

export default App;
