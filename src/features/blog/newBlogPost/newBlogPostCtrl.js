/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("NewBlogPostCtrl", ["$scope", "navigationService", "blogService", "authService", "$routeParams", function ($scope, $navigation, $apiService, $authService, $routeParams) {

        _init();
        function _init() {

        }

        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.blogPostDraft={
            content:''
        };

        $scope.saveBlogPost = function () {
            $apiService.saveBlogPost();
        };
    }]);

