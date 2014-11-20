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
                    return [entry.created.format('MM')];
                }).get();
            });
        }

        $scope.hasSelected = null;

        $scope.$navigation = $navigation;

        $scope.selectedEntry = null;

        $scope.selectGroup= function (group) {
            $scope.hasSelected = true;
            linq($scope.blogEntryGroups).forEach(function (entryGroup) {
               entryGroup.selected = false;
            });
            group.selected = true;
        };

        $scope.setBlogEntryStyle = function (entry, $index, group) {
            return {
                top: !group.selected ? (-5*(group.length - $index)) : 0,
                right: !group.selected ? (-5*(group.length - $index)) : 0,
                'z-index': group.selected ? 10 : 0,
                transform: group.selected ? "translate("+ (-160 + ($index * 160)) +"px, 100px)":""
            };
        };


        $scope.showBlogEntry= function (entry, group) {
            if(!group.selected){
                return;
            }
            $apiService.data.selectedEntry = entry;
            $navigation.go("/blog/entry");
        };
    }]);

