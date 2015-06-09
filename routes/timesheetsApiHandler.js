"use strict";

var timesheets = require('../models/timesheet');

module.exports.getTimesheets = function(req, res) {
    timesheets.find({'username': req.user.username}, function (err, timesheets) {
        res.json(timesheets)
    });
};

module.exports.getTimesheet = function(req, res) {
    timesheets.findById(req.params.id, function (err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        res.json(timesheet);
    });
};

module.exports.postTimesheet = function(req, res) {
    var timesheet = new timesheets(req.body);
    timesheet.username = req.user.username;
    timesheet.save(function (err, data) {
        console.log(err ? err : 'Created timesheet');
        res.send(data);
    });
};

module.exports.putTimesheet = function(req, res) {
    console.log(req.body);
    timesheets.findById(req.params.id, function (err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        timesheet.weekEnding = req.body.weekEnding;
        timesheet.projects = req.body.projects;
        timesheet.save(function (err, data) {
            console.log(err ? err : 'Updated timesheet');
            res.send(data);
        });
    });
};

module.exports.deleteTimesheet = function(req, res) {
    timesheets.findById(req.params.id, function (err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        timesheet.remove(function (err) {
            console.log(err ? err : 'Deleted timesheet');
            res.send('');
        });
    });
};
