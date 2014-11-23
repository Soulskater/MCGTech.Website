/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("blogService", ["$q", "$http", function ($q, $http) {
        //var baseUrl = "http://service.mcgtech.net/";
        var baseUrl = "http://localhost:49994/";

        var blogPosts;
        return {
            getBlogPosts: function () {
                var defer = $q.defer();
                if (blogPosts) {
                    defer.resolve(blogPosts);
                    return defer.promise;
                }
                $http.get(baseUrl + "api/blog").success(function (blogs) {
                    defer.resolve(blogs);
                    blogPosts = blogs;
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            saveBlogComment: function (blogId, commentText) {
                var defer = $q.defer();
                $http.post(baseUrl + "api/blog/comment/create", {
                    blogId: blogId,
                    comment: commentText
                }).success(function () {
                    defer.resolve();
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            getBlogPostById: function (blogId) {
                var defer = $q.defer();
                if (blogPosts) {
                    var post = linq(blogPosts).firstOrDefault(function (item) {
                       return item.blogId === blogId;
                    });
                    defer.resolve(post);
                    return defer.promise;
                }
                $http.get(baseUrl + "api/blog").success(function (blogs) {
                    blogPosts = blogs;
                    var post = linq(blogPosts).firstOrDefault(function (item) {
                        return item.blogId === blogId;
                    });
                    defer.resolve(post);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            }

        };
    }]);