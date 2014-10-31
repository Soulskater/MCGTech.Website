/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("MasterPageCtrl", ['$scope', 'navigationService', 'authService', function ($scope, $navigation, authService) {
        $scope.menuList=[
            { name: "Projects", url:"#/projects"},
            { name: "Blog", url:"#/blog"},
            { name: "About", url:"#/about"}
        ];

        $scope.authService = authService;
        $scope.$navigation = $navigation;
    }]);