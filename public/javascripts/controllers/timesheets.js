"use strict";

angular.module('timesheetApp').controller('timesheetsCtrl', function ($scope, $http) {
    var editingTimesheet = null;
    var originalTimesheet = null;

    function getDateString(d) {
        var we = new Date(d);
        return (we.getMonth() + 1) + '/' + we.getDate() + '/' +  we.getFullYear();
    }

    function beginEdit(timesheet) {
        editingTimesheet = timesheet;
        originalTimesheet = JSON.parse(JSON.stringify(timesheet));
    }

    function endEdit() {
        editingTimesheet = null;
        originalTimesheet = null;
    }

    $http.get('api/projects')
        .success(function(data) {
            $scope.projects = data;
        })
        .error(function(data, status) {
            $scope.projects = [];
            console.log('Get Error');
        });

    $http.get('api/timesheets')
        .success(function(data) {
            data.forEach(function(d) {
                d.sortableWeekEnding = d.weekEnding;
                d.weekEnding = getDateString(d.weekEnding);
            });
            $scope.timesheets = data;
        })
        .error(function(data, status) {
            $scope.timesheets = [];
            console.log('Get Error');
        });

    $scope.calcTotalHoursByDay = function (timesheet, day) {
        if (!timesheet.projects) return 0;
        return timesheet.projects
            .map(function(x) { return x.hours[day]; })
            .reduce(function (a, b) { return a + b; });
    };

    $scope.calcTotalHoursByProject = function (project) {
        if (!project) return 0;
        var totalHours = 0;
        for (var day = 0; day < 7; day++) {
            totalHours += project.hours[day];
        }
        return totalHours;
    };

    $scope.calcTotalHours = function (timesheet) {
        var totalHours = 0;
        for (var day = 0; day < 7; day++) {
            totalHours += $scope.calcTotalHoursByDay(timesheet, day);
        }
        return totalHours;
    };

    $scope.edit = beginEdit;

    $scope.save = function () {
        console.log('Saving');
        var timesheet = editingTimesheet;
        timesheet.isSaving = true;
        if (timesheet._id) {
            $http.put('api/timesheets/' + timesheet._id, timesheet)
                .success(function(data, status) {
                    timesheet.sortableWeekEnding = data.weekEnding;
                    timesheet.weekEnding = getDateString(data.weekEnding);
                    timesheet.projects = data.projects;
                    timesheet.isSaving = false;
                })
                .error(function(data, status) {
                    console.log('Put Error: ' + data);
                    timesheet.isSaving = false;
                });
        }
        else {
            $http.post('api/timesheets', timesheet)
                .success(function(data, status) {
                    timesheet._id = data._id;
                    timesheet.sortableWeekEnding = data.weekEnding;
                    timesheet.weekEnding = getDateString(data.weekEnding);
                    timesheet.projects = data.projects;
                    timesheet.isSaving = false;
                })
                .error(function(data, status) {
                    console.log('Post Error: ' + data);
                    timesheet.isSaving = false;
                });
        }
        endEdit();
    };

    $scope.cancel = function() {
        if (!editingTimesheet) return;
        var index = $scope.timesheets.indexOf(editingTimesheet);
        if (editingTimesheet._id) {
            // Cancelled editing existing timesheet... Restore the original timesheet
            $scope.timesheets[index] = originalTimesheet;
        }
        else {
            // Cancelled adding new timesheet... Remove the new timesheet
            $scope.timesheets.splice(index, 1);
        }
        endEdit();
    };

    $scope.delete = function() {
        var timesheet = editingTimesheet;
        timesheet.isSaving = true;
        var index = $scope.timesheets.indexOf(timesheet);
        if (timesheet._id) {
            $http.delete('api/timesheets/' + timesheet._id)
                .success(function(data) {
                    timesheet.isSaving = false;
                    $scope.timesheets.splice(index, 1);
                })
                .error(function(data, status) {
                    console.log('Delete Error: ' + data);
                    timesheet.isSaving = false;
                });
        }
        endEdit();
    };

    $scope.add = function() {
        var timesheet = {projects : [{hours:[0,0,0,0,0,0,0]}]};
        $scope.timesheets.push(timesheet);
        beginEdit(timesheet);
    };

    $scope.addProject = function (project) {
        var timesheet = editingTimesheet;
        if (project === null) return;
        timesheet.projects.push({name: project, hours: [0,0,0,0,0,0,0]});
    };

    $scope.deleteProject = function (project) {
        var timesheet = editingTimesheet;
        var index = timesheet.projects.indexOf(project);
        timesheet.projects.splice(index, 1);
    };

    $scope.canEdit = function (timesheet) {
        return !$scope.isEditing()
            && !$scope.isLoading()
            && !timesheet.isSaving;
    };

    $scope.canAdd = function() {
        return !$scope.isEditing()
            && !$scope.isLoading();
    };

    $scope.isEditing = function (timesheet) {
        if (timesheet) {
            return timesheet === editingTimesheet;
        }
        else {
            return editingTimesheet !== null;
        }
    };

    $scope.isLoading = function() {
        return !$scope.projects
            || !$scope.timesheets;
    };

    $scope.isSaving = function() {
        return $scope.timesheets
            && $scope.timesheets.some(function(timesheet) { return timesheet.isSaving; });
    };

});
