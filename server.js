const express = require('express');
let db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;



app.use(routes);
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});   