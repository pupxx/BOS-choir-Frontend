import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
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
      let date = moment(el.rehearsedate).format("LL");
      return (
        <div key={el.rehearsedate}>
          <p>{date}</p>
          <p>
            {el.churchname}
            <span>{el.churchphone}</span>
          </p>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.location);
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
