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

function filterToString(filter) {
	let buff = '';
	Object.keys(filter).forEach(k => {
		buff += `${k}=${filter[k]}&`;
	})
	return buff
}

function fetchAll(filter) {
	let filterString = '';
	if (filter) {
		filterString = filterToString(filter)
	}
	// https://api.github.com/notifications?access_token=XXX
	return fetch(`https://api.github.com/notifications?access_token=${localStorage.token}&${filterString}`)
	.then(handleResponse)
	.then((data) => {
		set(data);
		return data;
	});
}

function markAsRead(id) {
	let url = `https://api.github.com/notifications?access_token=${localStorage.token}`;
	if (id) {
		url = `https://api.github.com/notifications/threads/${id}?access_token=${localStorage.token}`;
	}
	return fetch(url, {method: 'PATCH'})
		.then((data) => {
			return data;
		});
}

export default {
	fetchAll,
	markAsRead,
	get,
	set,
};