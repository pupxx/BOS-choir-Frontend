import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { fetchRehearsals } from "../../store/actions/index";

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
      return (
        <div key={el.rehearsedate}>
          <p>{el.rehearsedate}</p>
          <p>{el.churchname}</p>
          <p>{el.churchphone}</p>
        </div>
      );
    });
  }

  render() {
    return <div>{this.listRehearsals()}</div>;
  }
}

function mapStateToProps(state) {
  return { rehearsals: state.rehearsals };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRehearsals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rehearsal);
