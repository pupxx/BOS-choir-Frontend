import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../navigation/toolbar/Toolbar';
import Sidedrawer from '../navigation/sidedrawer/Sidedrawer'

import classes from './layout.css'

const layout = (props) => {
    return (
        <Aux>
            <Toolbar />
            <Sidedrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;