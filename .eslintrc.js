module.exports = {
    extends: [
      'airbnb-base',
      'plugin:node/recommended'
    ],
    env: {
      node: true,
      es6: true
    },
    rules: {
      'no-console': 'off', // for Node 
      'consistent-return': 'off', // For Express route handlers
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // For Express middleware
      'import/no-unresolved': ['error', { commonjs: true }]
    }
  };