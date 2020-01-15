const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const ActionItemSchema = mongoose.Schema({
    title: String,
    description: String,
    teamID: ObjectID,
    dueDate: String,
    dateCreated: String,
    userIDList: Array
});

const ActionItem = mongoose.model('ActionItem', ActionItemSchema);

module.exports = { ActionItem };
