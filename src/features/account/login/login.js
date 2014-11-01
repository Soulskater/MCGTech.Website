/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("MCGTech")
    .controller('LoginCtrl', ['$scope', 'navigationService', 'authService', function ($scope, $navigation, authService) {

        $scope.loginData = {
            userName: "",
            password: ""
        };
        $scope.message = "";
        $scope.authenticating = false;

        $scope.login = function () {
            $scope.authenticating = true;
            authService.login($scope.loginData).then(function (response) {
                    $scope.authenticating = false;
                    $navigation.go('/home');
                },
                function (err) {
                    $scope.authenticating = false;
                    $scope.message = err.error_description;
                });
        };
    }]);