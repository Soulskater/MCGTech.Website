/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("blogService", ["$q", "$http", function ($q, $http) {
        var baseUrl = "http://localhost:49994/"; //"http://mcgtechservice.azurewebsites.net/";

        return {
            getBlogEntries: function () {
                var defer = $q.defer();
                $http.get(baseUrl + "api/blog").success(function (blogs) {
                    defer.resolve(blogs);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            data: {
                selectedEntry: null
            }
        };
    }]);