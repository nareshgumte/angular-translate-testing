'use strict';

angular.module('appApp')
    .factory('Pos', ['$resource', '$http', '$q',
        function ($resource, $http, $q) {
            var PosService = $resource('/api/orgdefinition/orgs/:orgId/Poss/:PosId',
                {
                    PosId: '@PosId',
                    orgId: '@orgId'
                },
                {
                    update: {
                        method: 'PUT',
                        params: {
                            PosId: '@PosId',
                            orgId: '@orgId'
                        }
                    },
                    isArray: false
                }
            );

            return {
                fetchPoss: function (orgId) {
                    var deferred = $q.defer();

                    PosService.query({ orgId: orgId }, function success(response) {
                        deferred.resolve(response);
                    }, function error(response) {
                        deferred.reject(response);
                    });
                    return deferred.promise;
                },
                fetchPos: function (orgId, PosId) {

                    var deferred = $q.defer();

                    PosService.get({orgId: orgId, PosId: PosId}, function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        deferred.reject(response);
                    });
                    return deferred.promise;
                },
                save: function (Pos) {
                    var deferred = $q.defer();

                    PosService.save(Pos, function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        deferred.reject(response);
                    });
                    return deferred.promise;
                },
                update: function (Pos) {
                    var deferred = $q.defer();

                    PosService.update({orgId: Pos.orgId, PosId: Pos.PosId}, Pos, function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        deferred.reject(response);
                    });
                    return deferred.promise;
                },
                delete: function (orgId, PosId) {
                    var deferred = $q.defer();

                    PosService.delete({ orgId: orgId, PosId: PosId }, function (response) {
                        deferred.resolve(response);
                    }, function (response) {
                        deferred.reject(response);
                    });
                    return deferred.promise;
                }
            };
        }
    ])
;