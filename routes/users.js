'use strict';
var express = require('express');
var router = express.Router();



const db = require('../db'); 

// '/users' endpoint'i
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Not connected to database');
        } else {
            console.log("Query Results: ", results);
            res.json(results);
        }
    });
});

module.exports = router;

