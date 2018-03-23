import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import { Table } from "semantic-ui-react";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import _ from "lodash";

import Confirm from "../../../components/UI/confirm/Confirm";
import SearchBar from "../../../components/searchBar/SearchBar";
import PopUp from "../../../components/UI/popup/PopUp";
import Modal from "../../../components/UI/modal/Modal";
import classes from "./adminMemberList.css";
import AdminAddMember from "../adminAddMember/AdminAddMember";

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

  renderHeaders() {
    const headers = ["Name", "Phone", "Ward/Branch", "Part", "Email"];
    const columnNames = ["lastname", "phone", "churchname", "part", "email"];
    return headers.map((el, i) => {
      return (
        <Table.HeaderCell
          key={i}
          textAlign={"center"}
          sorted={
            this.state.column === columnNames[i] ? this.state.direction : null
          }
          onClick={this.handleSort(columnNames[i])}
        >
          <h6>{el}</h6>
        </Table.HeaderCell>
      );
    });
  }

  renderRows() {
    return _.map(
      this.state.items,
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
              position={"right center"}
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
                      <Link to={`/admin/admin-landing/edit-member/${memberID}`}>
                        edit
                      </Link>
                    </h6>
                    <h6
                      className={classes.Delete}
                      onClick={e =>
                        this.editDeleteModalData({
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
    );
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

  renderModal() {
    this.state.renderModal
      ? this.setState({ renderModal: false })
      : this.setState({ renderModal: true });
  }

  deleteMember() {
    const id = this.state.memberToDelete.memberID;
    const location = () =>
      this.props.history.push("/admin/admin-landing/member-list");
    this.props.deleteMember(id, location);
  }

  editDeleteModalData(memberToDelete) {
    this.setState({ memberToDelete });

    let modalData = (
      <Modal size="small">
        <Confirm
          content={
            <h6>
              Are you sure you want to delete member{" "}
              <strong>
                {memberToDelete.firstname} {memberToDelete.lastname}?
              </strong>
            </h6>
          }
          confirmButtonText="Confirm"
          confirmAction={this.deleteMember.bind(this)}
          cancelAction={this.renderModal.bind(this)}
          cancelButtonText="Cancel"
        />
      </Modal>
    );
    this.setState({
      modalData,
      renderModal: true
    });
  }

  addMember() {
    let modalData = (
      <Modal>
        <AdminAddMember cancelAction={this.renderModal.bind(this)} />
      </Modal>
    );
    this.setState({ renderModal: true });
    this.setState({ modalData: modalData });
  }

  render() {
    if (!this.props.adminMemberList) {
      return <LoaderWithText />;
    } else if (this.state.renderModal) {
      return this.state.modalData;
    } else {
      return (
        <div>
          <hr />
          <form>
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
          </form>
          <div className={classes.TotalPartsWrapper}>
            <div className={classes.Parts}>
              {this.state.items.length ? this.renderTotalParts() : null}
            </div>
          </div>
          <div className={classes.TableWrapper}>
            <Table
              className="ui small compact striped celled fixed sortable table"
              color={"yellow"}
            >
              <Table.Header>
                <Table.Row>
                  {this.renderHeaders()}
                  <Table.HeaderCell textAlign={"center"}>
                    Group Email
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderRows()}</Table.Body>
            </Table>
          </div>
        </div>
      );
    }
  }
}
function mapstateToProps(state) {
  return { adminMemberList: state.adminMemberList };
}
export default connect(mapstateToProps, actions)(AdminMemberList);
