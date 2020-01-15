const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    managerID: ObjectID
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };
