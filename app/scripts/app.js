'use strict';

angular.module('appAppMain', []);

(function () {

    var logger = function () {

        var log = function (message) {
            console.log(message);
        };

        return {
            log: log,
        };
    };

    angular.module('appAppMain').factory('logger', logger);

}());


angular.module('angularTranslateApp', ['pascalprecht.translate'])
    .config(function ($translateProvider, $translatePartialLoaderProvider) {
        var a = $translatePartialLoaderProvider;
        a = null;
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });
        $translateProvider.preferredLanguage('en-EN');
    });

angular.module('appApp', []).provider('helloWorld', function () {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // '$get' method.

    this.name = 'Default';

    this.$get = function () {
        var name = this.name;
        return {
            sayHello: function () {
                return 'Hello, ' + name + '!';
            }
        };
    };

    this.setName = function (name) {
        this.name = name;
    };
});

angular.module('appApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'pascalprecht.translate', 'appAppMain'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/Poss/add', {
                templateUrl: 'views/Posadd.html',
                controller: 'PosAddCtrl'
            })
            .when('/Poss/list', {
                templateUrl: 'views/Poslist.html',
                controller: 'PosListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
//    .config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {
    .config(['$translateProvider', function ($translateProvider) {

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translateProvider.preferredLanguage('en-EN');
//        $translatePartialLoaderProvider.addPart('main');

        $translateProvider.fallbackLanguage('en-EN');

        $translateProvider.useLocalStorage();

    }])
;



