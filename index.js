const express = require('express');
const { config } = require('dotenv');
config();
const { json } = express;
const { log, not_found } = require('./controller/utility');
const app = express();
app.use(json());
app.use('/*', log);
// ------ router ------
const router = require('./router');
app.use(router);
// ------ router ------

// ------ hpp & xss ------
const hpp = require('hpp');
app.use(hpp());
const xss = require('xss-clean');
app.use(xss());
// ------ hpp & xss ------

// ------ hpp & xss ------
const postman = require('./controller/postman');
app.get('/postman', (r, s) => s.json(postman()));
// ------ hpp & xss ------

app.use('/*', not_found);
const port = process.env.port || 8000;
app.listen(port, _ => {
    console.log(`listening on port: ${port}`);
    console.log(`http://localhost:${port}/postman`);
});
