const API_URL = '/api/waterusage';

export async function getWaterUsageToday() {
    return await fetch(`${API_URL}/today`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('json_web_token')
    }
    })
    .then((res) => res.json())
}
export async function getWaterUsageThisWeek() {
    return await fetch(`${API_URL}/thisweek`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('json_web_token')
    }
    })
    .then((res) => res.json())
}

export async function getWaterUsageAll() {
    return await fetch(`${API_URL}/all`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': localStorage.getItem('json_web_token')
    }
    })
    .then((res) => res.json())
}

// export async function getWaterMeters() {
//     return await fetch(`/api/watermeters`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Auth-Token': localStorage.getItem('json_web_token')
//         }
//         })
//         .then((res) => res.json())
// }