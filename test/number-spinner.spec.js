'use strict';

describe('Number Spinner Directive', function () {
    var $compile, $scope, element;

    beforeEach(module('number-spinner'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;

        element = $compile('<input number-spinner max="maxValue" min="minValue" ng-model="currentNumber">')($scope);
        $scope.$digest();
    }));

    it('has a "ui-spinner" css class', function () {
        expect(element.hasClass('ui-spinner')).toBe(true);
    });

    it('has an input with "ui-spinner-input" css class', function () {
        expect(element.find('input').hasClass('ui-spinner-input')).toBe(true);
    });

    describe('Number Input value', function () {
        it('shall bind to ng-model', function () {
            $scope.currentNumber = 5;
            $scope.$digest();

            expect(element.find('input').val()).toBe('5');
        });

        it('shall not be greater than maxValue', function () {
            $scope.maxValue = 5;
            $scope.currentNumber = 7;
            $scope.$digest();

            expect($scope.currentNumber).toEqual(5);
        });

        it('shall not be less than minValue', function () {
            $scope.minValue = 5;
            $scope.currentNumber = 3;
            $scope.$digest();

            expect($scope.currentNumber).toEqual(5);
        });
    });
});