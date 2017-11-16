import React from 'react';
import NavigationItems from '../navigationItems/NavigationItems';
import Backdrop from '../../UI/backdrop/Backdrop';
import Aux from '../../../hoc/Aux'

import classes from './sidedrawer.css'

function sidedrawer(props) {

    var assignedClasses = [classes.Sidedrawer, classes.Close]
    if(props.open){
        assignedClasses = [classes.Sidedrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={assignedClasses.join(' ')}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sidedrawer;