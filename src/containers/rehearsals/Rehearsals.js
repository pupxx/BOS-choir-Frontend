import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRehearsals } from '../../store/actions/index';

class Rehearsal extends Component { 
    constructor(props) {
        super(props)
        
        this.listRehearsals = this.listRehearsals.bind(this);
    }
       
    componentDidMount() {
        this.props.fetchRehearsals()
    }
    
    listRehearsals(){
        return this.props.rehearsals.map((el)=>{
            return <div key={el.id}>{el.rehearsedate}</div>
        })
    }

    render() {
        return (
            <div>{this.listRehearsals()}</div>
        );
    }
}

function mapStateToProps(state) {
    return { rehearsals: state.rehearsals }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchRehearsals }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Rehearsal);