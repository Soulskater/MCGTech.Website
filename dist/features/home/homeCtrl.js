/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("HomeCtrl", [ "$scope", "authService", function ($scope, $authService) {
        $scope.$authService = $authService;
    }]);
