import React from 'react';
import NavigationItem from '../navigationItem/NavigationItem';

import classes from './navigationItems.css';


function navigationItems (props) {
    console.log('nav items', props)
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true} toggle={props.toggle}>Performances</NavigationItem>
            <NavigationItem link="/" toggle={props.toggle}>Leadership Info</NavigationItem>
            <NavigationItem link="/rehearsals" toggle={props.toggle}>Rehearsals</NavigationItem>
        </ul>
    )
}

export default navigationItems ;