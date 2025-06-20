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
        var longAssQuery = 'SELECT WalkRequets.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username FROM WalkRequests JOIN Dogs ON ';
        const [reqs] = await db.execute('SELECT WalkRequets.request_id, Dogs.name FROM WalkRequests');
        res.json(reqs);
    } catch (err) {
        res.status(500).json({ error: 'Could not show walk requests' });
    }
});



module.exports = router;