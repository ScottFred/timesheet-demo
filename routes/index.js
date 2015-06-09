"use strict";

var sessionHandler = require('./sessionHandler');
var contentHandler = require('./contentHandler');
var projectsApiHandler = require('./projectsApiHandler');
var timesheetsApiHandler = require('./timesheetsApiHandler');

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    sessionHandler.redirectToLogin(req, res);
}

var express = require('express');
var router = express.Router();

router.get('/', contentHandler.getMain);
router.get('/projects', requireAuthentication, contentHandler.getProjects);
router.get('/about', contentHandler.getAbout);
router.get('/contact', contentHandler.getContact);

router.get('/auth/register', sessionHandler.getRegister);
router.post('/auth/register', sessionHandler.postRegister);
router.get('/auth/login', sessionHandler.getLogin);
router.post('/auth/login', sessionHandler.postLogin);
router.get('/auth/logout', sessionHandler.getLogout);

router.get('/api/projects', requireAuthentication, projectsApiHandler.getProjects);
router.get('/api/projects/:id', requireAuthentication, projectsApiHandler.getProject);
router.post('/api/projects', requireAuthentication, projectsApiHandler.postProject);
router.put('/api/projects/:id', requireAuthentication, projectsApiHandler.putProject);
router.delete('/api/projects/:id', requireAuthentication, projectsApiHandler.deleteProject);

router.get('/api/timesheets', requireAuthentication, timesheetsApiHandler.getTimesheets);
router.get('/api/timesheets/:id', requireAuthentication, timesheetsApiHandler.getTimesheet);
router.post('/api/timesheets', requireAuthentication, timesheetsApiHandler.postTimesheet);
router.put('/api/timesheets/:id', requireAuthentication, timesheetsApiHandler.putTimesheet);
router.delete('/api/timesheets/:id', requireAuthentication, timesheetsApiHandler.deleteTimesheet);

module.exports = router;