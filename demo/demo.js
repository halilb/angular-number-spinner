angular.module('NumberSpinnerDemo', ['number-spinner'])

.controller('DemoController', function ($scope, $log) {
    $scope.maxValue = 6;
    $scope.minValue = 1;
    $scope.currentNumber = 1;

    $scope.stateChanged = function (type, oldValue) {
        $scope.numberTooBig = type === 'over';
        $scope.numberTooSmall = type === 'below';
        $log.info('state changed - type: ' + type + ' - oldValue :' + oldValue);
    };
});