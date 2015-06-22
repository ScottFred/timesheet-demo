"use strict";

var projects = require('../models/project');

function validateUsername(req, res, project) {
    if (project.username !== req.user.username) {
        res.status(404).send('Project not found');
        return false;
    }
    return true;
}

function validateName(req, res, project) {
    if (!project.name || project.name === '' || project.name.trim() === '') {
        res.status(400).send('Project name is required');
        return false;
    }
    return true;
}

function validateUniqueName(req, res, project) {
    if (project) {
        res.status(400).send('Project already exists: ' + project.name);
        return false;
    }
    return true;
}

function findDuplicateName(project, callback) {
    projects.findOne({
        'name' : project.name,
        '_id' : { $ne : project._id }
    }, callback);
}

module.exports.getProjects = function (req, res) {
    projects.find({'username' : req.user.username}, {}, {'sort' : 'name'}, function (err, projects) {
        res.json(projects)
    });
};

module.exports.getProject = function (req, res) {
    projects.findById(req.params.id, function (err, project) {
        if (!validateUsername(req, res, project)) return;
        res.json(data);
    });
};

module.exports.postProject = function (req, res) {
    var project = new projects(req.body);
    project.username = req.user.username;
    if (!validateName(req, res, project)) return;
    findDuplicateName(project, function(err, data) {
        if (!validateUniqueName(req, res, data)) return;
        project.save(function (err, data) {
            console.log(err ? err : 'Created project');
            res.send(data);
        });
    });
};

module.exports.putProject = function (req, res) {
    console.log(req.body);
    projects.findById(req.params.id, function (err, project) {
        project.name = req.body.name;
        if (!validateName(req, res, project)) return;
        if (!validateUsername(req, res, project)) return;
        findDuplicateName(project, function(err, data) {
            if (!validateUniqueName(req, res, data)) return;
            project.save(function (err, data) {
                console.log(err ? err : 'Updated project');
                res.send(data);
            });
        });
    });
};

module.exports.deleteProject = function (req, res) {
    projects.findById(req.params.id, function (err, project) {
        if (!validateUsername(req, res, project)) return;
        project.remove(function (err) {
            console.log(err ? err : 'Deleted project');
            res.send('');
        });
    });
};

