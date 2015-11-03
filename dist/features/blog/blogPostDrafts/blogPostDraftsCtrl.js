/**
 * Created by MCG on 2014.12.11..
 */
angular.module("MCGTech")
    .controller("BlogPostDraftCtrl", ["$scope", "navigationService", "blogService", "authService", "$interval",
        function ($scope, $navigation, $apiService, $authService, $interval) {

            _init();
            function _init() {
                if (!$authService.user.isAuthenticated) {
                    $navigation.go("/home");
                }
                $apiService.getBlogPostDrafts()
                    .then(function (drafts) {
                        $scope.loading = false;
                        $scope.blogPostDraftList = drafts;
                    });
            }

            $scope.$authService = $authService;
            $scope.$navigation = $navigation;
            $scope.moment = moment;
            $scope.loading = true;
            $scope.blogPostDraft;

            $scope.blogPostDraftList = [];

            $scope.selectDraft = function (draft) {
                if(!$scope.blogPostDraft){
                    setAutoSavingDraft();
                }
                $scope.blogPostDraft = draft;
            };

            $scope.addNewDraft = function () {
                var newItem = {
                    title: "New draft",
                    content: ""
                };
                $scope.blogPostDraft = newItem;
                $scope.blogPostDraftList.push(newItem);
            };

            $scope.deleteBlogPostDraft = function (index) {
                var item = $scope.blogPostDraftList[index];
                if (item.lastSaved) {
                    $apiService.deleteBlogPostDraft(item);
                }
                $scope.blogPostDraftList.splice(index, 1);
            };

            $scope.saveBlogPostDraft = function () {
                $apiService.saveBlogPostDraft($scope.blogPostDraft)
                    .then(function (blogPostDraft) {
                        $scope.blogPostDraft.lastSaved = blogPostDraft.lastSaved;
                        $scope.blogPostDraft.blogPostDraftId = blogPostDraft.blogPostDraftId;
                    });
            };

            $scope.publishBlogPost = function () {
                $apiService.publishBlogPost($scope.blogPostDraft);
            };

            function setAutoSavingDraft() {
                $interval(function () {
                    if($scope.blogPostDraft) {
                        $scope.saveBlogPostDraft();
                    }
                }, 50000);
            }
        }]);