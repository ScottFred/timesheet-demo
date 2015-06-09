"use strict";

var projects = require('../models/project');

module.exports.getProjects = function (req, res) {
    projects.find({'username': req.user.username}, function (err, projects) {
        res.json(projects)
    });
};

module.exports.getProject = function (req, res) {
    projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        res.json(data);
    });
};

module.exports.postProject = function (req, res) {
    var project = new projects(req.body);
    project.username = req.user.username;
    project.save(function (err, data) {
        console.log(err ? err : 'Created project');
        res.send(data);
    });
};

module.exports.putProject = function (req, res) {
    console.log(req.body);
    projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        project.name = req.body.name;
        project.save(function (err, data) {
            console.log(err ? err : 'Updated project');
            res.send(data);
        });
    });
};

module.exports.deleteProject = function (req, res) {
    projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        project.remove(function (err) {
            console.log(err ? err : 'Deleted project');
            res.send('');
        });
    });
};

