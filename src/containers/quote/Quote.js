import React, { Component } from 'react';
import { connect } from "react-redux";

class Quote extends Component {
    state = {  }
    render() {
        return (
            <div>Quote is connected</div>
        );
    }
}

function mapStateToProps (state){
    return {quote: state.quote}
}

export default connect(mapStateToProps)(Quote);