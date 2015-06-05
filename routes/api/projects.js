"use strict";

var express = require('express');
var security = require('./../security');
var Project = require('../../models/project');

var router = express.Router();

/* GET listing */
router.get('/', security.requireAuthentication, function(req, res) {
    return Project.find({ 'username' : req.user.username }, function(err, projects) {
        res.json(projects)
    });
});

/* GET */
router.get('/:id', security.requireAuthentication, function(req, res) {
    return Project.findById(req.params.id, function(err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return res.json(data);
    });
});

/* POST */
router.post('/', security.requireAuthentication, function(req, res) {
    var project = new Project(req.body);
    project.username = req.user.username;
    return project.save(function(err, data) {
        console.log(err ? err : 'Created project');
        return res.send(data);
    });
});

/* PUT */
router.put('/:id', security.requireAuthentication, function(req, res) {
    console.log(req.body);
    return Project.findById(req.params.id, function(err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        project.name = req.body.name;
        return project.save(function(err, data) {
            console.log(err ? err : 'Updated project');
            return res.send(data);
        });
    });
});

/* DELETE */
router.delete('/:id', security.requireAuthentication, function(req, res) {
    return Project.findById(req.params.id, function(err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return project.remove(function(err) {
            console.log(err ? err : 'Deleted project');
            return res.send('');
        });
    });
});

module.exports = router;
