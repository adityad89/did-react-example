import React, { Component } from 'react';
import logo from './Signin_font.png';
import './App.css';

function SignIn() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="http://localhost:4000/authenticate">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
    </div>
  );
}

export default SignIn