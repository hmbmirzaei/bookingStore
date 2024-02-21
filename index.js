
const express = require('express');
const { json } = express;
const { log, not_found } = require('./controller/utility')
const app = express();
app.use(json());
app.use('/*', log);
// ------ router ------
const router = require('./router');
app.use(router);
// ------ router ------
app.use('/*', not_found);
const port = process.env.port || 8000;
app.listen(port, _ => {
    console.log(`listening on port: ${port}`);
})