/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("projectsService", ['$location', '$rootScope', function ($location, $root) {
        return {
            go: function (path) {
                $location.path(path);
            }
        };
    }]);