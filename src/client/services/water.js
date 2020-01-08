const API_URL = '/api';

export function getWaterUsage() {
    return fetch(`${API_URL}/waterusage/user/:userid`)
    .then((res) => res.json());
}