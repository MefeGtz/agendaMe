const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date: { type: Date, required: true },
    name_task: { type: String, required: true },
    start_h: { type: Number, required: true },
    end_h: { type: Number, required: true },
    description: { type: String },
    user: { type: String }
});

const Taskdb = mongoose.model('taskdb', schema);

module.exports = Taskdb;




