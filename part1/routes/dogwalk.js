var express = require('express');
var router = express.Router();
var db = require('../db');

// create routes for paths /dogs, /walkrequests/open, /walkers/summary
router.get('/dogs', async (req,res) => {
    try {
        const [dogs] = await db.execute('SELECT Dogs.name, Dogs.size, Users.username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id'); // query to execute
        res.status(200).json(dogs); // send as json
    } catch (err) {
        res.status(500).json({ error: 'Could not display Dogs :(' }); // what shows if data cant load from sql
    }
});

router.get('/walkrequests/open', async (req,res) => {
    try {
        var longAssQuery = 'SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id JOIN Users ON Dogs.owner_id = Users.user_id';
        const [reqs] = await db.execute(longAssQuery);
        res.status(200).json(reqs);
    } catch (err) {
        res.status(500).json({ error: 'Could not show walk requests' });
    }
});

router.get('/walkers/summary', async (req,res) => {
    try {
        /* to formulate this query, we get the usernames using Users.username AS walkerUsers
        then we find the total ratings and get the average of all the ratings using COUNT THEN AVG:
        COUNT (WalkRatings.rating_id) AS totalRatings
        AVG(Walkratings.rating)
        now get completed walks by summing up how many 'completed''s there are
        COUNT(WHEN WalkRequests.status='completed' THEN WalkRequests.request_id END) AS totalWalks
        FROM Users
        ONLY USE relavant people (walkers), using Users.role = 'walker'
        */
        const [walker] = await db.execute(`SELECT Users.username AS walkerUser,
            COUNT(WalkRatings.rating_id) AS totalRatings,
            AVG(WalkRatings.rating) AS avgRating,
            COUNT(CASE WHEN WalkRequests.status = 'completed' THEN WalkRequests.request_id END) AS completedWalks
            FROM Users
            LEFT JOIN WalkApplications ON Users.user_id = WalkApplications.walker_id AND WalkApplications.status = 'accepted'
            LEFT JOIN WalkRequests ON WalkApplications.request_id = WalkRequests.request_id
            LEFT JOIN WalkRatings ON WalkRatings.request_id = WalkRequests.request_id AND WalkRatings.walker_id = Users.user_id
            WHERE Users.role = 'walker'
            GROUP BY Users.user_id, Users.username
            `);
        res.status(200).json(walker);
    } catch (err) {
        res.status(500).json({ error: 'Could not show walkers summary' });
    }
});



module.exports = router;