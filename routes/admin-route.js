const express = require('express');
const path = require('path');
const router = express.Router();
const { register } = require('../controllers/auth-controller');

router.route('/')
  .get((req, res) => {
    if (!req.user) {
      return res.redirect('/admin/login');
    }
    return res.sendFile(path.resolve(__dirname, '../client/dist/admin/index.html'))
  });

router.route('/login')
  .get((req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/admin/login.html')));

router.route('/signup')
  .get((req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/admin/signup.html')))
  .post(register);

module.exports = router;