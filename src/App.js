import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import './App.css';

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  }
}


export default App;
