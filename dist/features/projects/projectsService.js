/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("projectsService", ["$q", "$http", function ($q, $http) {
        return {
            getProjects: function () {
                var defer = $q.defer();
                $http.get("http://localhost:49994/api/project").success(function (projects) {
                    defer.resolve(projects);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            }
        };
    }]);