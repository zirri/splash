const { getUserInformation,
    getUserByEmail,
    createNewUser,
    getWaterUsage } = require('./databaseServices.js');


test('getUserInformation(): valid query', async () => {
    let result = await getUserInformation(1);
    expect(result).toMatchObject({userId: 1});
});

test('getUserInformation(): invalid input', async () => {
    let result = await getUserInformation();
    expect(result).toBeUndefined();
    result = await getUserInformation('sds');
    expect(result).toBeUndefined();
    result = await getUserInformation(['f4',4]);
    expect(result).toBeUndefined();
});

test('getUserInformation(): valid query, invalid target', async () => {
    let result = await getUserInformation(1000);
    expect(result).toBeUndefined();
});

test('getUserByEmail(): valid query', async () => {
    let result = await getUserByEmail('123@test.com');
    expect(result).toHaveProperty('userId', 1);
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('fullName');
});

test('getUserByEmail(): invalid input', async () => {
    let result = await getUserByEmail();
    expect(result).toBeUndefined();
    result = await getUserByEmail('sds');
    expect(result).toBeUndefined();
    result = await getUserByEmail(['f4',4]);
    expect(result).toBeUndefined();
});

test('getUserByEmail(): valid query, invalid target', async () => {
    let result = await getUserByEmail('esiodfnsdoif@sdksd.com');
    expect(result).toBeUndefined();
});


test('getWaterUsage(): valid query', async () => {
    let result = await getWaterUsage(1);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('userId', 1);
    expect(result[0]).toHaveProperty('room');
    expect(result[0]).toHaveProperty('source');
    expect(result[0]).toHaveProperty('meterId');
    expect(result[0]).toHaveProperty('timestamp');
    expect(result[0]).toHaveProperty('amount');
});

test('getWaterUsage(): invalid input', async () => {
    let result = await getWaterUsage();
    expect(result).toBeUndefined();
    result = await getWaterUsage('sds');
    expect(result).toBeUndefined();
    result = await getWaterUsage(['f4',4]);
    expect(result).toBeUndefined();
});

test('getWaterUsage(): valid query, invalid target', async () => {
    let result = await getWaterUsage(1000);
    expect(result).toMatchObject([]);
});
