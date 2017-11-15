import React from 'react';
import classes from './backdrop.css'

function backdrop(props) {
    return (
        props.show ? <div className={classes.Backdrop}></div> : null
    )
}

export default backdrop;