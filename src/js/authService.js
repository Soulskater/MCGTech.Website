/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("MCGTech")
    .service('authService', ['$http', '$q', 'localStorageService', 'serviceUrl', function ($http, $q, localStorageService, $url) {

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
            return $http.post($url.baseUrl + 'api/account/register', registration).then(function (response) {
                return response;
            });
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post($url.baseUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                _fillAuthData();
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
                _getUserProfile();
            }

        };

        var _getUserProfile = function () {
            var defer = $q.defer();
            if (_userProfile.firstName !== "") {
                defer.resolve(_userProfile);
                return defer.promise;
            }
            $http.get($url.baseUrl + 'api/account/user')
                .success(function (response) {
                    _userProfile.firstName = response.firstName;
                    _userProfile.lastName = response.lastName;
                    defer.resolve(response);
                }).error(function (ex) {
                    _logOut();
                    defer.reject(ex);
                });
            return defer.promise;
        };
        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.getUserProfile = _getUserProfile;
        authServiceFactory.userProfile = _userProfile;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.user = _authentication;

        return authServiceFactory;
    }]);