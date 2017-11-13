import React, { Component } from 'react';
import About from '../about/About';
import Header from '../../containers/header/Header';
import PerformanceList from '../../containers/performance_list/PerformanceList';

// import './app.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <About />
        <PerformanceList />
      </div>
    )
  }
}

export default App;