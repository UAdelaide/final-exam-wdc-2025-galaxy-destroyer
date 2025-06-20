var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogwalkRouter = require('.routes/dogwalk');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', dogwalkRouter);

router.get('/dogs', async (req,res) => {
    try () {
        const [dogs] = await db.execute('SELECT * FROM Dogs'); // query to execute
        res.json(dogs);
    } catch(err) {
        res.status(500).json({ error: 'Could not display Dogs :(' });
    }
});

module.exports = app;
