/**
 * Created by gmeszaros on 10/31/2014.
 */
angular.module("MCGTech")
    .service('authService', ['$http', '$q', 'localStorageService', 'serviceUrl', '$timeout', function ($http, $q, localStorageService, $url, $timeout) {

        var authServiceFactory = {};

        var _authentication = {
            expiresIn: null,
            isAuthenticated: false,
            userName: ""
        };
        var _userProfile = {
            firstName: "",
            lastName: ""
        };
        var _sessionTimer;

        var _saveRegistration = function (registration) {
            _logOut();
            return $http.post($url.baseUrl + 'api/account/register', registration).then(function (response) {
                return response;
            });
        };

        var _startUserLoginSession = function (expiresIn) {
            _sessionTimer = $timeout(function () {
                _logOut();
            }, expiresIn * 1000);
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post($url.baseUrl + 'token', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function (response) {
                localStorageService.set('authorizationData', {
                    loginDate: new Date(),
                    expiresIn: response.expires_in,
                    token: response.access_token,
                    userName: loginData.userName
                });
                _startUserLoginSession(response.expires_in);
                _getUserProfile().then(function (profile) {
                    localStorageService.set('authorizationData', {
                        loginDate: new Date(),
                        expiresIn: response.expires_in,
                        token: response.access_token,
                        userName: loginData.userName,
                        profile: profile
                    });
                    _fillAuthData();
                    deferred.resolve(response);
                }).catch(function (err) {
                    _logOut();
                    deferred.reject(err);
                });
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
            _authentication.profile = {};
            if (_sessionTimer) {
                _sessionTimer();
            }
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData && (new Date() - new Date(authData.loginDate)) < authData.expiresIn) {
                _authentication.isAuthenticated = true;
                _authentication.userName = authData.userName;
                _authentication.profile = authData.profile;
                _authentication.expiresIn = authData.expiresIn;
            }
            else {
                _logOut();
            }

        };

        var _getUserProfile = function () {
            var defer = $q.defer();
            $http.get($url.baseUrl + 'api/account/user')
                .success(function (profile) {
                    defer.resolve(profile);
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
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.user = _authentication;

        return authServiceFactory;
    }]);