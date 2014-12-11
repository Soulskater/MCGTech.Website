/**
 * Created by MCG on 2014.12.11..
 */
angular.module("MCGTech")
    .controller("BlogPostDraftCtrl", ["$scope", "navigationService", "blogService", "authService", function ($scope, $navigation, $apiService, $authService) {

        _init();
        function _init() {
            $apiService.getBlogPostDrafts()
                .then(function (drafts) {
                    $scope.blogPostDrafts = drafts;
                });
        }

        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.moment = moment;

        $scope.blogPostDrafts = [];

        $scope.deleteBlogPostDraft = function (blogPostDraft) {
            linq($scope.blogPostDrafts).remove(function (draft) {
                return draft === blogPostDraft;
            });
            $apiService.deleteBlogPostDraft(blogPostDraft);
        };
    }]);