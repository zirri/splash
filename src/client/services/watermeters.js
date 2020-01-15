const API_URL = '/api/watermeters';

export async function getWaterMeters() {
	return await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		}
	})
		.then((res) => res.json())
}

export async function postWaterMeter(meterId, room, source) {
	const meterData = {
		meterId,
		room,
		source
	};
	const resultJson = await fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(meterData)
	})
	const result = await resultJson.json();
	return result;
}
