import { getWeek } from 'date-fns';

const API_URL = '/api/waterusage';

export async function getWaterUsageAll() {
	const resultJSON = await fetch(`${API_URL}/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Token': localStorage.getItem('json_web_token')
		}
	})
	const result = await resultJSON.json();
	const resultArray = result.map(record =>{ 
		record.timestamp = new Date(record.timestamp);
		record.weekNumber = getWeek(record.timestamp)
		return record;
	})
	return resultArray;
}

export async function postWaterUsage(amount, meterId) {
	const waterUsage = {
		amount,
		timestamp: new Date()
	};
	const resultJson = await fetch(`${API_URL}/metering/${meterId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(waterUsage)
	})
	const result = await resultJson.json();
	return result;
}
