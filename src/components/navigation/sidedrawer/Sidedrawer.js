import React from 'react';
import NavigationItems from '../navigationItems/NavigationItems';
import Backdrop from '../../UI/backdrop/Backdrop';
import Aux from '../../../hoc/Aux'

import classes from './sidedrawer.css'

function sidedrawer(props) {



    return (
        <Aux>
            <Backdrop show/>
            <div className={classes.Sidedrawer}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sidedrawer;