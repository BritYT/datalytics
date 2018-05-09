
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../reducers'

const storeMiddleware = applyMiddleware(createLogger(), thunk);
const createStoreWithMiddleware = createStore(reducer, storeMiddleware);


export default createStoreWithMiddleware;