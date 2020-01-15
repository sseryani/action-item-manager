const express = require("express");
const app = express();
app.use(express.static(__dirname + "/action-item-manager/build"));

const { ObjectID } = require("mongodb");
const { Team } = require("../model/team");
const { User } = require("../model/user");
const { ActionItem } = require("../model/actionItem");

const { mongoose } = require('../db/mongoose');

module.exports = (app, authenticate) => {
  app.get("/team", authenticate, (req, res) => {
    Team.find().then(
      teams => {
        res.send({ teams });
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.get("/team/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    Team.findById(id)
      .then(team => {
        if (!team) {
          res.status(404).send();
        } else {
          res.send({ team });
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });

  app.get("/team/size/:id", authenticate, (req, res) => {
    const { id } = req.params;

    User.find({ teamIDList: { $in: [mongoose.Types.ObjectId(id)] } }).then(
      users => {
        res.status(200).send({ length: users.length });
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.get("/team/users/:id", authenticate, (req, res) => {
    const { id } = req.params;

    User.find({ teamIDList: { $in: [mongoose.Types.ObjectId(id)] } }).then(
      onTeam => {
        User.find({ teamIDList: { $nin: [mongoose.Types.ObjectId(id)] } }).then(
          offTeam => {
            res.status(200).send({ onTeam, offTeam });
          },
          error => {
            res.status(500).send(error);
          }
        );
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.post("/team/teamsFromList", authenticate, (req, res) => {
    const { teamList } = req.body;

    Team.find({ _id: { $in: teamList } }).then(
      teams => {
        res.status(200).send({ teams });
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.patch("/team/setManager/:id", authenticate, (req, res) => {
    const { id } = req.params;
    const { managerID } = req.body;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }
    if (!ObjectID.isValid(managerID)) {
      res.status(404).send();
    }

    Team.findByIdAndUpdate(id, { managerID })
      .then(team => {
        if (!team) {
          res.status(404).send();
        } else {
          // Check if user is on the team
          User.find({
            _id: managerID,
            teamIDList: { $in: [mongoose.Types.ObjectId(id)] }
          }).then(
            user => {
              if (user.length === 0) {
                // Add team to user
                User.findByIdAndUpdate(managerID, {
                  $push: { teamIDList: mongoose.Types.ObjectId(id) }
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
              } else {
                res.status(200).send();
              }
            },
            error => {
              res.status(500).send(error);
            }
          );
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  });

  app.post("/team/create", authenticate, (req, res) => {
    const { name, managerID } = req.body;

    const team = new Team({ name, managerID });

    team.save().then(
      team => {
        User.findByIdAndUpdate(managerID, {
          $push: { teamIDList: mongoose.Types.ObjectId(team._id) }
        })
          .then(result => res.send({ team }))
          .catch(err => res.status(400).send(err));
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.delete("/team/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    Team.findByIdAndRemove(id)
      .then(team => {
        if (!team) {
          res.status(404).send();
        } else {
          ActionItem.deleteMany({ teamID: mongoose.Types.ObjectId(id) }, function (err) {
            if (err) {
              res.status(500).send();
            }
          });
          res.send({ team });
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });
};
