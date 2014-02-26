'use strict';

angular.module('appApp')//org-definition
//    .controller('PosAddCtrl', ['$scope', '$http', '$location', '$resource', 'Pos',
//        function ($scope, $http, $location, $resource, Pos) {
//    .controller('PosAddCtrl', ['$scope', '$http', '$location', '$resource', 'Pos', 'Poss', '$translate', '$translatePartialLoader',
//        function ($scope, $http, $location, $resource, Pos, Poss, $translate, $translatePartialLoader) {
    .controller('PosAddCtrl', ['$scope', '$http', '$location', '$resource', 'Pos',  '$translate', '$translatePartialLoader',
        function ($scope, $http, $location, $resource, Pos, $translate, $translatePartialLoader) {


            //            $scope.Pos = Pos;
            $scope.Pos = {};
            $scope.Pos.title = '';
            $scope.Pos.description = '';
            $scope.message = '';
            $scope.isShowMessage = false;
            $scope.alerts = [];
            $scope.isNewMode = true;
            $scope.Pos.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
            $scope.Pos.parentPosId = 'a966e22f-93f5-cb8f-028d-08d0fabb873d';

            $scope.init = function () {
                $translatePartialLoader.addPart('Poss');
                $translate.refresh();
            };

            $scope.saveNewPos = function () {
                $scope.alerts = [];
                if ($scope.Pos.title) {

                    Pos.save($scope.Pos).then(function (response) {
                        console.log('Success ' + response );
                        $scope.showMessage('success', 'Pos Added Successfully!');
                    }, function(error){
                        console.log('Failuer ' + error);
                        $scope.showMessage('danger', 'Operation Failed!');
                    });

                }
                else {
                    $scope.showMessage('danger', 'Title is missing!');
                }
            };

            $scope.clearForm = function () {
                $scope.Pos.title = '';
                $scope.Pos.description = '';
                $scope.isShowMessage = false;
                $scope.alerts = [];
            };

            $scope.showMessage = function (type, msg) {
                $scope.message = msg;
                $scope.alerts.push({ type: type, msg: msg });
                $scope.isShowMessage = true;
            };

            $scope.closeAlerts = function () {
                $scope.isShowMessage = false;
                $scope.alerts = [];
            };

            $scope.changeLanguage = function (langKey) {
                $translate.use(langKey);
            };
        }]
    )
    .controller('PosListCtrl', ['$scope', 'Pos',
        function ($scope, Pos) {
            $scope.Poss = [];
            $scope.Pos = {};
            $scope.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';

            $scope.fetchPoss = function () {
                $scope.Poss = [];

                Pos.fetchPoss($scope.orgId).then(function (response) {
                    $scope.Poss = response;
                }, function (response) {
                    console.log(response);
                    $scope.Poss = [];
                });
            };

            $scope.fetchPos = function (PosId) {
                $scope.Poss = [];

                Pos.fetchPos( $scope.orgId, PosId).then(function (response) {
                    $scope.Pos = response;
                }, function (response) {
                    console.log(response);
                    $scope.Pos = {};
                });

            };
        }]
    )
    .controller('PosList2Ctrl', ['$scope', '$resource', 'Pos',
        function ($scope, $resource, Pos) {

            $scope.Poss = [];
            $scope.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
            $scope.PosId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';

            $scope.fetchPos = function () {
                $scope.Poss = [];

                Pos.fetchPos( $scope.orgId, $scope.PosId).then(function (response) {
                    $scope.Poss = response;
                }, function (response) {
                    console.log(response);
                    $scope.Poss = [];
                });

//                $scope.Poss = Pos.query(function success() {
//                    console.log('PosList2Ctrl.query success');
//                }, function error(response) {
//                    console.log('PosList2Ctrl.query: Request Failed ' + response.status);
//                    // access response headers
//                    console.log(response.headers());
//                });
            };

            $scope.remove = function (index) {
                var PosId = $scope.Poss[index].id;
                console.log('PosId to remove: ' + PosId);
                Pos.delete({ PosId: PosId }, function success(data, status) {
                    console.log('Remove Pos succeeded' + data + ' ' + status);
                    $scope.Poss.splice(index, 1);
                }, function error(response) {
                    console.log('Remove Pos Failed Status: ' + response.status);
                });
            };
        }]
    )
    .controller('PosUpdateCtrl', ['$scope', '$routeParams', '$location', 'Pos',
        function ($scope, $routeParams, $location, Pos) {

            $scope.title = '';
            $scope.description = '';
            $scope.message = '';
            $scope.isShowMessage = false;
            $scope.alerts = [];
            $scope.Pos = {};
            $scope.isNewMode = false;

            Pos.fetchPos( $routeParams.orgId, $routeParams.PosId).then(function (response) {
                $scope.Pos = response;
            }, function (response) {
                console.log(response);
                $scope.Pos = {};
            });

            $scope.update = function () {

                if (!$scope.Pos) {
                    return;
                }

                if ($scope.Pos.title) {


                    Pos.update( $scope.Pos).then(function (response) {
                        console.log('Info: PosUpdateCtrl: updated Pos' + response);
                        //                        // redirect to main screen
//                        $location.path('#/');

                    }, function (response) {
                        console.log('Error: PosUpdateCtrl: unable to update' + response);
                    });

                } else {
                    $scope.showMessage('danger', 'Title is missing!');
                }
            };

            $scope.delete = function () {

                if (!$scope.Pos) {
                    return;
                }
                
                Pos.delete($scope.Pos.orgId, $scope.Pos.PosId).then(function (response) {
                    console.log('Info: PosUpdateCtrl: deleted Pos' + response);
                    $scope.Pos = undefined;
                }, function (response) {
                    console.log('Error: PosUpdateCtrl: unable to delete' + response);
                });
                
                $scope.showMessage('success', 'Pos deleted!');
            };


            $scope.showMessage = function (type, msg) {
                $scope.message = msg;
                $scope.alerts.push({ type: type, msg: msg });
                $scope.isShowMessage = true;
            };
        }]
    )
    .controller('PosDeleteCtrl', ['$scope', '$routeParams', '$location', 'Poss',
        function ($scope, $routeParams, $location, Pos) {
            console.log($scope + $routeParams + $location + Pos);

        }]
    );


//$scope.delete = function () {
//    $scope.alerts = [];
//    if ($scope.title) {
//        var Pos = {title: $scope.title, description: $scope.description};
//
//        Poss.delete(Pos).then(function (response) {
//            if (!response) {
//                $scope.showMessage('danger', 'No response received!');
//            } else {
//                $scope.showMessage('success', 'Pos Deleted Successfully!');
//            }
//        }, function (response) {
//            $scope.showMessage('danger', response.data);
//        });
//    }
//    else {
//        $scope.showMessage('danger', 'Title is missing!');
//    }
//};

