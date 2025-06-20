var express = require('express');
var router = express.Router();
var db = require('../db');

// create routes for paths /dogs, /walkrequests/open, /walkers/summary

router.get('/dogs', async (req,res) => {
    try () {

    } catch(err) {
        res.status(500).json('could not fetch data');
    }
});

module.exports = router;