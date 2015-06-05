"use strict";

var express = require('express');
var security = require('./../security');
var Timesheet = require('../../models/timesheet');

var router = express.Router();

/* GET listing. */
router.get('/', security.requireAuthentication, function(req, res) {
    return Timesheet.find({ 'username' : req.user.username }, function(err, timesheets) {
        res.json(timesheets)
    });
});

/* GET. */
router.get('/:id', security.requireAuthentication, function(req, res) {
    return Timesheet.findById(req.params.id, function(err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return res.json(timesheet);
    });
});

/* POST */
router.post('/', security.requireAuthentication, function(req, res) {
    var timesheet = new Timesheet(req.body);
    timesheet.username = req.user.username;
    return timesheet.save(function(err, data) {
        console.log(err ? err : 'Created timesheet');
        return res.send(data);
    });
});

/* PUT */
router.put('/:id', security.requireAuthentication, function(req, res) {
    console.log(req.body);
    return Timesheet.findById(req.params.id, function(err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        timesheet.weekEnding = req.body.weekEnding;
        timesheet.projects = req.body.projects;
        return timesheet.save(function(err, data) {
            console.log(err ? err : 'Updated timesheet');
            return res.send(data);
        });
    });
});

/* DELETE */
router.delete('/:id', security.requireAuthentication, function(req, res) {
    return Timesheet.findById(req.params.id, function(err, timesheet) {
        if (timesheet.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return timesheet.remove(function(err) {
            console.log(err ? err : 'Deleted timesheet');
            return res.send('');
        });
    });
});

module.exports = router;
