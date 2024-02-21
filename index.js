const express = require('express');
const { config } = require('dotenv');
config();
const { json } = express;
const { log, not_found, err } = require('./controller/utility');
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

// ------ postman ------
const postman = require('./controller/postman');
app.get('/postman', (r, s) => s.json(postman()));
// ------ postman ------

// ------ 404 ------
app.use('/*', not_found);
// ------ 404 ------

const port = process.env.port || 8000;
app.listen(port, _ => {
    const url = `http://${process.env.base_url || 'localhost'}:${port}`
    console.log(url);
    console.log(`${url}/postman`);
});