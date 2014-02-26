'use strict';

describe('Controller: PosAddCtrl', function () {

    // load the controller's module
    beforeEach(module('appApp'));//org-definition
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('pascalprecht.translate'));

    var scope, $httpBackend;
    var PosAddCtrl;
    var succeedPromise;
    var newPosTitle = 'New Test Pos';
    var newPosDescription = 'New Test Pos Description';

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();
        PosAddCtrl = $controller('PosAddCtrl', {
            $scope: scope
        });
    }));

    it('should clear the Pos details', function () {
        scope.Pos.title = 'Test Pos';
        scope.Pos.description = 'Test Pos Description';
        scope.clearForm();

        expect(scope.Pos.title).toEqual('');
    });

    it('should not save the new Pos details and show a error message if title is missing or is empty', function () {
        expect(scope.alerts.length).toEqual(0);
        scope.Pos.title = '';
        scope.Pos.description = newPosDescription;
        scope.saveNewPos();

        expect(scope.alerts.length).toEqual(1);
        expect(scope.alerts[0].msg).toContain('Title is missing!');
    });

    describe('Controller: PosAddCtrl - Using spyOn method to mock the Pos service', function () {

        var PosService;

        beforeEach(inject(function ($controller, $rootScope, $q, Pos) {

            PosService = Pos;

            spyOn(Pos, 'save')
                .andCallFake(function () {
                    if (succeedPromise) {
                        return $q.when('Done');
                    }
                    else {
                        return $q.reject('Something went wrong');
                    }
                });
        }));

        it('should save the new Pos details', function () {

            succeedPromise = true;
            expect(scope.alerts.length).toEqual(0);
            scope.Pos.title = newPosTitle;
            scope.Pos.description = newPosDescription;

            scope.saveNewPos();
            scope.$digest();
            expect(PosService.save).toHaveBeenCalled();

            expect(scope.alerts.length).toEqual(1);
            expect(scope.alerts[0].msg).toContain('Pos Added Successfully!');
        });

        it('should not save the new Pos details if service fails', function () {

            succeedPromise = false;
            expect(scope.alerts.length).toEqual(0);
            scope.Pos.title = newPosTitle;
            scope.Pos.description = newPosDescription;

            scope.saveNewPos();
            scope.$digest();
            expect(PosService.save).toHaveBeenCalled();

            expect(scope.alerts.length).toEqual(1);
            expect(scope.alerts[0].type).toContain('danger');
        });

    });

    describe('Controller: PosAddCtrl - Using new $httpBackend mock service', function () {
//
        it('should save the new Pos details', function () {
            $httpBackend.expectPOST('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss', {title: newPosTitle, description: newPosDescription, orgId: 'e6a1e637-a649-ca01-028d-08d0fabb873d',parentPosId:'4a967173-8383-417d-bb73-ef9cfc34e273'}).respond(201, {status: 'success'});

            expect(scope.alerts.length).toEqual(0);
            scope.Pos.title = newPosTitle;
            scope.Pos.description = newPosDescription;
            scope.Pos.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
            scope.Pos.parentPosId = '4a967173-8383-417d-bb73-ef9cfc34e273';

            scope.saveNewPos();
            $httpBackend.flush();

            expect(scope.alerts.length).toEqual(1);
            expect(scope.alerts[0].msg).toContain('Pos Added Successfully!');
        });

        it('should not save the new Pos details if service fails', function () {
            $httpBackend.expectPOST('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss', {title: newPosTitle, description: newPosDescription, orgId: 'e6a1e637-a649-ca01-028d-08d0fabb873d',parentPosId:'4a967173-8383-417d-bb73-ef9cfc34e273'} ).respond(404, {status: 'error'});

            expect(scope.alerts.length).toEqual(0);
            scope.Pos.title = newPosTitle;
            scope.Pos.description = newPosDescription;
            scope.Pos.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
            scope.Pos.parentPosId = '4a967173-8383-417d-bb73-ef9cfc34e273';

            scope.saveNewPos();
            $httpBackend.flush();

            expect(scope.alerts.length).toEqual(1);
            expect(scope.alerts[0].type).toContain('danger');
        });
    });

});

