const User = require('../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: 'User already registered',
      });
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({ message: 'Something went wrong' });
      }
      if (data) {
        return res.status(201).json({
          message: 'User created successfully',
        });
      }
    });
  });
};
// user signin

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ err });

    if (user) {
      if (user.authenticated(req.body.password)) {
        const token = jwt.sign({ _id: user._id });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  });
};
