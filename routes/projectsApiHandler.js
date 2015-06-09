"use strict";

var projects = require('../models/project');

module.exports.getProjects = function (req, res) {
    return projects.find({'username': req.user.username}, function (err, projects) {
        res.json(projects)
    });
};

module.exports.getProject = function (req, res) {
    return projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return res.json(data);
    });
};

module.exports.postProject = function (req, res) {
    var project = new projects(req.body);
    project.username = req.user.username;
    return project.save(function (err, data) {
        console.log(err ? err : 'Created project');
        return res.send(data);
    });
};

module.exports.putProject = function (req, res) {
    console.log(req.body);
    return projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        project.name = req.body.name;
        return project.save(function (err, data) {
            console.log(err ? err : 'Updated project');
            return res.send(data);
        });
    });
};

module.exports.deleteProject = function (req, res) {
    return projects.findById(req.params.id, function (err, project) {
        if (project.username !== req.user.username) {
            return res.status(404).send('Not Found');
        }
        return project.remove(function (err) {
            console.log(err ? err : 'Deleted project');
            return res.send('');
        });
    });
};

