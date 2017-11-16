import React from 'react';
import classes from './menuToggle.css'

const  MenuToggle = (props) => {
    return (
        <div
            className={classes.Menu}
            onClick={props.toggle}>
            Menu</div>
    );
}

export default MenuToggle;