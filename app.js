'use strict';
const debug = require('debug')('my express app');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config(); // .env dosyas?n? yükleme
const routes = require('./routes'); // Tüm API rotalar?
const db = require('./db'); // Veritaban? ba?lant?s?

const app = express();

// CORS ayarlar?
app.use(cors({ origin: 'http://localhost:3000' })); // React uygulaman?z?n origin'iyle de?i?tirin

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware ayarlar?
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfay? /api'ye yönlendirme
app.get('/', (req, res) => {
    res.redirect('/api');
});

// Tüm API rotalar?n? /api yolunun alt?na ba?lama
app.use('/api', routes);

// 404 hatas? için catch-all middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Hata ay?klama middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Sunucuyu ba?latma
const PORT = 1337;
const server = app.listen(PORT, () => {
    debug('Express server listening on port ' + server.address().port);
    console.log(`Server is running on http://localhost:${PORT}/api`);
});

module.exports = app;
