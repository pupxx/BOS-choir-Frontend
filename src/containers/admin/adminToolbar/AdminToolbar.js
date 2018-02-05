import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/Aux";

export class AdminToolbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Aux>
        <div>
          <Menu pointing secondary>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
              as={Link}
              to="/admin/admin-landing"
            />
            <Menu.Item
              name="profile"
              active={activeItem === "profile"}
              onClick={this.handleItemClick}
              as={Link}
              to="/admin/admin-landing/profile"
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu>

          <Segment>
            <div>...</div>
          </Segment>
        </div>
      </Aux>
    );
  }
}
function mapStateToProps(state) {
  return { admin: state.isAdmin.admin };
}

export default connect(mapStateToProps, null)(AdminToolbar);
