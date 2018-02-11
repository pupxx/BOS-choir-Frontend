import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Table, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";

import classes from "./adminMemberList.css";

// import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {
    items: _.map(this.props.adminMemberList),
    column: null,
    direction: null,
    emailList: []
  };

  componentWillMount() {
    this.setState({ items: _.map(this.props.adminMemberList) });
  }

  // componentWillReceiveProps() {
  //   this.setState({ items: _.map(this.props.adminMemberList) });
  // }

  searchName(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ items: updatedList });
  }

  searchWard(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.church.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ items: updatedList });
  }

  searchPart(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.part.toLowerCase().search(event.target.value.toLowerCase()) !== -1
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

  addToEmailList = e => {
    if (this.state.emailList.length && e.target.checked === false) {
      for (var i = 0; i < this.state.emailList.length; i++) {
        if (this.state.emailList[i] === e.target.value) {
          this.state.emailList.splice(i, 1);
        }
      }
    } else {
      this.state.emailList.push(e.target.value);
    }
    console.log(this.state.emailList);
  };

  render() {
    console.log("!!!!!!!!", this.props);
    if (!this.props.adminMemberList) {
      return <LoaderWithText />;
    } else {
      const { column, items, direction } = this.state;
      return (
        <div>
          <hr />
          <Form className={classes.Form}>
            <div className="ui mini input labeled">
              <label className="ui label label">Search Name</label>
              <input
                type="text"
                placeholder="Search"
                onChange={this.searchName.bind(this)}
              />
            </div>
            <div className="ui mini input labeled">
              <label className="ui label label">Searh Ward</label>
              <input
                type="text"
                placeholder="Search"
                onChange={this.searchWard.bind(this)}
              />
            </div>
            <div className="ui mini input labeled">
              <label className="ui label label">Searh Part</label>
              <input
                type="text"
                placeholder="Search"
                onChange={this.searchPart.bind(this)}
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
                  textAlign={"center"}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign={"center"}
                  sorted={column === "phone" ? direction : null}
                  onClick={this.handleSort("phone")}
                >
                  Phone
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign={"center"}
                  sorted={column === "church" ? direction : null}
                  onClick={this.handleSort("church")}
                >
                  Church
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign={"center"}
                  sorted={column === "part" ? direction : null}
                  onClick={this.handleSort("part")}
                >
                  Part
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign={"center"}
                  sorted={column === "email" ? direction : null}
                  onClick={this.handleSort("email")}
                >
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell textAlign={"center"}>
                  Group Email
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(
                items,
                ({ memberID, name, phone, part, church, email }) => (
                  <Table.Row key={memberID}>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{phone}</Table.Cell>
                    <Table.Cell>{church}</Table.Cell>
                    <Table.Cell>{part}</Table.Cell>
                    <Table.Cell>
                      <a href={`mailto:${email}`}>{email}</a>
                    </Table.Cell>
                    <Table.Cell>
                      <div className={classes.CheckBox}>
                        <input
                          type="checkbox"
                          value={email}
                          onClick={e => {
                            this.addToEmailList(e);
                          }}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
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
