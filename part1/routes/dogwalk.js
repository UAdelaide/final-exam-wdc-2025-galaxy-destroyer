var express = require('express');
var router = express.Router();
var db = require('../db');

// create routes for paths /dogs, /walkrequests/open, /walkers/summary
router.get('/dogs', async (req,res) => {
    try {
        const [dogs] = await db.execute('SELECT a.name,a.size FROM Dogs AS a JOIN SELECT username FROM Users'); // query to execute
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ error: 'Could not display Dogs :(' });
    }
});

router.get('/walkrequests/open', async (req,res) => {

});



module.exports = router;