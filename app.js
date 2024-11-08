'use strict';
const debug = require('debug')('my express app');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes'); // routes klas?r?ndeki index.js dosyas?n? i?e aktar?yoruz
require('dotenv').config();

const app = express();
const db = require('./db');

app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your React app’s origin


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// Orta katmanlar? (middleware) ayarlama
app.use(logger('dev'));
app.use(express.json()); // body-parser yerine express.json()
app.use(express.urlencoded({ extended: false })); // body-parser yerine express.urlencoded()
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// T?m API rotalar?n? /api yolunun alt?nda toplama
app.use('/api', routes);

// 404 hatas? i?in catch-all middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Hata y?netimi

// Geli?tirme ortam? i?in hata ay?klama
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// ?retim ortam? i?in hata ay?klama (stacktrace yok)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Sunucu ba?latma
const PORT = 1337;
app.set('port', PORT);

const server = app.listen(PORT, () => {
    debug('Express server listening on port ' + server.address().port);
    console.log(`Server is running on port: ${server.address().port}`);
});

module.exports = app;