describe('Controller: PosListCtrl', function () {

    // load the controller's module
    beforeEach(module('appApp'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngResource'));
    beforeEach(module('pascalprecht.translate'));

    var scope, httpBackend;
    var newPosTitle = 'New Test Pos';
    var newPosDescription = 'New Test Pos Description';
    var Pos = {title: newPosTitle, description: newPosDescription};

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        $controller('PosListCtrl', {
            $scope: scope,
            $http: $http
        });
    }));

    describe('Controller: PosListCtrl - Using spyOn method to mock the Pos service', function () {

        var PosService, succeedPromise;

        beforeEach(inject(function ($controller, $rootScope, $q, Pos) {

            PosService = Pos;

            spyOn(Pos, 'fetchPoss')
                .andCallFake(function () {
                    if (succeedPromise) {
                        return $q.when([Pos]);
                    }
                    else {
                        return $q.reject('Something went wrong');
                    }
                });
        }));

        it('should list all Poss', function () {

            succeedPromise = true;
            expect(scope.Poss.length).toEqual(0);

            scope.fetchPoss();
            scope.$digest();
            expect(PosService.fetchPoss).toHaveBeenCalled();

            expect(scope.Poss.length).toEqual(1);
            expect(scope.Poss.length).toBeGreaterThan(0);

        });

        it('should not list any Pos if service fails', function () {

            succeedPromise = false;
            expect(scope.Poss.length).toEqual(0);

            scope.fetchPoss();
            scope.$digest();
            expect(PosService.fetchPoss).toHaveBeenCalled();

            expect(scope.Poss.length).toEqual(0);
        });
    });
});


describe('Controller: PosListCtrl', function () {

    // load the controller's module
    beforeEach(module('appApp'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngResource'));
    beforeEach(module('pascalprecht.translate'));


    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    var scope, httpBackend;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, Pos) {
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        $controller('PosListCtrl', {$scope: scope}, Pos);

    }));

    var newPosTitle = 'New Test Pos';
    var newPosDescription = 'New Test Pos Description';
    var Pos1 = {title: newPosTitle, description: newPosDescription};
    var Pos2 = {title: newPosTitle + '2', description: newPosDescription + '2'};

    it('should list all Poss', function () {

        httpBackend.expectGET('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss').respond([Pos1, Pos2]);

        scope.fetchPoss('e6a1e637-a649-ca01-028d-08d0fabb873d');
        httpBackend.flush();

        expect(scope.Poss.length).toEqual(2);
        expect(scope.Poss.length).toBeGreaterThan(0);
        expect(scope.Poss).toEqualData([Pos1, Pos2]);

    });

    it('should fetch 1 Pos', function () {
        httpBackend.expectGET('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/e6a1e637-a649-ca01-028d-08d0fabb873d').respond(Pos1);

        scope.fetchPos('e6a1e637-a649-ca01-028d-08d0fabb873d');
        httpBackend.flush();

        expect(scope.Pos).toNotBe(undefined);
        expect(scope.Pos).toEqualData(Pos1);

    });

});

describe('Controller: PosUpdateCtrl', function () {

    beforeEach(module('appApp'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngResource'));
    beforeEach(module('pascalprecht.translate'));

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    var scope, httpBackend;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
    }));

    var PosTitle = 'Test Pos';
    var PosDescription = 'Test Pos Description';
    var Pos1 = {
        PosId: '4a967173-8383-417d-bb73-ef9cfc34e274',
        title: PosTitle,
        description: PosDescription,
        orgId : 'e6a1e637-a649-ca01-028d-08d0fabb873d',
        parentPosId : '4a967173-8383-417d-bb73-ef9cfc34e273'
    };
    var Pos2 = {
        PosId: '4a967173-8383-417d-bb73-ef9cfc34e274',
        title: PosTitle,
        description: PosDescription + ' updated',
        orgId : 'e6a1e637-a649-ca01-028d-08d0fabb873d',
        parentPosId : '4a967173-8383-417d-bb73-ef9cfc34e273'
    };

    it('should update the Pos', inject(function ($controller, Pos) {

        var params = {};
        params.id = 0;

        params.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
        params.PosId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';

        httpBackend.expectGET('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/e6a1e637-a649-ca01-028d-08d0fabb873d', {'Accept': 'application/json, text/plain, */*'}).respond(Pos1);
        $controller('PosUpdateCtrl', {$scope: scope, $routeParams: params}, Pos);

        httpBackend.flush();

        expect(scope.isNewMode).toBeFalsy();
        expect(scope.Pos.title).toEqual(PosTitle);

        httpBackend.expectPUT('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/4a967173-8383-417d-bb73-ef9cfc34e274',
                Pos2).
            respond({});

        scope.Pos.description = PosDescription + ' updated';


        scope.update();
        httpBackend.flush();

        expect(scope.Pos.description).toEqualData(PosDescription + ' updated');

    }));

    it('should delete the Pos', inject(function ($controller, Pos) {

        var params = {};
        params.id = 0;

        params.orgId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';
        params.PosId = 'e6a1e637-a649-ca01-028d-08d0fabb873d';

        httpBackend.expectGET('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/e6a1e637-a649-ca01-028d-08d0fabb873d', {'Accept': 'application/json, text/plain, */*'}).respond(Pos1);
        $controller('PosUpdateCtrl', {$scope: scope, $routeParams: params}, Pos);

        httpBackend.flush();

        expect(scope.isNewMode).toBeFalsy();
        expect(scope.Pos.title).toEqual(PosTitle);
        httpBackend.expectDELETE('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/4a967173-8383-417d-bb73-ef9cfc34e274').respond({  });

        scope.delete();
        httpBackend.flush();
        expect(scope.Pos).toBe(undefined);

    }));
});
