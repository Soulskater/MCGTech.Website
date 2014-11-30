/**
 * Created by MCG on 2014.11.26..
 */
angular.module("MCGTech")
    .directive('dynamicTile', ["$interval", function ($interval) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                blogPost: "=",
                tileChanged: "&"
            },
            template: '<div>' +
            '<div class="" ng-include="activeTile.url">' +
            '</div>' +
            '</div>',
            link: function ($scope, element, attrs) {
                $scope.tiles = [
                    {
                        url: "features/blog/activityChart/activityChart.html"
                    },
                    {
                        url: "features/blog/overallRating/overallRating.html"
                    }
                ];
                $scope.activeTile = $scope.tiles[1];
                $interval(function () {
                    if(Math.floor((Math.random() * 100) + 1) % 2 === 0) {
                        $scope.activeTile = $scope.tiles[1];
                    }
                    else{
                        $scope.activeTile = $scope.tiles[0];
                    }
                }, 5000)

                //
                //Disposing
                $scope.$on('$destroy', function () {
                });
            }
        };
    }]);