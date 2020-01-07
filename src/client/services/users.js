const API_URL = '/api';

export async function createNewUser(name, email, password, location) {
    return await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, location })
    })
    .then((res) => res.json())
}