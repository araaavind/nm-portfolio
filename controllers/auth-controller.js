const CustomAPIError = require('../errors/custom-error');
const User = require('../models/user-model');

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 6) {
    throw new CustomAPIError('Atlease 6 characters required for password', 400);
  }
  try {
    await User.create({
      username,
      password
    })
      .then(user => res.send(200).json({ message: 'User created successfully' }))
  } catch (err) {
    throw new CustomAPIError('Failed to create user', 401);
  }
}