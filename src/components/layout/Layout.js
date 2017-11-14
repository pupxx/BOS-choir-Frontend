import React from 'react';
import Aux from '../../hoc/Aux';
import Header from '../../containers/header/Header';
import Menu from '../menu/Menu'

const layout = (props) => {
    return (
        <Aux>
            <div>
                <Header />
                <Menu /> Backdrop</div>
            <main>
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;