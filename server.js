const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const login = require('./routes/login');

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.use(express.json({ limit: '1mb' }));
app.use('/', express.static('./client/dist'));
app.use('/login', login);

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>')
});