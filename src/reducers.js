import notifications from './notifications';
const DEFAULT_STATE = {
	notifications: [],
	fetching: false,
	filter: {
		all: true,
	},
	reason: {
		assign: true,
		mention: true,
		team_mention: true,
		subscribed: true,
	},
	type: {},
};

export default function reducer(astate, action) {
	let state;
	if (!state && astate) {
		state = Object.assign({}, astate);
	}
	if (!state && localStorage.store) {
		state = JSON.parse(localStorage.store);
	}
	if (!state) {
		state = DEFAULT_STATE;
	}
	if (action.type === 'FILTER_SUBMIT') {
		state.filter = action.data;
	}
	if (action.type === 'FILTER_CHANGE') {
		state.filter = Object.assign({}, state.filter, {[action.name]: action.data});
	}
	if (action.type === 'FETCH_NOTIFICATIONS') {
		state.fetching = true;
	}
	if (action.type === 'NOTIFICATIONS_RESPONSE') {
		state.notifications = action.data;
		state.fetching = false;
	}
	if (action.type === 'REASON_CHANGE') {
		state.reason = Object.assign({}, state.reason, {[action.name]: action.data});
	}
	if (action.type === 'TYPE_CHANGE') {
		state.type = Object.assign({}, state.type, {[action.name]: action.data});
	}
	if (action.type === 'MARK_AS_READ') {
		const index = state.notifications.indexOf(action.notification);
		const notif = state.notifications[index];
		notif.unread = false;
		state = Object.assign(
			{},
			state,
			{ notifications: state.notifications },
		);
	}
	if (action.type === 'REASON_CLEAR') {
		state.reason = {};
	}
	return state;
}