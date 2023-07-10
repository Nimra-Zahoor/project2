import "./App.css";
import React, { useEffect, useState } from "react";
import Signup from "./components/Authentication/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import PageNotFound from "./PageNotFound";
import Posts from "./components/Posts/Posts";
import CreatePosts from "./components/Posts/CreatePosts";

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
