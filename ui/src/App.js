import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashPage from "./auth/SplashPage";

const App = () =>
  <Router>
  <div>
    <Routes>
      <Route exact path="/" element={<SplashPage/>} />
    </Routes>
  </div>
  </Router>;

export default App;
