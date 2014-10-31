/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("projectsService", ["$q", "$http", function ($q, $http) {
        var baseUrl = "http://mcgtechservice.azurewebsites.net/";

        return {
            getProjects: function () {
                var defer = $q.defer();
                $http.get(baseUrl + "api/project").success(function (projects) {
                    defer.resolve(projects);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            }
        };
    }]);