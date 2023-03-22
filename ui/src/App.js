import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashPage from "./auth/SplashPage";
import CallbackPage from "./auth/CallbackPage";
import UserProfile from "./profile/UserProfile";

const App = () => {

  return (
    <Routes>
      <Route exact path="/" element={<SplashPage/>} />
      <Route exact path="/callback" element={<CallbackPage/>} />
      <Route exact path="/profile" element={<UserProfile/>} />
    </Routes>
  );

};

export default App;

