import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../../store/actions";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import Card from "../../../components/card/Card";
import Aux from "../../../hoc/Aux";
import SearchBar from "../../../components/searchBar/SearchBar";

import classes from "./adminPerformanceList.css";

class AdminPerformanceList extends Component {
  state = {
    items: []
  };

  componentWillMount() {
    this.setState({ items: _.map(this.props.performanceList) });
  }

  componentDidMount() {
    this.props.fetchAdminPerformanceList();
  }

  renderPerformanceInfo() {
    if (!this.props.performanceList) {
      return <LoaderWithText />;
    } else {
      return _.map(this.state.items, (el, i) => {
        return (
          <div key={i}>
            <Card
              className={classes.Cards}
              key={i}
              header={el.perfname}
              date={el.formattedDate}
              time={el.perftime}
              description={
                <div>
                  Location:
                  <address className={classes.Address}>
                    {el.churchname} <br />
                    {el.churchphone}
                  </address>
                </div>
              }
            />
          </div>
        );
      });
    }
  }

  searchYear(event) {
    var updatedList = _.map(this.props.performanceList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.perfyear.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ items: updatedList });
  }

  render() {
    console.log(this.props.performanceList);
    if (!_.map(this.props.performanceList).length) {
      return <LoaderWithText />;
    } else {
      return (
        <Aux>
          <div className={classes.Inputs}>
            <SearchBar
              title="Search Year"
              handleSearch={e => this.searchYear(e)}
            />
          </div>
          <div className={classes.CardWrapper}>
            {this.renderPerformanceInfo()}
          </div>
        </Aux>
      );
    }
  }
}

const mapStateToProps = state => ({
  performanceList: state.performanceList
});

export default connect(mapStateToProps, actions)(AdminPerformanceList);
