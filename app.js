'use strict';
const debug = require('debug')('my express app');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes'); // routes klasöründeki index.js dosyasýný içe aktarýyoruz
require('dotenv').config();

const app = express();
const db = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Orta katmanlarý (middleware) ayarlama
app.use(logger('dev'));
app.use(express.json()); // body-parser yerine express.json()
app.use(express.urlencoded({ extended: false })); // body-parser yerine express.urlencoded()
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Tüm API rotalarýný /api yolunun altýnda toplama
app.use('/api', routes);

// 404 hatasý için catch-all middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Hata yönetimi

// Geliþtirme ortamý için hata ayýklama
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Üretim ortamý için hata ayýklama (stacktrace yok)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Sunucu baþlatma
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

const server = app.listen(PORT, () => {
    debug('Express server listening on port ' + server.address().port);
    console.log(`Server is running on port: ${server.address().port}`);
});

module.exports = app;
