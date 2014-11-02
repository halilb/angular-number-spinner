'use strict';

describe('Number Spinner Directive', function () {
    var $compile, $scope, el;

    beforeEach(module('number-spinner'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $scope.maxValue = 999;
        $scope.minValue = -999;
        el = $compile('<input number-spinner max="maxValue" min="minValue" ng-model="currentNumber">')($scope);
        $scope.$digest();
    }));

    function getButton(index) {
        return el.find('a').eq(index);
    }

    function clickButton(index) {
        var item = getButton(index);
        item.click();
    }

    it('has a "ui-spinner" css class', function () {
        expect(el.hasClass('ui-spinner')).toBe(true);
    });

    it('has an input with "ui-spinner-input" css class', function () {
        expect(el.find('input').hasClass('ui-spinner-input')).toBe(true);
    });

    describe('Number Input value', function () {
        it('should bind to ng-model', function () {
            $scope.currentNumber = 5;
            $scope.$digest();

            expect(el.find('input').val()).toBe('5');
        });

        it('should ignore non-numeric values', function () {
            $scope.currentNumber = '12a';
            $scope.$digest();

            expect($scope.currentNumber).toEqual(12);
        });

        it('should not be greater than maxValue', function () {
            $scope.maxValue = 5;
            $scope.currentNumber = 7;
            $scope.$digest();

            expect($scope.currentNumber).toEqual(5);
        });

        it('should not be less than minValue', function () {
            $scope.minValue = 5;
            $scope.currentNumber = 3;
            $scope.$digest();

            expect($scope.currentNumber).toEqual(5);
        });
    });

    describe('Buttons', function () {
        it('has two buttons with "ui-spinner-up" and "ui-spinner-down" classes', function () {
            expect(getButton(0).hasClass('ui-spinner-up')).toBe(true);
            expect(getButton(1).hasClass('ui-spinner-down')).toBe(true);
        });

        it('should increase value when up button is clicked', function () {
            $scope.currentNumber = 4;
            $scope.$digest();

            clickButton(0);

            expect($scope.currentNumber).toBe(5);
        });

        it('should decrease value when down button is clicked', function () {
            $scope.currentNumber = 4;
            $scope.$digest();

            clickButton(1);

            expect($scope.currentNumber).toBe(3);
        });
    });
});