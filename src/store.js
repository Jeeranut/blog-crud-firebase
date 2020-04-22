import { createStore , compose as composeEnhancers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index'

const store = createStore(
    reducers ,
    composeEnhancers(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store;