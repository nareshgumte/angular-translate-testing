'use strict';

//angular.module('appApp')
//  .controller('MainCtrl', function ($scope) {
//
//  });


angular.module('appApp')//org-definition
    .controller('MainCtrl', ['$scope', '$translate', '$translatePartialLoader',
        function ($scope,   $translate, $translatePartialLoader) {
            
            $translatePartialLoader.addPart('main');
            $translate.refresh();


            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

        }


    ]);
