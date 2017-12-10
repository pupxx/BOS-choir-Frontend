import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import _ from "lodash";
import { fetchRehearsals } from "../../store/actions/index";

import classes from "./rehearsals.css";

class Rehearsal extends Component {
  constructor(props) {
    super(props);

    this.listRehearsals = this.listRehearsals.bind(this);
  }

  componentDidMount() {
    this.props.fetchRehearsals();
  }

  listRehearsals() {
    return _.map(this.props.rehearsals, el => {
      let date = moment(el.rehearsedate).format("LL");
      let phrase = ` ${el.churchname} ${el.churchphone}`;
      return (
        <div className={classes.Rehearsal} key={el.rehearsedate}>
          <h6>{date}</h6>
          <h6>{phrase}</h6>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h4 className={classes.RehearsalTitle}>Upcoming Choir Practices</h4>
        {this.listRehearsals()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rehearsals: state.rehearsals };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRehearsals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rehearsal);
