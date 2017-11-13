import React, { Component } from 'react';
import Menu from '../../components/menu/Menu'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false
        }
    }

    render() {
        const currentPath = window.location.pathname;
        return (
            <div>
                {currentPath !== '/' ?
                    <h4
                        onClick={(e) => { this.toggleMenu() }}>
                        Menu</h4> : null}
                {this.state.show ? <Menu /> : null}
                <h4>Login</h4>
                <div className="clear"></div>
            </div>
        )
    }

    toggleMenu = () => {
        this.setState({ show: !this.state.show })
    }
}