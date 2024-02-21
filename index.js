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
    console.log(`listening on port: ${port}`);
    console.log(`http://localhost:${port}/postman`);
});

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    })


