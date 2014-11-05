'use strict';

describe('Number Spinner Directive', function () {
    var $compile, $scope, el, State;

    beforeEach(module('number-spinner'));
    beforeEach(module('number-spinner-template'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _State_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        State = _State_;

        $scope.maxValue = 999;
        $scope.minValue = -999;

        $scope.stateChanged = function (type, oldValue) {
            $scope.stateType = type;
            $scope.oldValue = oldValue;
        };

        el = $compile('<input number-spinner max="maxValue" min="minValue"\n' +
            'ng-model="currentNumber" state-changed="stateChanged(state, oldValue)">')($scope);
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
            expect($scope.stateType).toEqual(State.NORMAL);
        });

        it('should be equal to oldValue when input is greater than maxValue', function () {
            $scope.currentNumber = 3;
            $scope.maxValue = 5;
            $scope.$digest();

            $scope.currentNumber = 13;
            $scope.$digest();

            // 13 should be reverted to 3
            expect($scope.currentNumber).toEqual(3);
            expect($scope.stateType).toEqual(State.OVER);
        });

        it('should not be less than minValue', function () {
            $scope.minValue = 5;
            $scope.currentNumber = 14;
            $scope.$digest();

            $scope.currentNumber = 2;
            $scope.$digest();

            // 2 should be reverted to 14
            expect($scope.currentNumber).toEqual(14);
            expect($scope.stateType).toEqual(State.BELOW);
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
            expect($scope.stateType).toEqual(State.NORMAL);
        });

        it('should not increase value when max is reached', function () {
            $scope.currentNumber = 4;
            $scope.maxValue = 4;
            $scope.$digest();

            clickButton(0);

            expect($scope.currentNumber).toBe(4);
            expect($scope.stateType).toEqual(State.OVER);
        });

        it('should decrease value when down button is clicked', function () {
            $scope.currentNumber = 4;
            $scope.$digest();

            clickButton(1);

            expect($scope.currentNumber).toBe(3);
            expect($scope.stateType).toEqual(State.NORMAL);
        });

        it('should not decrease value when min is reached', function () {
            $scope.currentNumber = 2;
            $scope.minValue = 2;
            $scope.$digest();

            clickButton(1);

            expect($scope.currentNumber).toBe(2);
            expect($scope.stateType).toEqual(State.BELOW);
        });
    });
});