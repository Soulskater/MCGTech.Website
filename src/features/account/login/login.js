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

        $scope.login = function () {

            authService.login($scope.loginData).then(function (response) {

                    $navigation.go('/home');

                },
                function (err) {
                    $scope.message = err.error_description;
                });
        };

    }]);