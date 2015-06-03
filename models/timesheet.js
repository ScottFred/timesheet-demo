var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timesheetSchema = new Schema({
    username: String,
    weekEnding: Date,
    projects: [{
        name: String,
        hours: [Number]
    }]
});

module.exports = mongoose.model('Timesheet', timesheetSchema);