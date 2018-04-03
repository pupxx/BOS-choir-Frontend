import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import * as actions from "../../../store/actions";
import _ from "lodash";
import LoaderWithText from "../../../components/UI/loaders/LoaderWithText";
import SearchBar from "../../../components/searchBar/SearchBar";
import { Table } from "semantic-ui-react";
import PopUp from "../../../components/UI/popup/PopUp";

import classes from "./adminSinglePerformance.css";
import styles from "../adminMemberList/adminMemberList.css";

class AdminSinglePerformance extends Component {
  state = {
    items: [],
    emailList: []
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .get(`http://localhost:4000/admin/performance-attendance/${id}`, {
        headers
      })
      .then(attendance => {
        this.setState({
          performanceAttendance: attendance.data,
          items: attendance.data
        });
      });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    let location = () =>
      this.props.history.push(`/admin/admin-landing/performance/${id}`);
    if (_.map(this.props.singlePerformance).id !== id) {
      this.props.fetchSinglePerformance(id, location);
    }
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

  searchName(event) {
    var updatedList = _.map(this.state.performanceAttendance);
    updatedList = updatedList.filter(function(item) {
      return (
        item.lastname.toLowerCase().search(event.target.value.toLowerCase()) !==
        -1
      );
    });
    this.setState({ items: updatedList });
  }

  searchWard(event) {
    var updatedList = _.map(this.state.performanceAttendance);
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
    var updatedList = _.map(this.state.performanceAttendance);
    updatedList = updatedList.filter(function(item) {
      return (
        item.part.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ items: updatedList });
  }

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
        _.map(this.state.performanceAttendance).length
      } Soprano: ${soprano.length} Alto: ${alto.length} Tenor: ${
        tenor.length
      } Bass: ${bass.length}`}</h6>
    );
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

  renderPerformance() {
    return _.map(
      this.props.singlePerformance,
      ({
        performanceID,
        perfname,
        formattedTime,
        churchID,
        churchname,
        churchaddress1,
        churchaddress2,
        churchcity,
        churchphone,
        formattedDate,
        menattire,
        womenattire
      }) => {
        return (
          <div key={performanceID}>
            <h5>{perfname}</h5>
            <h5>{formattedDate}</h5>
            <h5>{formattedTime}</h5>
            <h5>{churchname}</h5>
            <h5>{churchaddress1}</h5>
            <h5>{churchaddress2}</h5>
            <h5>{churchcity}</h5>
            <h5>{churchphone}</h5>
            <h5>{menattire}</h5>
            <h5>{womenattire}</h5>
            {this.renderPieces()}
          </div>
        );
      }
    );
  }

  renderPieces() {
    let id = this.props.match.params.id;
    return _.map(this.props.singlePerformance[id].pieces, el => {
      return (
        <div key={el.pieceID}>
          <h5>{el.piecetitle}</h5>
          <h5>{el.perfpieceID}</h5>
        </div>
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
                <div className={styles.PopupHead}>
                  {firstname} {lastname}
                </div>
              }
              content={
                <div className={styles.Popup}>
                  <h6>{address1}</h6>
                  <h6>{address2}</h6>
                  <h6>
                    {city}, {prov} {postal}
                  </h6>
                  <h6>{phone}</h6>
                  <a href={`mailto:${email}`}>{email}</a>
                  <div>
                    <h6 className={classes.RemoveWrapper}>
                      <a className={classes.Remove} href="">
                        Remove from Attendance
                      </a>
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
            <div className={styles.CheckBox}>
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

  renderAttendance() {
    return (
      <div>
        <hr />
        <form>
          <div className={styles.Inputs}>
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
        <div className={styles.TotalPartsWrapper}>
          <div className={styles.Parts}>
            {this.state.items.length ? this.renderTotalParts() : null}
          </div>
          {/* <div className={classes.AddMember}>
              {this.state.items.length ? (
                <h5 onClick={() => this.addMember()} className={classnames}>
                  Add Member
                </h5>
              ) : null}
            </div> */}
        </div>
        <div className={styles.TableWrapper}>
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

  render() {
    console.log(this.props.singlePerformance);
    let classnames = `ui medium label ${classes.ButtonStyle}`;

    if (!this.props.singlePerformance) {
      return <LoaderWithText />;
    } else {
      return (
        <div>
          <div className={classes.PerformanceLinksWrapper}>
            <div>{this.renderPerformance()}</div>
            <div className={classes.QuickLinksWrapper}>
              <h5 className={classnames}>Edit Performance</h5>
              <h5 className={classnames}>DeletePerormance</h5>
            </div>
          </div>
          <div className={classes.AttendanceWrapper}>
            {this.renderAttendance()}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    singlePerformance: state.singlePerformance
  };
}

export default withRouter(
  connect(mapStateToProps, actions)(AdminSinglePerformance)
);
