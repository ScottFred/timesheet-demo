"use strict";

var passport = require('passport');

var sessionHandler = require('./sessionHandler');
var mainHandler = require('./mainHandler');
var projectsApiHandler = require('./projectsApiHandler');
var timesheetsApiHandler = require('./timesheetsApiHandler');

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    sessionHandler.redirectToLogin(req, res);
}

function requireApiAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    passport.authenticate('basic', { session: false })(req, res, next);
}

var express = require('express');
var router = express.Router();

// Page Routes

router.get('/', mainHandler.getMain);
router.get('/projects', requireAuthentication, mainHandler.getProjects);

router.get('/auth/register', sessionHandler.getRegister);
router.post('/auth/register', sessionHandler.postRegister);
router.get('/auth/login', sessionHandler.getLogin);
router.post('/auth/login', sessionHandler.postLogin);
router.get('/auth/logout', sessionHandler.getLogout);

// API Routes

router.get('/api/projects', requireApiAuthentication, projectsApiHandler.getProjects);
router.get('/api/projects/:id', requireApiAuthentication, projectsApiHandler.getProject);
router.post('/api/projects', requireApiAuthentication, projectsApiHandler.postProject);
router.put('/api/projects/:id', requireApiAuthentication, projectsApiHandler.putProject);
router.delete('/api/projects/:id', requireApiAuthentication, projectsApiHandler.deleteProject);

router.get('/api/timesheets', requireApiAuthentication, timesheetsApiHandler.getTimesheets);
router.get('/api/timesheets/:id', requireApiAuthentication, timesheetsApiHandler.getTimesheet);
router.post('/api/timesheets', requireApiAuthentication, timesheetsApiHandler.postTimesheet);
router.put('/api/timesheets/:id', requireApiAuthentication, timesheetsApiHandler.putTimesheet);
router.delete('/api/timesheets/:id', requireApiAuthentication, timesheetsApiHandler.deleteTimesheet);

module.exports = router;