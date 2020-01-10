const API_URL = '/api';

export async function getWaterUsage() {
    return await fetch(`${API_URL}/waterusage`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('json_web_token')
    }
    })
    .then((res) => res.json())
}
