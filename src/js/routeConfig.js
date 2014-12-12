/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .constant("serviceUrl", {
        //baseUrl: "http://service.mcgtech.net/",
        baseUrl: "http://localhost:49994/"
    })
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/projects', {
                    templateUrl: 'features/projects/projects.html',
                    controller: 'ProjectsCtrl'
                }).
                when('/blog', {
                    templateUrl: 'features/blog/blogList/blog.html',
                    controller: 'BlogCtrl'
                }).
                when('/blog/post/:postId', {
                    templateUrl: 'features/blog/blogPost/blogPost.html',
                    controller: 'BlogPostCtrl'
                }).
                when('/blog/draft', {
                    templateUrl: 'features/blog/blogPostDrafts/blogPostDrafts.html',
                    controller: 'BlogPostDraftCtrl'
                }).
                when('/about', {
                    templateUrl: 'features/about/about.html',
                    controller: 'AboutCtrl'
                }).
                when('/home', {
                    templateUrl: 'features/home/home.html',
                    controller: 'HomeCtrl'
                }).
                when("/login", {
                    templateUrl: "features/account/login/login.html",
                    controller: "LoginCtrl"
                }).
                when("/signup", {
                    templateUrl: "features/account/register/register.html",
                    controller: "RegisterCtrl"
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);