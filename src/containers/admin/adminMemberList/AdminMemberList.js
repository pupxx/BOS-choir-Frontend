import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import * as actions from "../../../store/actions";
import Aux from "../../../hoc/Aux";
import { Table, Form } from "semantic-ui-react";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";

import AdminShowSingleMember from "../adminShowSingleMember/AdminShowSingleMember";
import Confirm from "../../../components/UI/confirm/Confirm";
import SearchBar from "../../../components/searchBar/SearchBar";
import PopUp from "../../../components/UI/popup/PopUp";
import Modal from "../../../components/UI/modal/Modal";
import classes from "./adminMemberList.css";

// import SearchableTable from "../searchableTable/SearchableTable";

class AdminMemberList extends Component {
  state = {
    column: null,
    direction: null,
    emailList: [],
    renderModal: false
  };

  componentWillMount() {
    this.setState({ items: _.map(this.props.adminMemberList) });
  }

  componentDidMount() {
    this.props.fetchAdminMemberList();
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
      <h6>{`Total Members: ${
        _.map(this.props.adminMemberList).length
      } Soprano: ${soprano.length} Alto: ${alto.length} Tenor: ${
        tenor.length
      } Bass: ${bass.length}`}</h6>
    );
  }

  renderModal(memberToDelete) {
    this.setState({ memberToDelete });

    this.state.renderModal
      ? this.setState({ renderModal: false })
      : this.setState({ renderModal: true });
  }

  render() {
    if (!this.props.adminMemberList) {
      return <LoaderWithText />;
    } else if (this.state.renderModal) {
      return (
        <Modal size="small" renderModal={this.renderModal.bind(this)}>
          <Confirm
            content={
              <h6 className={classes.Header}>
                Are you sure you want to delete member{" "}
                <strong>
                  {this.state.memberToDelete.firstname}{" "}
                  {this.state.memberToDelete.lastname}?
                </strong>
              </h6>
            }
            memberToDelete={this.state.memberToDelete}
            renderModal={this.renderModal.bind(this)}
          />
        </Modal>
      );
    } else {
      const { column, items, direction } = this.state;
      return (
        <Aux>
          <div>
            <hr />
            <Form className={classes.Form}>
              <div className={classes.Inputs}>
                <div>
                  <SearchBar
                    title="Search Name"
                    handleSearch={e => this.searchName(e)}
                  />
                </div>
                <div>
                  <SearchBar
                    title="Search Ward"
                    handleSearch={e => this.searchWard(e)}
                  />
                </div>
                <div>
                  <SearchBar
                    title="Search Part"
                    handleSearch={e => this.searchPart(e)}
                  />
                </div>
              </div>
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
                    Ward/Branch
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
                    email,
                    address1,
                    address2,
                    city,
                    prov,
                    postal
                  }) => (
                    <Table.Row key={memberID}>
                      <Table.Cell value={memberID}>
                        <PopUp
                          trigger={
                            <h6>
                              {lastname}, {firstname}
                            </h6>
                          }
                          name={
                            <div className={classes.PopupHead}>
                              {firstname} {lastname}
                            </div>
                          }
                          content={
                            <div className={classes.Popup}>
                              <h6>{address1}</h6>
                              <h6>{address2}</h6>
                              <h6>
                                {city}, {prov} {postal}
                              </h6>
                              <h6>{phone}</h6>
                              <a href={`mailto:${email}`}>{email}</a>
                              <div className={classes.DeleteEdit}>
                                <h6>
                                  <Link
                                    to={`/admin/admin-landing/edit-member/${memberID}`}
                                  >
                                    edit
                                  </Link>
                                </h6>
                                <h6
                                  className={classes.Delete}
                                  onClick={e =>
                                    this.renderModal({
                                      memberID,
                                      firstname,
                                      lastname
                                    })
                                  }
                                >
                                  delete this member
                                </h6>
                              </div>
                            </div>
                          }
                        />
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
