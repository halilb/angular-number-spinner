'use strict';

describe('Number Spinner Directive', function () {
    var $compile, $rootScope, element;

    beforeEach(module('number-spinner'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.total = 47; // 5 pages
        $rootScope.currentPage = 3;
        element = $compile('<input number-spinner max="maxValue" min="minValue" ng-model="currentNumber">')($rootScope);
        $rootScope.$digest();
    }));

    it('has a "ui-spinner" css class', function () {
        expect(element.hasClass('ui-spinner')).toBe(true);
    });
});