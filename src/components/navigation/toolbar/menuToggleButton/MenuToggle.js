import React from 'react';
import classes from './menuToggle.css'

const MenuToggle = (props) => {
    return (
        <div
            className={classes.Menu}
            onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default MenuToggle;