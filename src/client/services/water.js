const API_URL = '/api';

export function getWaterUsage(userId) {
    return fetch(`${API_URL}/waterusage/user/${userId}`)
    .then((res) => res.json())
}
