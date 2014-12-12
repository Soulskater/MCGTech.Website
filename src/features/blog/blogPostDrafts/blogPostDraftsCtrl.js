/**
 * Created by MCG on 2014.12.11..
 */
angular.module("MCGTech")
    .controller("BlogPostDraftCtrl", ["$scope", "navigationService", "blogService", "authService", function ($scope, $navigation, $apiService, $authService) {

        _init();
        function _init() {
            if (!$authService.user.isAuthenticated) {
                $navigation.go("/home");
            }
            $apiService.getBlogPostDrafts()
                .then(function (drafts) {
                    $scope.loading = false;
                    $scope.blogPostDrafts = drafts;
                });
        }

        $scope.$authService = $authService;
        $scope.$navigation = $navigation;
        $scope.moment = moment;
        $scope.loading = true;
        $scope.blogPostDraft;

        $scope.blogPostDrafts = [];

        $scope.selectDraft = function (draft) {
            $scope.blogPostDraft = draft;
        };

        $scope.addNewDraft = function () {
            var newItem = {
                title: "New draft",
                content: ""
            };
            $scope.blogPostDraft = newItem;
            $scope.blogPostDrafts.push(newItem);
        };

        $scope.deleteBlogPostDraft = function (index) {
            var item = $scope.blogPostDrafts[index];
            if (item.lastSaved) {
                $apiService.deleteBlogPostDraft(item);
            }
            $scope.blogPostDrafts.splice(index, 1);
        };

        $scope.saveBlogPostDraft = function () {
            $apiService.saveBlogPostDraft($scope.blogPostDraft)
                .then(function (blogPostDraft) {
                    angular.extend($scope.blogPostDraft, blogPostDraft);
                });
        };

        $scope.publishBlogPost = function () {
            $apiService.publishBlogPost($scope.blogPostDraft);
        };
    }]);