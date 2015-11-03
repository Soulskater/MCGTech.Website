/**
 * Created by MCG on 2014.10.30..
 */
angular.module("MCGTech")
    .service("blogService", ["$q", "$http", "serviceUrl", function ($q, $http, $url) {

        var blogPosts;
        return {
            getBlogPosts: function () {
                var defer = $q.defer();
                if (blogPosts) {
                    defer.resolve(blogPosts);
                    return defer.promise;
                }
                $http.get($url.baseUrl + "api/blog").success(function (blogs) {
                    defer.resolve(blogs);
                    blogPosts = blogs;
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            saveBlogComment: function (blogId, commentText) {
                var defer = $q.defer();
                $http.post($url.baseUrl + "api/blog/comment/create", {
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
                $http.get($url.baseUrl + "api/blog").success(function (blogs) {
                    blogPosts = blogs;
                    var post = linq(blogPosts).firstOrDefault(function (item) {
                        return item.blogId === blogId;
                    });
                    defer.resolve(post);
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            rateBlog: function (blogId, value) {
                var defer = $q.defer();
                $http.post($url.baseUrl + "api/blog/rate", {
                    blogId: blogId,
                    value: value
                }).success(function () {
                    defer.resolve();
                }).error(function (ex) {
                    defer.reject(ex);
                });
                return defer.promise;
            },
            getBlogPostDrafts: function () {
                var defer = $q.defer();
                $http.get($url.baseUrl + "api/blog/draft")
                    .success(function (drafts) {
                        defer.resolve(drafts);
                    }).error(function (ex) {
                        defer.reject(ex);
                    });
                return defer.promise;
            },
            saveBlogPostDraft: function (blogPostDraft) {
                var defer = $q.defer();
                $http.post($url.baseUrl + "api/blog/draft/save", blogPostDraft)
                    .success(function (savedDraft) {
                        defer.resolve(savedDraft);
                    }).error(function (ex) {
                        defer.reject(ex);
                    });
                return defer.promise;
            },
            deleteBlogPostDraft: function (blogPostDraft) {
                var defer = $q.defer();
                $http.post($url.baseUrl + "api/blog/draft/delete", blogPostDraft.blogPostDraftId)
                    .success(function () {
                        defer.resolve();
                    }).error(function (ex) {
                        defer.reject(ex);
                    });
                return defer.promise;
            },
            publishBlogPost: function (blogPostDraft) {
                var defer = $q.defer();
                $http.post($url.baseUrl + "api/blog/create", blogPostDraft)
                    .success(function () {
                        defer.resolve();
                    }).error(function (ex) {
                        defer.reject(ex);
                    });
                return defer.promise;
            }
        };
    }]);