import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConvertForm } from './ConvertForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">        
        <p>Bicycle Converter</p>
        <p><ConvertForm/></p>
      </header>
    </div>
  );
}

export default App;
