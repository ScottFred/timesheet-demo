"use strict";

var timesheets = require('../models/timesheet');

function validateUsername(req, res, timesheet) {
    if (timesheet.username !== req.user.username) {
        res.status(404).send('Timesheet Not Found');
        return false;
    }
    return true;
}

function validateWeekEnding(req, res, timesheet) {
    if (timesheet.weekEnding.getDay() !== 6) {
        res.status(400).send('Invalid Week Ending Date');
        return false;
    }
    return true;
}

function validateUniqueWeekEnding(req, res, timesheet) {
    if (timesheet) {
        res.status(400).send('Timesheet for this week already exists');
        return false;
    }
    return true;
}

function findDuplicateWeekEnding(timesheet, callback) {
    timesheets.findOne({
        'username' : timesheet.username,
        'weekEnding' : timesheet.weekEnding,
        '_id' : { $ne : timesheet._id }
    }, callback);
}

module.exports.getTimesheets = function(req, res) {
    timesheets.find({'username': req.user.username}, function (err, timesheets) {
        res.json(timesheets)
    });
};

module.exports.getTimesheet = function(req, res) {
    timesheets.findById(req.params.id, function (err, timesheet) {
        if (!validateUsername(req, res, timesheet)) return;
        res.json(timesheet);
    });
};

module.exports.postTimesheet = function(req, res) {
    var timesheet = new timesheets(req.body);
    timesheet.username = req.user.username;
    if (!validateWeekEnding(req, res, timesheet)) return;
    findDuplicateWeekEnding(timesheet, function(err, data) {
        if (!validateUniqueWeekEnding(req, res, data)) return;
        timesheet.save(function (err, data) {
            console.log(err ? err : 'Created timesheet');
            res.send(data);
        });
    });
};

module.exports.putTimesheet = function(req, res) {
    console.log(req.body);
    timesheets.findById(req.params.id, function (err, timesheet) {
        timesheet.weekEnding = req.body.weekEnding;
        timesheet.projects = req.body.projects;
        if (!validateUsername(req, res, timesheet)) return;
        if (!validateWeekEnding(req, res, timesheet)) return;
        findDuplicateWeekEnding(timesheet, function(err, data) {
            if (!validateUniqueWeekEnding(req, res, data)) return;
            timesheet.save(function (err, data) {
                console.log(err ? err : 'Updated timesheet');
                res.send(data);
            });
        });
    });
};

module.exports.deleteTimesheet = function(req, res) {
    timesheets.findById(req.params.id, function (err, timesheet) {
        if (!validateUsername(req, res, timesheet)) return;
        timesheet.remove(function (err) {
            console.log(err ? err : 'Deleted timesheet');
            res.send('');
        });
    });
};
