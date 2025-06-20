var express = require('express');
var router = express.Router();
var db = require('../db');

// create routes for paths /dogs, /walkrequests/open, /walkers/summary
router.get('/dogs', async (req,res) => {
    try {
        const [dogs] = await db.execute('SELECT Dogs.name, Dogs.size, Users.username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id'); // query to execute
        res.json(dogs);
    } catch (err) {
        res.status(500).json({ error: 'Could not display Dogs :(' });
    }
});

router.get('/walkrequests/open', async (req,res) => {
    try {
        var longAssQuery = 'SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id JOIN Users ON Dogs.owner_id = Users.user_id';
        const [reqs] = await db.execute(longAssQuery);
        res.json(reqs);
    } catch (err) {
        res.status(500).json({ error: 'Could not show walk requests' });
    }
});

router.get('/walkers/summary', async (req,res) => {
    try {

        const [walker] = await db.execute('');
        res.status(200).json(walker);
    } catch (err) {

    }
});



module.exports = router;