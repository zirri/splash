const API_URL = '/api';

export function getWaterUsage(userId) {
    return fetch(`${API_URL}/waterusage/user/${userId}`, 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('json_web_token')
        }
    })
    .then((res) => res.json())
}
