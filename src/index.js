import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose as composeEnhancers } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers/index';

const store = createStore(
    reducers ,
    composeEnhancers(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider> ,
    document.getElementById('root')
)