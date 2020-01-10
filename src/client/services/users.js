const API_URL = '/api';

export async function createNewUser(fullName, email, password, location, noInHousehold) {
    return await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password, location, noInHousehold })
    })
    .then((res) => res.json())
}

