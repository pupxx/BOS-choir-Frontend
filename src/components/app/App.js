import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from '../layout/Layout';
import About from '../about/About'
import PerformanceList from '../../containers/performance_list/PerformanceList';
import Rehearsals from '../../containers/rehearsals/Rehearsals';

// import classes from './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Route path="/rehearsals" component={Rehearsals} />
            <Route path="/" exact component={About} />
            <Route path="/" exact component={PerformanceList} />
        </Layout>
      </div>
    )
  }
}

export default App;