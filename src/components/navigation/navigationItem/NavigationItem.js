import React from 'react';
import { Link } from 'react-router-dom';


import classes from './navigationItem.css';


function navigationItem(props) {
    return (
        <li className={classes.NavigationItem} onClick={props.toggle}>
            <Link to={props.link}
            className={props.active ? classes.active : null}>{props.children} <div>></div></Link>
        </li>
    )
}

export default navigationItem;