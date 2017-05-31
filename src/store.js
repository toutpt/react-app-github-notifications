import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
const enhancers = [];

if (window) {
	if (window.devToolsExtension) {
		enhancers.push(window.devToolsExtension());
	}
}


function initialize() {
	return createStore(reducer);
}

export default {
	initialize,
}