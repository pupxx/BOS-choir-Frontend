import React from 'react';
import Quote from '../../containers/quote/Quote';
import classes from './about.css';

const About = function () {

    return (
        <div className={classes.AboutWrapper}>
            <h2>Barrie Ontario Stake Choir</h2>
            <div className="about">
                <Quote />
            </div>
        </div>
    )

}

export default About;