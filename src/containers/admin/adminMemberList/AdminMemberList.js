import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Table, Form } from "semantic-ui-react";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";

import classes from "./adminMemberList.css";

// import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {
    items: _.map(this.props.adminMemberList),
    column: null,
    direction: null
  };

  componentWillMount() {
    this.props.fetchAdminMemberList();
  }

  componentWillReceiveProps() {
    this.setState({ items: _.map(this.props.adminMemberList) });
  }

  handleChange(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.lastname.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ items: updatedList });
  }

  handleSort = clickedColumn => () => {
    const { column, items, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        items: _.sortBy(items, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      items: items.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, items, direction } = this.state;
    if (!_.map(this.props.adminMemberList).length) {
      return (
        <div>
          <LoaderWithText />
        </div>
      );
    } else {
      return (
        <div>
          <hr />
          <Form className={classes.Form}>
            <div className="ui mini input labeled">
              <label className="ui label label">Search Name</label>
              <input
                type="text"
                placeholder="Search"
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </Form>
          <Table
            className="ui small compact striped celled fixed sortable table"
            color={"yellow"}
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === "firstname" ? direction : null}
                  onClick={this.handleSort("firstname")}
                >
                  First Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "lastname" ? direction : null}
                  onClick={this.handleSort("lastname")}
                >
                  Last Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "email" ? direction : null}
                  onClick={this.handleSort("email")}
                >
                  Email
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(items, ({ memberID, firstname, lastname, email }) => (
                <Table.Row key={memberID}>
                  <Table.Cell>{firstname}</Table.Cell>
                  <Table.Cell>{lastname}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    }
  }
}
function mapstateToProps(state) {
  return { adminMemberList: state.adminMemberList };
}
export default connect(mapstateToProps, actions)(AdminMemberList);
