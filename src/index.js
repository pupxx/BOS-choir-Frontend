import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './store/reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const app = (
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.querySelector('#root'));
registerServiceWorker();
