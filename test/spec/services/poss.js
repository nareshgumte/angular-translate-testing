'use strict';

describe('Poss Services', function () {

    beforeEach(module('appApp'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ngResource'));
    beforeEach(function () {

        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    var PosTitle = 'Test Pos';
    var PosDescription = 'Test Pos Description';

    var Pos1 = {

        title: PosTitle,
        description: PosDescription,
        orgId: 'e6a1e637-a649-ca01-028d-08d0fabb873d',
        parentPosId: '4a967173-8383-417d-bb73-ef9cfc34e273'
    };
    var Pos2 = {
        PosId: '4a967173-8383-417d-bb73-ef9cfc34e274',
        title: PosTitle,
        description: PosDescription + ' updated',
        orgId: 'e6a1e637-a649-ca01-028d-08d0fabb873d',
        parentPosId: '4a967173-8383-417d-bb73-ef9cfc34e273'
    };


    describe('Poss Services - Mock spy style ', function () {

        var PosService;
        var $httpBackend;
        var scope;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $q, Pos) {
            scope = $rootScope.$new();
//            scope.$digest();
            $httpBackend = _$httpBackend_;

//            $httpBackend.flush();
            PosService = Pos;
            spyOn(Pos, 'fetchPoss')
                .andCallFake(function () {
                    return $q.when([
                        Pos1, Pos2
                    ]);
                });

        }));

        it('should exist', inject(function () {
            expect(PosService).not.toBe(null);
        }));

        it('should contain Poss', inject(function () {

            PosService.fetchPoss(Pos1.orgId).then(function (response) {
                expect(response).not.toBe(null);
                expect(response.length).toEqual(2);

            }, function (response) {
                expect(response).toBe(null);
            });

            scope.$digest();

        }));

    });


    it('should fetch all Poss in GET', inject(function (_$httpBackend_, Pos) {
        var $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss').respond([Pos1, Pos2]);

        Pos.fetchPoss('e6a1e637-a649-ca01-028d-08d0fabb873d').then(function (response) {
            expect(response).not.toBe(null);
            expect(response.length).toEqual(2);
        }, function (response) {
            expect(response).toBe(null);
        });
        $httpBackend.flush();

    }));

    it('should send a POST request', inject(function (_$httpBackend_, Pos) {
        var $httpBackend = _$httpBackend_;

        var newPos;
        $httpBackend.expectPOST('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss', Pos1).respond(Pos1);

        Pos.save(Pos1).then(function (response) {
            expect(response).not.toBe(null);
            newPos = response;
            expect(newPos).toEqualData(Pos1);
        }, function (response) {
            expect(response).toBe(undefined);
        });
        $httpBackend.flush();

    }));

    it('should send a PUT request', inject(function (_$httpBackend_, Pos) {
        var $httpBackend = _$httpBackend_;

        $httpBackend.expectPUT('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/4a967173-8383-417d-bb73-ef9cfc34e274', Pos2).respond({});

        Pos.update(Pos2).then(function (response) {
            expect(response).not.toBe(null);

        }, function (response) {
            expect(response).toBe(undefined);
        });
        $httpBackend.flush();

    }));


//    it('should send a DELETE request', inject(function (_$httpBackend_, Pos) {
//        var $httpBackend = _$httpBackend_;
//
//        $httpBackend.expectDELETE('/api/orgdefinition/orgs/e6a1e637-a649-ca01-028d-08d0fabb873d/Poss/0').respond({status: 200});
//
//        var Pos = Pos1;
//        var updatedDescription = Pos1.description + ' - updated';
//        Pos.description = updatedDescription;
//
//        Pos.delete('e6a1e637-a649-ca01-028d-08d0fabb873d', '0').then(function (response) {
//            expect(response).not.toBe(null);
//            expect(response.status).toBe(200);
//        }, function (response) {
//            expect(response).toBe(undefined);
//        });
//
//        $httpBackend.flush();
//
//    }));

});
