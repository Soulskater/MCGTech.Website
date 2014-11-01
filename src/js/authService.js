/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("MCGTech")
    .service('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

        //var serviceBase = "http://localhost:49994/";
        var serviceBase = 'http://service.mcgtech.net/';
        var authServiceFactory = {};

        var _authentication = {
            isAuthenticated: false,
            userName: ""
        };
        var _userProfile = {
            firstName: "",
            lastName: ""
        };

        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });

        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                _authentication.isAuthenticated = true;
                _authentication.userName = loginData.userName;
                deferred.resolve(response);
            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuthenticated = false;
            _authentication.userName = "";
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuthenticated = true;
                _authentication.userName = authData.userName;
            }

        };

        var _getUserProfile = function () {
            var defer = $q.defer();
            if (_userProfile.firstName !== "") {
                defer.resolve(_userProfile);
                return defer.promise;
            }
            $http.get(serviceBase + 'api/account/user')
                .success(function (response) {
                    defer.resolve(response);
                }).error(function (ex) {
                    defer.reject(ex);
                });
            return defer.promise;
        };
        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.getUserProfile = _getUserProfile;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.user = _authentication;

        return authServiceFactory;
    }]);