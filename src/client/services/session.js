const API_URL = '/api/session';

export function createSession({ email, password }) {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password })
	})
		.then((res) => res.json())
}


export async function checkSession() {
	const res = await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		}
	});
	return res.status === 200;
}