import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
const enhancers = [];

function initialize() {
	return createStore(
		reducer, /* preloadedState, */
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

export default {
	initialize,
}