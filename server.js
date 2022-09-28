const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
app.use(express.static('./dist/'));
app.use(express.json({ limit: '1mb' }));