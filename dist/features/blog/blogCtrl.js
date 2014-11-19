/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("BlogCtrl", ["$scope", "navigationService", "blogService", function ($scope, $navigation, $apiService) {
        $scope.blogEntryGroups = [];

        _init();
        function _init() {
            $apiService.getBlogEntries().then(function (entries) {
                $scope.blogEntryGroups = linq(entries).groupBy(function (entry) {
                    entry.created = moment(entry.created);
                    return [entry.created.format('L')];
                }).get();
                console.log($scope.blogEntryGroups);
            });
        }

        $scope.$navigation = $navigation;
    }]);

