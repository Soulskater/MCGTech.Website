/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("projectsService", ["$q", "$http", "serviceUrl", function ($q, $http, $url) {
        return {
            getProjects: function () {
                var defer = $q.defer();
                $http.get($url.baseUrl + "api/project").success(function (projects) {
                    defer.resolve(projects);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            }
        };
    }]);