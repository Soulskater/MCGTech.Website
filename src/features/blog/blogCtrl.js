/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogCtrl", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.blogPostGroups = [];

        _init();
        function _init() {
            $apiService.getBlogPosts().then(function (posts) {
                $scope.blogPostGroups = linq(posts).groupBy(function (post) {
                    post.created = moment(post.created);
                    return [post.created.format('MM')];
                }).get();
            });
        }

        $scope.hasSelected = function () {
            return linq($scope.blogPostGroups).any(function (postGroup) {
                return postGroup.selected;
            });
        };

        $scope.$navigation = $navigation;

        $scope.selectGroup = function (group) {
            linq($scope.blogPostGroups).forEach(function (postGroup) {
                postGroup.selected = false;
            });
            group.selected = true;
        };

        $scope.blogPostTileStyle = function ($index, group) {
            return {
                top: !group.selected ? (-5 * (group.length - $index)) : 0,
                right: !group.selected ? (-5 * (group.length - $index)) : 0,
                'z-index': group.selected ? 10 : 0,
                transform: group.selected ? "translate(" + (-160 + ($index * 160)) + "px, 100px)" : ""
            };
        };

        $scope.showBlogPost = function (post, group) {
            if (!group.selected) {
                return;
            }
            $navigation.go("/blog/post/" + post.blogId);
        };
    }]);

