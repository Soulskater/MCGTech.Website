/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogEntryCtrl", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {

        _init();
        function _init() {
            if ($apiService.data.selectedEntry === null) {
                $navigation.go("/blog");
            }
        }

        $scope.blogEntry = $apiService.data.selectedEntry;

        $scope.$navigation = $navigation;
    }]);

