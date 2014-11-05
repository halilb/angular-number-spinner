angular.module('NumberSpinnerDemo', ['number-spinner'])

.controller('DemoController', function ($scope) {
    $scope.maxValue = 6;
    $scope.minValue = 0;
    $scope.currentNumber = 1;

    $scope.maxExceeded = function (oldValue) {
        $scope.currentNumber = oldValue;
    };
})