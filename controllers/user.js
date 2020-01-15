const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.static(__dirname + '/action-item-manager/build'));

const { ObjectID } = require('mongodb');
const { mongoose } = require('../db/mongoose');
const { User } = require('../model/user');

module.exports = (app, authenticate) => {
    app.post('/user/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmailPassword(email, password)
            .then(user => {
                if (!user) {
                    res.status(400).redirect('/');
                } else {
                    req.session.user = user._id;
                    res.redirect('/action-items');
                }
            })
            .catch(error => {
                res.status(400).redirect('/');
            });
    });

    app.get('/user/logout', (req, res) => {
        req.session.destroy(error => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.redirect('/login');
            }
        });
    });

    app.get('/user/current', authenticate, (req, res) => {
        User.findById(req.session.user)
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.send({ user });
                }
            })
            .catch(error => {
                res.status(500).send();
            });
    });

    app.post('/user/create', (req, res) => {
        const { email, firstName, lastName, password } = req.body;
        const user = new User({
            email,
            firstName,
            lastName,
            password,
            teamIDList: [],
            role: 0
        });

        user.save().then(
            result => {
                req.session.user = result._id;
                res.redirect('/action-items');
            },
            error => {
                res.status(400).send(error);
            }
        );
    });

    app.delete('/user/remove/:id', authenticate, (req, res) => {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        User.findByIdAndRemove(id)
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.send(user);
                }
            })
            .catch(error => {
                res.status(500).send();
            });
    });

    app.get('/user/:id', authenticate, (req, res) => {
        const { id } = req.params;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        User.findById(id)
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.send({ user });
                }
            })
            .catch(error => {
                res.status(500).send();
            });
    });

    app.get('/user', authenticate, (req, res) => {
        User.find().then(
            users => {
                res.send({ users });
            },
            error => {
                res.status(500).send(error);
            }
        );
    });

    app.patch('/user/:id', authenticate, (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        User.findByIdAndUpdate(id, { firstName, lastName, email })
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.status(200).send();
                }
            })
            .catch(error => {
                res.status(400).send();
            });
    });

    app.patch('/user/changePassword/:id', authenticate, (req, res) => {
        const { id } = req.params;
        let { password } = req.body;

        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                password = hash;
                User.findByIdAndUpdate(id, { password })
                    .then(user => {
                        if (!user) {
                            res.status(404).send();
                        } else {
                            res.status(200).send();
                        }
                    })
                    .catch(error => {
                        res.status(400).send();
                    });
            });
        });

        
    });

    app.get('/user/isOnTeam', authenticate, (req, res) => {
        const { userID, teamID } = req.body;

        if (!ObjectID.isValid(userID)) {
            res.status(404).send();
        }

        if (!ObjectID.isValid(teamID)) {
            res.status(404).send();
        }

        User.find({
            _id: userID,
            teamIDList: { $in: [mongoose.Types.ObjectId(teamID)] }
        }).then(
            user => {
                if (!user) {
                    res.status(400).send();
                } else {
                    res.status(200).send();
                }
            },
            error => {
                res.status(500).send(error);
            }
        );
    });

    app.post('/user/addToTeam', authenticate, (req, res) => {
        const { userID, teamID } = req.body;

        if (!ObjectID.isValid(userID)) {
            res.status(404).send();
        }

        if (!ObjectID.isValid(teamID)) {
            res.status(404).send();
        }

        User.findByIdAndUpdate(userID, { $push: { teamIDList: mongoose.Types.ObjectId(teamID) }})
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.status(200).send();
                }
            })
            .catch(error => {
                res.status(400).send();
            });
    });

    app.post('/user/removeFromTeam', authenticate, (req, res) => {
        const { userID, teamID } = req.body;

        if (!ObjectID.isValid(userID)) {
            res.status(404).send();
        }

        if (!ObjectID.isValid(teamID)) {
            res.status(404).send();
        }

        User.findByIdAndUpdate(userID, {
            $pull: { teamIDList: { $in: [mongoose.Types.ObjectId(teamID)] } }
        })
            .then(user => {
                if (!user) {
                    res.status(404).send();
                } else {
                    res.status(200).send();
                }
            })
            .catch(error => {
                res.status(400).send();
            });
    });
};
