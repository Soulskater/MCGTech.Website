/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("ProjectsCtrl", [ "$scope", "navigationService", "projectsService", function ($scope, $navigation, $apiService) {
        $scope.projects = [];
        $scope.loading = false;
        _init();
        function _init() {
            $scope.loading = true;
            $apiService.getProjects().then(function (projects) {
                $scope.projects = projects;
                $scope.loading = false;
            });
        }

        $scope.$navigation = $navigation;

        $scope.openGitDemoPage= function (url) {
            window.open(url, '_blank');
        };
    }]);
