import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import Aux from "../../../hoc/Aux";
import { Table, Form } from "semantic-ui-react";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";

import AdminShowSingleMember from "../adminShowSingleMember/AdminShowSingleMember";
import SearchBar from "../searchBar/SearchBar";
import classes from "./adminMemberList.css";

// import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {
    column: null,
    direction: null,
    emailList: []
  };

  componentWillMount() {
    this.setState({ items: _.map(this.props.adminMemberList) });
  }

  componentDidMount() {
    if (!this.props.adminMemberList) {
      this.props.fetchAdminMemberList();
    }
  }

  searchName(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.lastname.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ items: updatedList });
  }

  searchWard(event) {
    var updatedList = _.map(this.props.adminMemberList);
    updatedList = updatedList.filter(function(item) {
      return (
        item.churchname
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
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

  renderTotalParts() {
    let arr = this.state.items;
    let soprano = arr.filter(({ part }) => {
      return part === "Soprano";
    });
    let alto = arr.filter(({ part }) => {
      return part === "Alto";
    });
    let tenor = arr.filter(({ part }) => {
      return part === "Tenor";
    });
    let bass = arr.filter(({ part }) => {
      return part === "Bass";
    });
    return (
      <h6>{`Soprano: ${soprano.length} Alto: ${alto.length} Tenor: ${
        tenor.length
      } Bass: ${bass.length}`}</h6>
    );
  }

  render() {
    if (!this.props.adminMemberList) {
      return <LoaderWithText />;
    } else {
      const { column, items, direction } = this.state;
      return (
        <Aux>
          <div>
            <hr />
            <Form className={classes.Form}>
              <SearchBar
                title="Search Name"
                handleSearch={e => this.searchName(e)}
              />
              <SearchBar
                title="Search Ward"
                handleSearch={e => this.searchWard(e)}
              />
              <SearchBar
                title="Search Part"
                handleSearch={e => this.searchPart(e)}
              />
            </Form>
            {this.state.items.length ? this.renderTotalParts() : null}

            <Table
              className="ui small compact striped celled fixed sortable table"
              color={"yellow"}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    textAlign={"center"}
                    sorted={column === "lastname" ? direction : null}
                    onClick={this.handleSort("lastname")}
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
                    sorted={column === "churchname" ? direction : null}
                    onClick={this.handleSort("churchname")}
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
                  ({
                    memberID,
                    firstname,
                    lastname,
                    phone,
                    part,
                    churchname,
                    email
                  }) => (
                    <Table.Row key={memberID}>
                      <Table.Cell value={memberID}>
                        <Link
                          to={`/admin/admin-landing/member-list/show-member/${memberID}`}
                        >
                          {lastname}, {firstname}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{phone}</Table.Cell>
                      <Table.Cell>{churchname}</Table.Cell>
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
          <div>
            <Switch>
              <Route
                path="/admin/admin-landing/member-list/show-member/:id"
                component={AdminShowSingleMember}
              />
            </Switch>
          </div>
        </Aux>
      );
    }
  }
}
function mapstateToProps(state) {
  return { adminMemberList: state.adminMemberList };
}
export default connect(mapstateToProps, actions)(AdminMemberList);
