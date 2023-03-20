import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashPage from "./auth/SplashPage";
import CallbackPage from "./auth/CallbackPage";

const App = () => {

  return (
    <Routes>
      <Route exact path="/" element={<SplashPage/>} />
      <Route exact path="/callback" element={<CallbackPage/>} />
    </Routes>
  );

  // <Router>
  // <div>
  //   <Routes>
  //     <Route exact path="/" element={<SplashPage/>} />
  //     <Route exact path="/callback" element={<CallbackPage/>} />
  //   </Routes>
  // </div>
  // </Router>;

};

export default App;

