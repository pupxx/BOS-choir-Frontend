import React, { Component } from 'react';
import { connect } from "react-redux";
// import classes from './quote.css';

class Quote extends Component {
    state = {}
    render() {
        return (
            <div>
                <p> {this.props.quote.quote} </p>
                <p> {this.props.quote.reference} </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { quote: state.quote }
}

export default connect(mapStateToProps)(Quote);