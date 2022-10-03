const express = require('express');
const path = require('path');
const router = express.Router();
const { register } = require('../controllers/auth-controller');

router.route('/')
  .get((req, res) => res.redirect('/login'));

router.route('/login')
  .get((req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/login/index.html')));

router.route('/signup')
  .post(register);

module.exports = router;