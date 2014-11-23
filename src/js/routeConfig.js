/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/projects', {
                    templateUrl: 'features/projects/projects.html',
                    controller: 'ProjectsCtrl'
                }).
                when('/blog', {
                    templateUrl: 'features/blog/blog.html',
                    controller: 'BlogCtrl'
                }).
                when('/blog/post/:postId', {
                    templateUrl: 'features/blog/blogPost.html',
                    controller: 'BlogEntryCtrl'
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
                when("/flowdesigner", {
                    templateUrl: "features/projects/flowdesigner/flowdesigner.html"
                    //controller: "RegisterCtrl"
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);