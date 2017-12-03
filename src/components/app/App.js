import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "../layout/Layout";
import About from "../about/About";
import PerformanceList from "../../containers/performance_list/PerformanceList";
import Rehearsals from "../../containers/rehearsals/Rehearsals";
import Signup from "../../components/auth/signup/Signup";
import Signin from "../../components/auth/signin/Signin";

// import classes from './app.css';

class App extends Component {
  renderAboutandPerformances() {
    return (
      <div>
        <About />
        <PerformanceList />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/rehearsals" component={Rehearsals} />
            <Route path="/" render={this.renderAboutandPerformances} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
