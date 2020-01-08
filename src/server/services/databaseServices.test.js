const { getUserInformation,
    getUserByEmail,
    createNewUser,
    getWaterUsage } = require('./databaseServices.js');


test('getUserInformation', async () => {
    let result = await getUserInformation(1);
    expect(result).toMatchObject({userId: 1});
});
