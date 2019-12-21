import React, {Component} from 'react';
import './App.css';
import AppNavBar from './components/AppNavBar';
import Resume from './components/Resume';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App () {
  return (
    <div className="App">
      <Resume />
    </div>
  );
}

export default App;
