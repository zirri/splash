const API_URL = '/api/facts';

export async function getFacts() {
    return await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('json_web_token')
    }
    })
    .then((res) => res.json())
}