const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userTest');

jest.mock('bcrypt');

describe('hashPassword plugin', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_db');
  });
  afterAll(async () => {
    await mongoose.connection.close();
    jest.clearAllMocks();
  });

  test('Should hash the password when it is new or modified', async () => {
    const mockedHash = 'hashedPassword123';
    bcrypt.hash.mockResolvedValue(mockedHash);
    const user = new User({
      username: 'appstopherchris',
      password: 'plainTextPassword',
    });
    await user.save();

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith('plainTextPassword', 10);
    expect(user.password).toBe(mockedHash);
  });
});
