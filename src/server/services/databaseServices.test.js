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
    expect(result).toMatchObject({userId: 1});
});

test('getUserInformation(): valid query', async () => {
    let result = await getUserInformation(1);
    expect(result).toMatchObject({userId: 1});
});