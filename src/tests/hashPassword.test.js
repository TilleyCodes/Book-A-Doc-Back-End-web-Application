const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const hashPasswordPlugin = require('../middleware/hashPassword');

// Create user model for test
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(hashPasswordPlugin, { saltRounds: 10 });

// Mock bcrypt
jest.mock('bcrypt');

// Tests for hashPassword function
describe('hashPassword plugin', () => {
  let mongoServer;
  let User;

  beforeAll(async () => {
    // Create MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    
    // Create the model after connection
    User = mongoose.model('User', userSchema);
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    jest.clearAllMocks();
  });

  beforeEach(() => {
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

  test('Should not re-hash if the password is not modified', async () => {
    bcrypt.hash.mockResolvedValue('firstHash');

    const existingUser = new User({
      username: 'user_name',
      password: 'plainTextPassword',
    });

    await existingUser.save();
    bcrypt.hash.mockClear();
    const user = await User.findById(existingUser._id);
    await user.save();

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(user.password).toBe('firstHash');
  });

  test('Should call next(error) if bcrypt.hash fails', async () => {
    const testError = new Error('bcrypt error');
    bcrypt.hash.mockRejectedValue(testError);

    const user = new User({
      username: 'error_test',
      password: 'plainTextPassword',
    });

    await expect(user.save()).rejects.toThrow('bcrypt error');
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  });
});