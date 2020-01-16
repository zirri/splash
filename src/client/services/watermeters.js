const API_URL = '/api/watermeters';

export async function getWaterMeters() {
	const resultJSON = await fetch(`${API_URL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		}
	})
	const result = await resultJSON.json();
	console.log(result)
	return result;
}

export async function postWaterMeter(meterId, room, source) {
	const meterData = {
		meterId,
		room,
		source
	};
	const resultJson = await fetch(`${API_URL}/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		},
		body: JSON.stringify(meterData)
	})
	const result = await resultJson.json();
	return result;
}
