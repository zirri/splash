const { logInAndGetToken } = require('./authService.js');


test('valid login', async () => {
    let result = await logInAndGetToken('123@test.com', 'password123');
    expect(result).toMatchObject({status: 200});
});

test('invalid login', async () => {
    let result = await logInAndGetToken('123@test.com', 'notValidPassword');
    expect(result).toMatchObject({status: 401});
    result = await logInAndGetToken('notValidMail', 'notValidPassword');
    expect(result).toMatchObject({status: 401});
});

test('invalid datatype input', async () => {
    let result = await logInAndGetToken(1,7);
    expect(result).toMatchObject({status: 401});
    result = await logInAndGetToken([], 'password');
    expect(result).toMatchObject({status: 401});
});

test('missing input', async () => {
    let result = await logInAndGetToken('notValidEmail');
    expect(result).toMatchObject({status: 401});
    result = await logInAndGetToken();
    expect(result).toMatchObject({status: 401});
});
