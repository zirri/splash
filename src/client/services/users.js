const API_URL = '/api/user';

export async function createNewUser(fullName, email, password, location, noInHousehold) {
	return await fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fullName, email, password, location, noInHousehold })
	})
		.then((res) => res.json())
}

export async function getUserInformation() {
	return await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		}
	})
		.then((res) => res.json())
}