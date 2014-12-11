/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("NewBlogPostCtrl", ["$scope", "navigationService", "blogService", "authService", "$interval", function ($scope, $navigation, $apiService, $authService, $interval) {

        _init();
        function _init() {
            $interval(function () {
                if($scope.blogPost.title !== "" || $scope.blogPost.content !== "") {
                    $scope.saveBlogPostDraft();
                }
            }, 30000);
        }

        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.blogPostDraft={
            title:'',
            content:''
        };

        $scope.saveBlogPostDraft = function () {
            $apiService.saveBlogPostDraft();
        };

        $scope.publishBlogPost = function () {
            $apiService.publishBlogPost();
        };
    }]);

