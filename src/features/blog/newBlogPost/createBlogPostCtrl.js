/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("CreateBlogPostCtrl", ["$scope", "navigationService", "blogService", "authService", "$interval", function ($scope, $navigation, $apiService, $authService, $interval) {

        _init();
        function _init() {
            /*$interval(function () {
             if($scope.blogPostDraft.title !== "" || $scope.blogPostDraft.content !== "") {
             $scope.saveBlogPostDraft();
             }
             }, 30000);*/
        }

        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.blogPostDraft = {
            title: '',
            content: '',
            user: null,
            lastSaved: null,
            blogPostDraftId: 0
        };

        $scope.saveBlogPostDraft = function () {
            $apiService.saveBlogPostDraft($scope.blogPostDraft)
                .then(function (blogPostDraft) {
                    $scope.blogPostDraft = blogPostDraft;
                    console.log(blogPostDraft);
                });
        };

        $scope.publishBlogPost = function () {
            $apiService.publishBlogPost($scope.blogPostDraft);
        };
    }]);

