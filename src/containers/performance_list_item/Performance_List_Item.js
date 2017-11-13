import React, { Component } from 'react'

export default class PerformanceListItem extends Component {

    render() {
        return (
            <li>
                {this.props.data}

            </li>
        )
    }
}