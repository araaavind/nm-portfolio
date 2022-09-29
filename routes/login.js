const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Login page coming soon...');
});

module.exports = router;