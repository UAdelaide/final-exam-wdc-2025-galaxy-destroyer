const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, password_hash, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    // save the session
    req.session.user =  {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // response object for the front end
    res.json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    // return res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }

});

// referring to the form @submit.prevent LOGOUT
router.post('/logout', async (req,res) => {
  req.session.destroy( err => {
  res.clearCookie('connect.sid');
  res.status(200);
  if (err) {
    return res.status(500);
  }
  }); // ends session
  // connect sid is the default session cookie from express-session

});

router.get('/dawgs', async (req,res) => {
  if (!req.session.user) {
    return res.status(401).json({error: 'no user'});
  }

  const ownerID = req.session.user.user_id;

  const doglistquery = 'SELECT dog_id, name FROM Dogs WHERE owner_id = ?'; // returns dog_id and name of owner_id
  // name of dog will be linked from dog_id which is already pleasant

  db.query(doglistquery,[ownerID], (err,doggies) => {
    if (err) {res.status(500);}
    res.json(doggies);
  });
});

module.exports = router;