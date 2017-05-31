export function handleResponse(response) {
	if (response.status === 204) {
		return Promise.resolve({});
	}
	if (response.json) {
		return response.json();
	}
	return Promise.reject(response);
}

function set(data) {
	localStorage.setItem('notifications', JSON.stringify(data));
}

function get() {
	if (localStorage.notifications) {
		return JSON.parse(localStorage.notifications);
	}
	return [];
}

const filter = {};
filter.get = function filterGet() {
	return JSON.parse(localStorage.filters || '{}');
}

filter.set = function filterSet(filter) {
	localStorage.setItem('filters', JSON.stringify(filter));
}

filter.getString = function filterGetString() {
	const struct = filter.get();
	let buff = '';
	Object.keys(struct).forEach(k => {
		buff += `${k}=${struct[k]}&`;
	})
	return buff
}

function fetchAll() {
	// https://api.github.com/notifications?access_token=XXX
	return fetch(`https://api.github.com/notifications?access_token=${localStorage.token}&${filter.getString()}`)
	.then(handleResponse)
	.then((data) => {
		set(data);
		return data;
	});
}

export default {
	fetchAll,
	get,
	set,
	filter,
};