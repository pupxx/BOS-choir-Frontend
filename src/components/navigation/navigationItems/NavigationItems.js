import React from 'react';
import NavigationItem from '../navigationItem/NavigationItem';


import classes from './navigationItems.css'


function navigationItems (props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active={true}>Performances</NavigationItem>
            <NavigationItem link="/">Leadership Info</NavigationItem>
            <NavigationItem link="/">Rehearsals</NavigationItem>
        </ul>
    )
}

export default navigationItems ;