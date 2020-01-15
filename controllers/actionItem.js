const express = require("express");
const app = express();
app.use(express.static(__dirname + "/action-item-manager/build"));

const { ObjectID } = require("mongodb");
const { ActionItem } = require("../model/actionItem");
const { User } = require("../model/user");

module.exports = (app, authenticate) => {
  app.post("/action-item/create", authenticate, (req, res) => {
    const { teamID, title, description, dueDate } = req.body;

    const actionItem = new ActionItem({
      teamID,
      title,
      description,
      dueDate,
      dateCreated: "2019-01-01",
      userIDList: []
    });

    actionItem.save().then(
      actionItem => {
        res.send({ actionItem });
      },
      error => {
        res.status(400).send(error);
      }
    );
  });

  app.get("/action-item/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.findById(id)
      .then(actionItem => {
        if (!actionItem) {
          res.status(404).send();
        } else {
          res.send({ actionItem });
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });

  app.patch("/action-item/:id", authenticate, (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.findByIdAndUpdate(id, { title, description, dueDate })
      .then(actionItem => {
        if (!actionItem) {
          res.status(404).send();
        } else {
          res.status(200).send();
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  });

  app.delete("/action-item/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.findByIdAndRemove(id)
      .then(actionItem => {
        if (!actionItem) {
          res.status(404).send();
        } else {
          res.send({ actionItem });
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });

  app.get("/action-item/team/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.find({ teamID: id }).then(
      actionItems => {
        res.status(200).send({ actionItems });
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.get("/action-item/usersCompleted/:id", authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.findById(id)
      .then(actionItem => {
        if (!actionItem) {
          res.status(404).send();
        } else {
          User.find({ _id: { $in: actionItem.userIDList } }).then(
            users => {
              res.status(200).send({ users });
            },
            error => {
              res.status(500).send(error);
            }
          );
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });

  app.post("/action-item/current", authenticate, (req, res) => {
    const { teamList } = req.body;

    ActionItem.find({ teamID: { $in: teamList } }).then(
      actionItems => {
        res.status(200).send({ actionItems });
      },
      error => {
        res.status(500).send(error);
      }
    );
  });

  app.post("/action-item/complete/:id", authenticate, (req, res) => {
    const id = req.params.id;
    const { isComplete, userID } = req.body;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
    }

    ActionItem.findById(id)
      .then(actionItem => {
        if (!actionItem) {
          res.status(404).send();
        } else {
          if (isComplete) {
            actionItem.userIDList.push(userID);
          } else {
            actionItem.userIDList = actionItem.userIDList.filter(id => {
              if (id !== userID) return id;
            });
          }
          actionItem.save().then(
            actionItem => {
              res.send({ actionItem });
            },
            error => {
              res.status(400).send(error);
            }
          );
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  });

  app.get(
    "/action-item/usersCompleted/:id/:user_id",
    authenticate,
    (req, res) => {
      const { id, user_id } = req.params;

      if (!ObjectID.isValid(id) || !ObjectID.isValid(user_id)) {
        res.status(404).send();
      }

      ActionItem.findById(id)
        .then(actionItem => {
          if (!actionItem) {
            res.status(404).send();
          } else {
            try {
              res.status(200).send(actionItem.userIDList.includes(user_id));
            } catch (error) {
              res.status(500).send(error);
            }
          }
        })
        .catch(error => {
          res.status(500).send();
        });
    }
  );
};
