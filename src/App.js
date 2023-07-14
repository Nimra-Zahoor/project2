import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreatePosts from "./components/Posts/CreatePosts";
import Login from "./components/Authentication/Login";
import PageNotFound from "./PageNotFound";
import Posts from "./components/Posts/Posts";
import Signup from "./components/Authentication/Signup";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/create-post" element={<CreatePosts />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
