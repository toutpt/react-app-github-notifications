
function getToken() {
	return localStorage.token;
}

function setToken(value) {
	localStorage.setItem('token', value);
}

function hasToken() {
	return !!getToken()
}

export default {
	get: getToken,
	set: setToken,
	has: hasToken,
};