const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index.js');
const { urlencoded } = require('body-parser');


const server = express();
server.name = 'SERVER';

// server.listen(3001, () => console.log('%s listening at 3001'))
server.listen(process.env.PORT || 5000)


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Whit, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

server.use('/', routes);

//Error catching emdware
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.log(err);
    res.status(status).send(message);
});


module.exports = server;