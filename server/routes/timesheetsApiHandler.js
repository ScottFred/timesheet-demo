module.exports = (function() {
    "use strict";

    var timesheets = require('../models/timesheet');

    function validateUsername(req, res, timesheet) {
        if (timesheet.username !== req.user.username) {
            res.status(404).send('Timesheet not found');
            return false;
        }
        return true;
    }

    function validateWeekEnding(req, res, timesheet) {
        if (!timesheet.weekEnding || timesheet.weekEnding.getDay() !== 6) {
            res.status(400).send('Invalid week ending date');
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

    function getTimesheets(req, res) {
        timesheets.find({'username' : req.user.username}, {}, {'sort' : 'weekEnding'}, function (err, timesheets) {
            res.json(timesheets)
        });
    }

    function getTimesheet(req, res) {
        timesheets.findById(req.params.id, function (err, timesheet) {
            if (!validateUsername(req, res, timesheet)) return;
            res.json(timesheet);
        });
    }

    function postTimesheet(req, res) {
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
    }

    function putTimesheet(req, res) {
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
    }

    function deleteTimesheet(req, res) {
        timesheets.findById(req.params.id, function (err, timesheet) {
            if (!validateUsername(req, res, timesheet)) return;
            timesheet.remove(function (err) {
                console.log(err ? err : 'Deleted timesheet');
                res.send('');
            });
        });
    }

    return {
        getTimesheets: getTimesheets,
        getTimesheet: getTimesheet,
        postTimesheet: postTimesheet,
        putTimesheet: putTimesheet,
        deleteTimesheet: deleteTimesheet
    };
})();
