/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("ProjectsCtrl", [ "$scope", "navigationService", "projectsService", function ($scope, $navigation, $apiService) {
        $scope.projects = [];

        _init();
        function _init() {
            $apiService.getProjects().then(function (projects) {
                $scope.projects = projects;
            });
        }

        $scope.$navigation = $navigation;

        $scope.openGitDemoPage= function (url) {
            window.open(url, '_blank');
        };
    }]);
