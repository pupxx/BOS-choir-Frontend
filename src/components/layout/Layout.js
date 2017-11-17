import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../navigation/toolbar/Toolbar';
import Sidedrawer from '../navigation/sidedrawer/Sidedrawer'

import classes from './layout.css'

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSideDrawer: false
        }

        this.sideDrawerClosed = this.sideDrawerClosed.bind(this)
        this.sideDrawerOpen = this.sideDrawerOpen.bind(this)
    }

    sideDrawerClosed() {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpen(){
        console.log('sideDrawrerOpen')
        this.setState((prevState)=>{ 
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleOpen={this.sideDrawerOpen}/>
                <Sidedrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosed}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;