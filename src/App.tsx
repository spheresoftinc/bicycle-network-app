import React from 'react';
import logo from './logo.png';
import './App.css';
import { ConvertForm } from './ConvertForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bicycle Converter</p>
        <p><ConvertForm/></p>
      </header>
    </div>
  );
}

export default App;
