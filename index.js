'use strict';

const { mongoose } = require('./db/mongoose');

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const { User } = require('./model/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'oursecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000,
            httpOnly: true
        }
    })
);

const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const loginChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/action-items');
    } else {
        next();
    }
};

const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user)
            .then(user => {
                if (!user) {
                    res.status(401).send('Unauthorized');
                } else {
                    next();
                }
            })
            .catch(error => {
                res.status(401).send('Unauthorized');
            });
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Load controllers
require('./controllers/user')(app, authenticate);
require('./controllers/team')(app, authenticate);
require('./controllers/actionItem')(app, authenticate);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use(express.static(__dirname + '/action-item-manager/build'));
app.use(express.static(__dirname + '/login-page/build'));

app.get('/login', loginChecker, (req, res) => {
    res.sendFile(path.join(__dirname + '/login-page/build/index.html'));
});

app.get('*', sessionChecker, (req, res) => {
    res.sendFile(
        path.join(__dirname + '/action-item-manager/build/index.html')
    );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
}); // localhost development port 3001  (http://localhost:3001)
