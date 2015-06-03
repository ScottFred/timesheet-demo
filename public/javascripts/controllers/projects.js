angular.module('timesheetApp').controller('projectsCtrl', function($scope, $http) {
    $scope.editingProject = null;
    $scope.originalProject = null;

    function beginEdit(project) {
        $scope.editingProject = project;
        $scope.originalProject = JSON.parse(JSON.stringify(project));
    }

    function endEdit() {
        $scope.editingProject = null;
        $scope.originalProject = null;
    }

    $http.get('api/projects')
        .success(function(data) {
            $scope.projects = data;
        })
        .error(function(data, status) {
            $scope.projects = [];
            console.log('Get Error');
        });

    $scope.edit = beginEdit;

    $scope.save = function () {
        console.log('Saving');
        var project = $scope.editingProject;
        project.isSaving = true;
        if (project._id) {
            $http.put('api/projects/' + project._id, project)
                .success(function(data) {
                    project.name = data.name;
                    project.isSaving = false;
                })
                .error(function(data, status) {
                    console.log('Put Error: ' + data);
                    project.isSaving = false;
                });
        }
        else {
            $http.post('api/projects', project)
                .success(function(data) {
                    project._id = data._id;
                    project.name = data.name;
                    project.isSaving = false;
                })
                .error(function(data, status) {
                    console.log('Post Error: ' + data);
                    project.isSaving = false;
                });
        }
        endEdit();
    };

    $scope.cancel = function() {
        if (!$scope.editingProject) return;
        var index = $scope.projects.indexOf($scope.editingProject);
        if ($scope.editingProject._id) {
            // Cancelled editing existing project... Restore the original project
            $scope.projects[index] = $scope.originalProject;
        }
        else {
            // Cancelled adding new project... Remove the new project
            $scope.projects.splice(index, 1);
        }
        endEdit();
    };

    $scope.delete = function() {
        var project = $scope.editingProject;
        project.isSaving = true;
        var index = $scope.projects.indexOf(project);
        if (project._id) {
            $http.delete('api/projects/' + project._id)
                .success(function(data) {
                    project.isSaving = false;
                    $scope.projects.splice(index, 1);
                })
                .error(function(data, status) {
                    console.log('Delete Error: ' + data);
                    project.isSaving = false;
                });
        }
        endEdit();
    };

    $scope.add = function() {
        var project = {};
        $scope.projects.push(project);
        beginEdit(project);
    };

    $scope.canAdd = function() {
        return !$scope.isEditing()
            && !$scope.isLoading();
    };

    $scope.isEditing = function (project) {
        if (project) {
            return project === $scope.editingProject;
        }
        else {
            return $scope.editingProject !== null;
        }
    };

    $scope.isLoading = function() {
        return !$scope.projects
            || !$scope.projects;
    };

    $scope.isSaving = function() {
        return $scope.projects
            && $scope.projects.some(function(project) { return project.isSaving; });
    };

});
