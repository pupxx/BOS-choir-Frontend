import React from 'react';
import NavigationItems from '../navigationItems/NavigationItems'

import classes from './toolbar.css'

export default function Toolbar (){

    return (
        <header className={classes.Toolbar}>
            <h4>Menu</h4>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
            <h4>Login</h4>
        </header>
    )
}