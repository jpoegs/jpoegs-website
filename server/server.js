const express = require('express');
const next = require('next');
const favicon = require('express-favicon');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'prod';
const app = next({ dev, dir:'./src' });
const handle = app.getRequestHandler();

const port = 3000; //process.env.PORT;

app.prepare()
.then(() => {
    const server = express();

    // app.use(favicon(__dirname + '/build/favicon.ico'));

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Express server is running on localhost:${port}`)
    })
})
.catch((ex) => {
    console.error(ex.stack);
    process.exit(1)
});