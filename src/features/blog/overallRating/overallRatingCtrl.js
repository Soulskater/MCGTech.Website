/**
 * Created by MCG on 2014.11.26..
 */
angular.module("MCGTech")
    .controller("OverallRating", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.init = function (blogPost) {
            $scope.blogPost = blogPost;
            $scope.calculateRating();
        };
        $scope.rating;
        $scope.calculateRating = function () {
            var sum = 0;
            linq($scope.blogPost.ratings).forEach(function (rating) {
                sum += rating.value;
            });
            $scope.rating = sum / $scope.blogPost.ratings.length;
        };
    }]);