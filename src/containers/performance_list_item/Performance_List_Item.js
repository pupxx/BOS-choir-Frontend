import React, { Component } from 'react';
import classes from './performanceListItem.css'

export default class PerformanceListItem extends Component {

    render() {
        return (
            <li>
                {this.props.data}
            </li>
        )
    }
}