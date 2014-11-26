/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogEntryCtrl", ["$scope", "navigationService", "blogService", "authService", "$routeParams", function ($scope, $navigation, $apiService, $authService, $routeParams) {

        _init();
        function _init() {
            $apiService.getBlogPostById(parseFloat($routeParams.postId))
                .then(function (post) {
                    if (!post) {
                        $navigation.go("/blog");
                    }
                    linq(post.comments).forEach(function (comment) {
                        comment.created = moment(comment.created);
                    });
                    $scope.blogPost = post;
                    $scope.calculateRating();
                    setTimeout(function () {
                        SyntaxHighlighter.highlight();
                    }, 100);
                    $scope.loading = false;
                });
        }

        $scope.loading = true;
        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.blogPost;
        $scope.overallRating;
        $scope.newComment = "";

        $scope.calculateRating = function () {
            var sum = 0;
            linq($scope.blogPost.ratings).forEach(function (rating) {
                sum += rating.value;
            });
            $scope.overallRating = sum / $scope.blogPost.ratings.length;
        };

        $scope.hasRating = function () {
            return linq($scope.blogPost.ratings).firstOrDefault(function (rate) {
                    return rate.userId === $authService.user.userName;
                }) !== null;
        };

        $scope.postComment = function () {
            if ($scope.newComment === "") {
                return;
            }
            $scope.blogPost.comments.push({
                blogId: $scope.blogPost.blogId,
                comment: $scope.newComment,
                created: moment(new Date())
            });
            $apiService.saveBlogComment($scope.blogPost.blogId, $scope.newComment);
            $scope.newComment = "";
        };

        $scope.sendRating = function (rating) {
            $scope.blogPost.ratings.push(rating);
            $apiService.rateBlog($scope.blogPost.blogId, rating);
            $scope.calculateRating();
        };
    }]);

