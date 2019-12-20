import React, {Component} from 'react';
import './App.css';
import AppNavBar from './components/AppNavBar';
import Resume from './components/Resume';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App () {
  // handleChange = ({target: {value, name}}) => {
  //   this.setState ({[name]: value});
  // };

  return (
    <div className="App">
      {/* <input
          label="First Name"
          required
          name="firstname"
          onChange={this.handleChange}
        />
        <input
          label="Last Name"
          required
          name="lastname"
          onChange={this.handleChange}
        />
        <input
          label="Email"
          type="email"
          required
          name="email"
          onChange={this.handleChange}
        />
        <button onClick={this.creatAndDownloadPDF}>
          Download PDF
        </button> */}
      <AppNavBar />
      <Resume />
    </div>
  );
}

export default App;
