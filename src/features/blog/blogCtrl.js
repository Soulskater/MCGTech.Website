/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogCtrl", [ "$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.entries = [];

        _init();
        function _init() {
            $apiService.getBlogEntries().then(function (entries) {
                console.log(entries);
                $scope.entries = entries;
            });
        }

        $scope.$navigation = $navigation;
    }]);

