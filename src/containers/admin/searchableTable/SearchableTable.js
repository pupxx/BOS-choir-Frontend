import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Form } from "semantic-ui-react";

import _ from "lodash";
import classes from "./searchableTable.css";

class SearchableTable extends Component {
  state = {
    initialItems: [
      { name: "John", age: 15, gender: "Male" },
      { name: "Amber", age: 40, gender: "Female" },
      { name: "Leslie", age: 25, gender: "Female" },
      { name: "Ben", age: 70, gender: "Male" }
    ],
    items: [],
    column: null,
    direction: null
  };

  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }

  handleChange(event) {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
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
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "age" ? direction : null}
                onClick={this.handleSort("age")}
              >
                Age
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "gender" ? direction : null}
                onClick={this.handleSort("gender")}
              >
                Gender
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map(item => (
              <Table.Row key={item.name}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.age}</Table.Cell>
                <Table.Cell>{item.gender}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default connect(null, null)(SearchableTable);
