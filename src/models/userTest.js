const mongoose = require('mongoose');
const hashPasswordPlugin = require('../middleware/hashPassword');

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

module.exports = mongoose.model('User', userSchema);
