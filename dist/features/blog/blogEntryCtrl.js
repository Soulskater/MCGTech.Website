/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogEntryCtrl", ["$scope", "navigationService", "blogService", "authService", "$routeParams", function ($scope, $navigation, $apiService, $authService, $routeParams) {

        _init();
        function _init() {
            $apiService.getBlogPostById($routeParams.postId).then(function (post) {
                if (!post) {
                    $navigation.go("/blog");
                }
                $scope.blogPost = post;
                SyntaxHighlighter.highlight();
            });
           /* setTimeout(function () {

            }, 100);*/
        }

        $scope.$authService = $authService;
        $scope.blogPost;
        $scope.newComment = "";
        $scope.showNewCommentPanel = false;
        $scope.toggleNewCommentPanel = function () {
            $scope.showNewCommentPanel = !$scope.showNewCommentPanel;
        };
        $scope.postComment = function () {
            $scope.showNewCommentPanel = false;
        };
        $scope.$navigation = $navigation;
    }]);

