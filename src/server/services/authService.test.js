const { logInAndGetToken } = require('./authService.js');

test('valid login', async () => {
    const result = await logInAndGetToken('123@test.com', 'password123');
    expect(result).toMatchObject({status: 200});
});
